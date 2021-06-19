import { Price } from './fractions/price'
import { TokenAmount } from './fractions/tokenAmount'
import invariant from 'tiny-invariant'
import JSBI from 'jsbi'
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'

import {
  BigintIsh,
  MINIMUM_LIQUIDITY,
  ZERO,
  ONE,
  _997,
  _1000,
  ChainId,
  FACTORY_ADDRESS,
  INIT_CODE_HASH
} from '../constants'
import { sqrt, parseBigintIsh } from '../utils'
import { InsufficientReservesError, InsufficientInputAmountError } from '../errors'
import { Token } from './token'

let PAIR_ADDRESS_CACHE: { [token0Address: string]: { [token1Address: string]: string } } = {}

export class Pair {
  public readonly liquidityToken0: Token
  public readonly liquidityToken1: Token
  private readonly tokenAmounts0: [TokenAmount, TokenAmount]
  private readonly tokenAmounts1: [TokenAmount, TokenAmount]

  public static getAddress(tokenA: Token, tokenB: Token): string {
    invariant(tokenA.chainId === tokenB.chainId, 'CHAIN_IDS')
    invariant(tokenA.address !== tokenB.address, 'ADDRESSES')

    if (PAIR_ADDRESS_CACHE?.[tokenA.address]?.[tokenB.address] === undefined) {
      PAIR_ADDRESS_CACHE = {
        ...PAIR_ADDRESS_CACHE,
        [tokenA.address]: {
          ...PAIR_ADDRESS_CACHE?.[tokenA.address],
          [tokenB.address]: getCreate2Address(
            FACTORY_ADDRESS[tokenA.chainId],
            keccak256(['bytes'], [pack(['address', 'address'], [tokenA.address, tokenB.address])]),
            INIT_CODE_HASH
          )
        }
      }
    }

    return PAIR_ADDRESS_CACHE[tokenA.address][tokenB.address]
  }

  /**
   * Construct pair supporting two sub-pools
   * @param tokenAmountAIn  TokenA Amount in AAB sub-pool 
   * @param tokenAmountBOut TokenB Amount in AAB sub-pool 
   * @param tokenAmountBIn  TokenB Amount in ABB sub-pool 
   * @param tokenAmountAOut TokenA Amount in ABB sub-pool
   */
  public constructor(tokenAmountAIn: TokenAmount, tokenAmountBOut: TokenAmount, tokenAmountBIn: TokenAmount, tokenAmountAOut: TokenAmount ) {
    invariant(  ((tokenAmountAIn.token).chainId === (tokenAmountBOut.token).chainId) &&
                ((tokenAmountAIn.token).chainId === (tokenAmountBIn.token).chainId) &&
                ((tokenAmountAIn.token).chainId === (tokenAmountAOut.token).chainId), 'CHAIN_IDS')

    invariant(  ((tokenAmountAIn.token).address === (tokenAmountAOut.token).address) &&
                ((tokenAmountBOut.token).address === (tokenAmountBIn.token).address) &&
                ((tokenAmountAIn.token).address !== (tokenAmountBOut.token).address), 'ADDRESSES')

    const [tokenAmounts0, tokenAmounts1] =  tokenAmountAIn.token.address.toLowerCase() < tokenAmountBOut.token.address.toLowerCase()
                                      ? [[tokenAmountAIn, tokenAmountBOut], [tokenAmountBIn, tokenAmountAOut]]
                                      : [[tokenAmountBIn, tokenAmountAOut], [tokenAmountAIn, tokenAmountBOut]]

    this.liquidityToken0 = new Token(
      tokenAmounts0[0].token.chainId,
      Pair.getAddress(tokenAmounts0[0].token, tokenAmounts0[1].token),
      18, 'FESP', 'FeSwap'
    )

    this.liquidityToken1 = new Token(
      tokenAmounts1[0].token.chainId,
      Pair.getAddress(tokenAmounts1[0].token, tokenAmounts1[1].token),
      18, 'FESP', 'FeSwap'
    )

    this.tokenAmounts0 = tokenAmounts0 as [TokenAmount, TokenAmount]
    this.tokenAmounts1 = tokenAmounts1 as [TokenAmount, TokenAmount]
  }

  public get token0(): Token {
    return this.tokenAmounts0[0].token
  }

  public get token1(): Token {
    return this.tokenAmounts1[0].token
  }

  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  public involvesToken(token: Token): boolean {
    return token.equals(this.token0) || token.equals(this.token1)
  }

  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  public get token0Price(): Price {
    return new Price(this.token0, this.token1, this.tokenAmounts0[0].raw, this.tokenAmounts0[1].raw)
  }

  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
   public get token0PriceMean(): Price {
    return new Price( this.token0, this.token1, 
                      this.tokenAmounts0[0].add(this.tokenAmounts1[1]).raw, 
                      this.tokenAmounts0[1].add(this.tokenAmounts1[0]).raw)
  }
  
  /**
   * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
   */
  public get token1Price(): Price {
    return new Price(this.token1, this.token0, this.tokenAmounts1[0].raw, this.tokenAmounts1[1].raw)
  }

  /**
   * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
   */
  public get token1PriceMean(): Price {
    return new Price( this.token1, this.token0, 
                      this.tokenAmounts1[0].add(this.tokenAmounts0[1]).raw, 
                      this.tokenAmounts1[1].add(this.tokenAmounts0[0]).raw)
  }

  /**
   * Return the price of the given token in terms of the other token in the pair.
   * @param token token to return price of
   */
  public priceOf(token: Token): Price {
    invariant(this.involvesToken(token), 'TOKEN')
    return token.equals(this.token0) ? this.token0Price : this.token1Price
  }

  /**
   * Return the price of the given token in terms of the other token in the pair based on the two sub-pool average
   * @param token token to return price of
   */
  public priceOfMean(token: Token): Price {
    invariant(this.involvesToken(token), 'TOKEN')
    return token.equals(this.token0) ? this.token0PriceMean : this.token1PriceMean
  }

  /**
   * Returns the chain ID of the tokens in the pair.
   */
  public get chainId(): ChainId {
    return this.token0.chainId
  }

  public get reserve00(): TokenAmount {
    return this.tokenAmounts0[0]
  }

  public get reserve01(): TokenAmount {
    return this.tokenAmounts0[1]
  }

  public get reserve10(): TokenAmount {
    return this.tokenAmounts1[0]
  }

  public get reserve11(): TokenAmount {
    return this.tokenAmounts1[1]
  }

  public reserveOf(token: Token, isPair0: boolean): TokenAmount {
    invariant(this.involvesToken(token), 'TOKEN')
    if (isPair0){
      return token.equals(this.token0) ? this.reserve00 : this.reserve01
    }
    return token.equals(this.token1) ? this.reserve10 : this.reserve11
  }

  public reserveOfInput(inputToken: Token): TokenAmount {
    invariant(this.involvesToken(inputToken), 'TOKEN')
    return inputToken.equals(this.token0) ? this.reserve00 : this.reserve10
  }

  public reserveOfOutput(outputToken: Token): TokenAmount {
    invariant(this.involvesToken(outputToken), 'TOKEN')
    return outputToken.equals(this.token1) ? this.reserve01 : this.reserve11
  }

  public reserveByInput(inputToken: Token): [TokenAmount,TokenAmount] {
    invariant(this.involvesToken(inputToken), 'TOKEN')
    return inputToken.equals(this.token0) ? this.tokenAmounts0 : this.tokenAmounts1
  }

  public reserveByOutput(outputToken: Token):  [TokenAmount,TokenAmount] {
    invariant(this.involvesToken(outputToken), 'TOKEN')
    return outputToken.equals(this.token1) ? this.tokenAmounts0 : this.tokenAmounts1
  }

  public getOutputAmount(inputAmount: TokenAmount): [TokenAmount, Pair] {
    invariant(this.involvesToken(inputAmount.token), 'TOKEN')
    const tokenOutput = inputAmount.token.equals(this.token0) ? this.token1 : this.token0

    if (JSBI.equal(this.reserveOfInput(inputAmount.token).raw, ZERO) || 
        JSBI.equal(this.reserveOfOutput(tokenOutput).raw, ZERO)
    ) {
      throw new InsufficientReservesError()
    }
 
    const inputReserve = this.reserveOfInput(inputAmount.token)
    const outputReserve = this.reserveOfOutput(tokenOutput)
    const numerator = JSBI.multiply(outputReserve.raw, inputAmount.raw )
    const denominator = JSBI.add(inputReserve.raw, inputAmount.raw)

    const outputAmount = new TokenAmount(
      tokenOutput,
      JSBI.divide(numerator, denominator)
    )
    if (JSBI.equal(outputAmount.raw, ZERO)) {
      throw new InsufficientInputAmountError()
    }

    // no internal arbitrage consider, may it's better to consider internal arbitrage, but it is complicated for fee-on Token
    const newPair = inputAmount.token.equals(this.token0)
                    ? new Pair( inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), 
                                this.tokenAmounts1[0], this.tokenAmounts1[1])
                    : new Pair( this.tokenAmounts0[0], this.tokenAmounts0[1], 
                                inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))

    return [outputAmount, newPair]
  }

  public getInputAmount(outputAmount: TokenAmount): [TokenAmount, Pair] {
    invariant(this.involvesToken(outputAmount.token), 'TOKEN')
    const tokenInput = outputAmount.token.equals(this.token1) ? this.token0 : this.token1

    if (  JSBI.equal(this.reserveOfInput(tokenInput).raw, ZERO) || 
          JSBI.equal(this.reserveOfOutput(outputAmount.token).raw, ZERO) ||
          JSBI.greaterThanOrEqual(outputAmount.raw, this.reserveOfOutput(outputAmount.token).raw)
    ) {
      throw new InsufficientReservesError()
    }

    const outputReserve = this.reserveOfOutput(outputAmount.token)
    const inputReserve = this.reserveOfInput(tokenInput)
    const numerator = JSBI.multiply(inputReserve.raw, outputAmount.raw)
    const denominator = JSBI.subtract(outputReserve.raw, outputAmount.raw)
    const inputAmount = new TokenAmount(
      tokenInput,
      JSBI.add(JSBI.divide(numerator, denominator), ONE)
    )

    // no internal arbitrage consider, may it's better to consider internal arbitrage, but it is complicated for fee-on Token
    const newPair = outputAmount.token.equals(this.token1)
                    ? new Pair( inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), 
                                this.tokenAmounts1[0], this.tokenAmounts1[1])
                    : new Pair( this.tokenAmounts0[0], this.tokenAmounts0[1], 
                                inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))

    return [inputAmount, newPair]
  }

  /**
   * Returns Liquidity amount corresponding to the given token amounts and the total liquidity already suppied
   * @param totalSupply total liquidity already supplied, which also specifies pair0 or pair1
   * @param tokenAmountA token A amounts, assumed token A is the input token
   * @param tokenAmountB token B amounts, assumed token B is the output token
   */
  public getLiquidityMinted(
    totalSupply: TokenAmount,
    tokenAmountA: TokenAmount,
    tokenAmountB: TokenAmount
  ): TokenAmount {
    invariant( totalSupply.token.equals(this.liquidityToken0) || totalSupply.token.equals(this.liquidityToken1) , 'LIQUIDITY')
    const isPair0 = totalSupply.token.equals(this.liquidityToken0)
    const tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
      ? [tokenAmountA, tokenAmountB]
      : [tokenAmountB, tokenAmountA]
    invariant(tokenAmounts[0].token.equals(this.token0) && tokenAmounts[1].token.equals(this.token1), 'TOKEN')

    let liquidity: JSBI
    if (JSBI.equal(totalSupply.raw, ZERO)) {
      liquidity = JSBI.subtract(sqrt(JSBI.multiply(tokenAmounts[0].raw, tokenAmounts[1].raw)), MINIMUM_LIQUIDITY)
    } else {
      const amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].raw, totalSupply.raw), isPair0 ? this.reserve00.raw : this.reserve11.raw)
      const amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].raw, totalSupply.raw), isPair0 ? this.reserve01.raw : this.reserve10.raw)
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1
    }
    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError()
    }
    return new TokenAmount(isPair0 ? this.liquidityToken0: this.liquidityToken1, liquidity)
  }

  public getLiquidityValue(
    token: Token,
    totalSupply: TokenAmount,
    liquidity: TokenAmount,
    feeOn: boolean = false,
    kLast?: BigintIsh,
    rateProfitShare: JSBI = JSBI.BigInt(11),
  ): TokenAmount {
    invariant(this.involvesToken(token), 'TOKEN')
    const isPair0 = totalSupply.token.equals(this.liquidityToken0) ? true :false 
    const liquidityToken =  isPair0 ? this.liquidityToken0 : this.liquidityToken1
    invariant(totalSupply.token.equals(liquidityToken), 'TOTAL_SUPPLY')
    invariant(liquidity.token.equals(liquidityToken), 'LIQUIDITY')
    invariant(JSBI.lessThanOrEqual(liquidity.raw, totalSupply.raw), 'LIQUIDITY')

    let totalSupplyAdjusted: TokenAmount
    if (!feeOn) {
      totalSupplyAdjusted = totalSupply
    } else {
      invariant(!!kLast, 'K_LAST')
      const kLastParsed = parseBigintIsh(kLast)
      if (!JSBI.equal(kLastParsed, ZERO)) {
        const rootK = isPair0 ? sqrt(JSBI.multiply(this.reserve00.raw, this.reserve01.raw))
                              : sqrt(JSBI.multiply(this.reserve10.raw, this.reserve11.raw))
        const rootKLast = sqrt(kLastParsed)
        if (JSBI.greaterThan(rootK, JSBI.add(rootKLast, JSBI.BigInt(20)))) {
          const numerator = JSBI.multiply(totalSupply.raw, JSBI.subtract(rootK, rootKLast))
          const denominator = JSBI.add(JSBI.multiply(rootK, rateProfitShare), rootKLast)
          const feeLiquidity = JSBI.divide(numerator, denominator)
          totalSupplyAdjusted = totalSupply.add(new TokenAmount(liquidityToken, feeLiquidity))
        } else {
          totalSupplyAdjusted = totalSupply
        }
      } else {
        totalSupplyAdjusted = totalSupply
      }
    }

    return new TokenAmount(
      token,
      JSBI.divide(JSBI.multiply(liquidity.raw, this.reserveOf(token,isPair0).raw), totalSupplyAdjusted.raw)
    )
  }
}
