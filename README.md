# `eth-helpers`

> Kitchensink of ethereum utils

## Usage

### Units

```js
const units = require('eth-helpers/units')
const { Wei, Ether, GWei } = units

const gasPrice = 16n * GWei
const value = units.parse('2.7811', { from: Ether }) // implicit `to: Wei`

const tx = // Send tx

console.log(units.format(address.balance, { to: Ether, from: Wei, decimals: 4 }))
```

## API

### Utils

### `const str = utils.format(nullish|string|Buffer|number|BigInt)`

Format any of the above types as a eth hex string.

### Parsing

Utilities exist for converting from hex strings to native data types:

* `const bool = utils.parse.boolean(hex)`
* `const number = utils.parse.number(hex)`
* `const bigint = utils.parse.bigint(hex)`
* `const buf = utils.parse.bytes(hex)`
* `const str = utils.parse.string(hex)`

### `const receipt = async utils.mined(txHash, eth)`

Wait for a transaction to be mined

### Units

The units module contains a list of constants as well as helper functions to
convert to and from strings and do lossless conversion.

Unit constants include as `BigInt`:

- `Wei`
- `KWei` / `babbage`
- `MWei` / `lovelace`
- `GWei` / `shannon`
- `µEther` / `microether` / `szabo`
- `mEther` / `milliether` / `finney`
- `Ether`
- `KEther`
- `MEther`
- `GEther`
- `TEther`

### `const bigint = units.convert(value, from, [to = Wei])`

Lossless unit conversion to `BigInt`. Asserts that no precision is lost.

### `const number = units.convertLossy(value, from, [to = Wei])`

Lossy unit conversion to `Number`. Not suitable to exact calculations.

### `const str = units.format(value, { from = Wei, to = Wei, decimals = null })`

Format `BigInt` as a string with `from` basis to `to` basis. Optional set the
number of decimals similar to `toFixed`

### `const bigint = units.parse(string, { from, to = Wei })`

Parse a string number into `BigInt` with specified basis.

## Install

```sh
npm install eth-helpers
```

## License

[ISC](LICENSE)
