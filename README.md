# Feswap SDK

In-depth documentation on this SDK is available at [uniswap.org](https://uniswap.org/docs/v2/SDK/getting-started/).

This modifies uniswap-sdk's UniswapV2Factory address. The new address for feswap is  `0xFE7a9e76864704A09584E235C3968Ba3D1C6743b`.

## Running tests

To run the tests, follow these steps. You must have at least node v10 and [yarn](https://yarnpkg.com/) installed.

First clone the repository:

```sh
git clone https://github.com/feswap/feswap-sdk.git
```

Move into the feswap-sdk working directory

```sh
cd feswap-sdk/
```

Install dependencies

```sh
yarn install
```

Build project

```sh
yarn build
```

Run tests

```sh
yarn test
```

You should see output like the following:

```sh
yarn run v1.22.10
$ tsdx test
 PASS  test/constants.test.ts (8.828s)
 PASS  test/token.test.ts (12.143s)
 PASS  test/router.test.ts (12.174s)
 PASS  test/entities.test.ts (12.238s)
 PASS  test/route.test.ts (12.159s)
 PASS  test/fraction.test.ts (12.287s)
 PASS  test/miscellaneous.test.ts (12.397s)
 PASS  test/trade.test.ts (12.506s)
 PASS  test/pair.test.ts (12.429s)

Test Suites: 1 skipped, 9 passed, 9 of 10 total
Tests:       3 skipped, 126 passed, 129 total
Snapshots:   0 total
Time:        15.407s
Ran all test suites.
Done in 17.19s.
```
