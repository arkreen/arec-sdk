import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42
//  MATIC = 137,
//  MATIC_TESTNET = 80001,
//  FANTOM = 250,
//  FANTOM_TESTNET = 4002,
//  XDAI = 100,
//  BSC = 56,
//  BSC_TESTNET = 97,
//  ARBITRUM = 79377087078960,
//  MOONBASE = 1287,
//  AVALANCHE = 43114,
//  FUJI = 43113,
//  HECO = 128,
//  HECO_TESTNET = 256,
//  HARMONY = 1666600000,
//  HARMONY_TESTNET = 1666700000
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

//export const INIT_CODE_HASH: string = '0x9ee363bc4a7af5605ef17ba06c2f9447c61c22beacb5c4647efa122f3aefc8db'
//export const INIT_CODE_HASH: string = '0x235c27e3d008975dad617b3081b116c4f5866b73d1153e5f5322c4e464d6370d'

export const INIT_CODE_HASH: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]:  '0x5ff2250d3f849930264d443f14a482794b12bd40ac16b457def9522f050665da',
  [ChainId.ROPSTEN]:  '0x9ee363bc4a7af5605ef17ba06c2f9447c61c22beacb5c4647efa122f3aefc8db',
  [ChainId.RINKEBY]:  '0x9ee363bc4a7af5605ef17ba06c2f9447c61c22beacb5c4647efa122f3aefc8db',
  [ChainId.GÖRLI]:    '0x5ff2250d3f849930264d443f14a482794b12bd40ac16b457def9522f050665da',
  [ChainId.KOVAN]:    '0x9ee363bc4a7af5605ef17ba06c2f9447c61c22beacb5c4647efa122f3aefc8db'
}

export const NFT_BID_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]:  '0x0aB276b92a6E6d3EcC8D5888D1b15EffEa223923',
  [ChainId.ROPSTEN]:  '0x06C2De45973Df34DaB22AD0b767d2bE3eca5D178',
  [ChainId.RINKEBY]:  '0x06C2De45973Df34DaB22AD0b767d2bE3eca5D178',
  [ChainId.GÖRLI]:    '0x06C2De45973Df34DaB22AD0b767d2bE3eca5D178',
  [ChainId.KOVAN]:    '0x06C2De45973Df34DaB22AD0b767d2bE3eca5D178'
}

export const SPONSOR_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]:  '0x74B6F6884FE98259aF4127ca9A5D580Da934E52b',
  [ChainId.ROPSTEN]:  '0xB7196A981De991cdCAEe06Eb7c39c84B5277d234',
  [ChainId.RINKEBY]:  '0xB7196A981De991cdCAEe06Eb7c39c84B5277d234',
  [ChainId.GÖRLI]:    '0xB7196A981De991cdCAEe06Eb7c39c84B5277d234',
  [ChainId.KOVAN]:    '0xB7196A981De991cdCAEe06Eb7c39c84B5277d234'
}

export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]:  '0x75f7b730c51610aba6f3d89deb4864f156c8e747',
  [ChainId.ROPSTEN]:  '0x75f7b730c51610aba6f3d89deb4864f156c8e747',
  [ChainId.RINKEBY]:  '0x75f7b730c51610aba6f3d89deb4864f156c8e747',
  [ChainId.GÖRLI]:    '0x1BdB1555bDc425183ad56FcB31c06205726FEFB0',
  [ChainId.KOVAN]:    '0x75f7b730c51610aba6f3d89deb4864f156c8e747'
//  [ChainId.FANTOM]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
//  [ChainId.FANTOM_TESTNET]: '',
//  [ChainId.MATIC]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
//  [ChainId.MATIC_TESTNET]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
//  [ChainId.XDAI]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
//  [ChainId.BSC]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
//  [ChainId.BSC_TESTNET]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
//  [ChainId.ARBITRUM]: '',
//  [ChainId.MOONBASE]: '0x2Ce3F07dD4c62b56a502E223A7cBE38b1d77A1b5',
//  [ChainId.AVALANCHE]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
//  [ChainId.FUJI]: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
//  [ChainId.HECO]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
//  [ChainId.HECO_TESTNET]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
//  [ChainId.HARMONY]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
//  [ChainId.HARMONY_TESTNET]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4'
}

export const ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]:  '0x657db4e8c4258570cc7dd61031777901439e8079',
  [ChainId.RINKEBY]:  '0x657db4e8c4258570cc7dd61031777901439e8079',
  [ChainId.ROPSTEN]:  '0x657db4e8c4258570cc7dd61031777901439e8079',
  [ChainId.GÖRLI]:    '0xD5e8666620eaf809D32c5F2D739C49953FBd6e12',
  [ChainId.KOVAN]:    '0x657db4e8c4258570cc7dd61031777901439e8079'
//  [ChainId.FANTOM]: '',
//  [ChainId.FANTOM_TESTNET]: '',
//  [ChainId.MATIC]: '',
//  [ChainId.MATIC_TESTNET]: '',
//  [ChainId.XDAI]: '',
//  [ChainId.BSC]: '',
//  [ChainId.BSC_TESTNET]: '',
//  [ChainId.ARBITRUM]: '',
//  [ChainId.MOONBASE]: '',
//  [ChainId.AVALANCHE]: '',
//  [ChainId.FUJI]: '',
//  [ChainId.HECO]: '',
//  [ChainId.HECO_TESTNET]: '',
//  [ChainId.HARMONY]: '',
//  [ChainId.HARMONY_TESTNET]: ''
}

export const FESW_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x4269eaec0710b874ea55e2AeDc8Fb66223522Bbe',
  [ChainId.ROPSTEN]: '0xcfcC81C508a8025879a27257cC0f699F9f2016AB',
  [ChainId.RINKEBY]: '0xcfcC81C508a8025879a27257cC0f699F9f2016AB',
  [ChainId.GÖRLI]: '0xcfcC81C508a8025879a27257cC0f699F9f2016AB',
  [ChainId.KOVAN]: '0xcfcC81C508a8025879a27257cC0f699F9f2016AB'
//  [ChainId.FANTOM]: '',
//  [ChainId.FANTOM_TESTNET]: '',
//  [ChainId.MATIC]: '',
//  [ChainId.MATIC_TESTNET]: '',
//  [ChainId.XDAI]: '',
//  [ChainId.BSC]: '',
//  [ChainId.BSC_TESTNET]: '',
//  [ChainId.ARBITRUM]: '',
//  [ChainId.MOONBASE]: '',
//  [ChainId.AVALANCHE]: '',
//  [ChainId.FUJI]: '',
//  [ChainId.HECO]: '',
//  [ChainId.HECO_TESTNET]: '',
//  [ChainId.HARMONY]: '',
//  [ChainId.HARMONY_TESTNET]: ''
}
/*
export const MASTERCHEF_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
  [ChainId.ROPSTEN]: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
  [ChainId.RINKEBY]: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
  [ChainId.GÖRLI]: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
  [ChainId.KOVAN]: '0x80C7DD17B01855a6D2347444a0FCC36136a314de'
//  [ChainId.FANTOM]: '',
//  [ChainId.FANTOM_TESTNET]: '',
//  [ChainId.MATIC]: '',
//  [ChainId.MATIC_TESTNET]: '',
//  [ChainId.XDAI]: '',
//  [ChainId.BSC]: '',
//  [ChainId.BSC_TESTNET]: '',
//  [ChainId.ARBITRUM]: '',
//  [ChainId.MOONBASE]: '',
//  [ChainId.AVALANCHE]: '',
//  [ChainId.FUJI]: '',
//  [ChainId.HECO]: '',
//  [ChainId.HECO_TESTNET]: '',
//  [ChainId.HARMONY]: '',
//  [ChainId.HARMONY_TESTNET]: ''
}

export const BAR_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272',
  [ChainId.ROPSTEN]: '0x1be211D8DA40BC0ae8719c6663307Bfc987b1d6c',
  [ChainId.RINKEBY]: '0x1be211D8DA40BC0ae8719c6663307Bfc987b1d6c',
  [ChainId.GÖRLI]: '0x1be211D8DA40BC0ae8719c6663307Bfc987b1d6c',
  [ChainId.KOVAN]: '0x1be211D8DA40BC0ae8719c6663307Bfc987b1d6c'
//  [ChainId.FANTOM]: '',
//  [ChainId.FANTOM_TESTNET]: '',
//  [ChainId.MATIC]: '',
//  [ChainId.MATIC_TESTNET]: '',
//  [ChainId.XDAI]: '',
//  [ChainId.BSC]: '',
//  [ChainId.BSC_TESTNET]: '',
//  [ChainId.ARBITRUM]: '',
//  [ChainId.MOONBASE]: '',
//  [ChainId.AVALANCHE]: '',
//  [ChainId.FUJI]: '',
//  [ChainId.HECO]: '',
//  [ChainId.HECO_TESTNET]: '',
//  [ChainId.HARMONY]: '',
//  [ChainId.HARMONY_TESTNET]: ''
}

export const MAKER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xE11fc0B43ab98Eb91e9836129d1ee7c3Bc95df50',
  [ChainId.ROPSTEN]: '0x1b9d177CcdeA3c79B6c8F40761fc8Dc9d0500EAa',
  [ChainId.RINKEBY]: '0x1b9d177CcdeA3c79B6c8F40761fc8Dc9d0500EAa',
  [ChainId.GÖRLI]: '0x1b9d177CcdeA3c79B6c8F40761fc8Dc9d0500EAa',
  [ChainId.KOVAN]: '0x1b9d177CcdeA3c79B6c8F40761fc8Dc9d0500EAa'
//  [ChainId.FANTOM]: '',
//  [ChainId.FANTOM_TESTNET]: '',
//  [ChainId.MATIC]: '',
//  [ChainId.MATIC_TESTNET]: '',
//  [ChainId.XDAI]: '',
//  [ChainId.BSC]: '',
//  [ChainId.BSC_TESTNET]: '',
//  [ChainId.ARBITRUM]: '',
//  [ChainId.MOONBASE]: '',
//  [ChainId.AVALANCHE]: '',
//  [ChainId.FUJI]: '',
//  [ChainId.HECO]: '',
//  [ChainId.HECO_TESTNET]: '',
//  [ChainId.HARMONY]: '',
//  [ChainId.HARMONY_TESTNET]: ''
}
*/

export const GOVERNANCE_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]:  '0x77F98c147a37564c32E48054Bff7692A1F97f343',
  [ChainId.ROPSTEN]:  '0x179E988DaE54D010e86F288C4872d7d3eB4EF0C6',
  [ChainId.RINKEBY]:  '0x179E988DaE54D010e86F288C4872d7d3eB4EF0C6',
  [ChainId.GÖRLI]:    '0x179E988DaE54D010e86F288C4872d7d3eB4EF0C6',
  [ChainId.KOVAN]:    '0x179E988DaE54D010e86F288C4872d7d3eB4EF0C6'
}

export const TIMELOCK_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]:  '0xd24347C40f4ed36f326f82E3bEFFfaf3B8D436a1',
  [ChainId.ROPSTEN]:  '0xFA2Dbaa137b3Bd13d8f1758311Ae909397EC18AB',
  [ChainId.RINKEBY]:  '0xFA2Dbaa137b3Bd13d8f1758311Ae909397EC18AB',
  [ChainId.GÖRLI]:    '0xFA2Dbaa137b3Bd13d8f1758311Ae909397EC18AB',
  [ChainId.KOVAN]:    '0xFA2Dbaa137b3Bd13d8f1758311Ae909397EC18AB'
//  [ChainId.FANTOM]: '',
//  [ChainId.FANTOM_TESTNET]: '',
//  [ChainId.MATIC]: '',
//  [ChainId.MATIC_TESTNET]: '',
//  [ChainId.XDAI]: '',
//  [ChainId.BSC]: '',
//  [ChainId.BSC_TESTNET]: '',
//  [ChainId.ARBITRUM]: '',
//  [ChainId.MOONBASE]: '',
//  [ChainId.AVALANCHE]: '',
//  [ChainId.FUJI]: '',
//  [ChainId.HECO]: '',
//  [ChainId.HECO_TESTNET]: '',
//  [ChainId.HARMONY]: '',
//  [ChainId.HARMONY_TESTNET]: ''
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
