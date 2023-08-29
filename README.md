# AREC SDK

This this SDK is forked from FeSwap SDK to supprt AREC Dapp.

## Running tests

To run the tests, follow these steps. You must have at least node v10 and [yarn](https://yarnpkg.com/) installed.

First clone the repository:

```sh
git clone https://github.com/arkreen/arec-sdk.git
```

Move into the arec-sdk working directory

```sh
cd arec-sdk/
```

Install dependencies

```sh
yarn install
```

Build project

```sh
yarn build
```
Publish project

```sh
yarn publish --access public
```

Run tests

```sh
yarn test
```

You should see output like the following:

```sh
yarn run v1.22.11
$ tsdx test
 PASS  test/constants.test.ts (48.379s)
 PASS  test/token.test.ts (63.259s)
 PASS  test/route.test.ts (63.343s)
 PASS  test/fraction.test.ts (63.697s)
 PASS  test/pair.test.ts (63.848s)
 PASS  test/miscellaneous.test.ts (63.844s)
 PASS  test/router.test.ts (63.956s)
 PASS  test/entities.test.ts (64.298s)
 PASS  test/trade.test.ts (64.406s)

Test Suites: 1 skipped, 9 passed, 9 of 10 total
Tests:       3 skipped, 126 passed, 129 total
Snapshots:   0 total
Time:        80.668s
Ran all test suites.
Done in 92.46s.
```
