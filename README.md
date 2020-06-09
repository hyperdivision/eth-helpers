# `eth-utils`

> Kitchensink of ethereum utils

## Usage

### Units

```js
const units = require('eth-utils/units')
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

### `const str = units.format(value, { from, to = Wei, decimals = null })`

Format `BigInt` as a string with `from` basis to `to` basis. Optional set the
number of decimals similar to `toFixed`

### `const bigint = units.parse(string, { from, to = Wei })`

Parse a string number into `BigInt` with specified basis.

## Install

```sh
npm install eth-utils
```

## License

[ISC](LICENSE)
