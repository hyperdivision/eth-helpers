const diff = require('pretty-string-diff')
const { Ether, Wei, GWei, format, parse } = require('./units')
const utils = require('./utils')

console.log(diff(utils.format(false), '0x0'))
console.log(diff(utils.format(true), '0x1'))
console.log(diff(utils.format('ff00ff'), '0xff00ff'))
console.log(diff(utils.format(Buffer.from('00ff', 'hex')), '0xff'))
console.log(diff(utils.format(Buffer.from('00ff00', 'hex')), '0xff00'))
console.log(diff(utils.format(0x00ff), '0xff'))
console.log(diff(utils.format(0xffdb), '0xffdb'))
console.log(diff(utils.format(0xffdb00), '0xffdb00'))
console.log(diff(utils.format(0xffdb00n), '0xffdb00'))
console.log(diff(utils.format('0x0f0'), '0x0f0'))
console.log(diff(utils.format(1), '0x1'))
console.log(utils.format(null) === null)
console.log(utils.format(undefined) === null)

try {
  utils.format(1.1)
  utils.format({})
  utils.format([])
  utils.format(null)
} catch {}

console.log(diff(format(1, { from: Ether, to: Wei }), '1000000000000000000'))
console.log(diff(format(1, { from: Ether, to: GWei }), '1000000000'))
console.log(diff(format(1, { from: Ether, to: Ether }), '1'))

console.log(diff(format(1, { from: Ether, to: Wei }), '1000000000000000000'))
console.log(diff(format(1, { from: Ether, to: GWei }), '1000000000'))

console.log(diff(format('1.234567891234567891234567', { from: Ether, to: Ether }), '1.234567891234567891234567'))
console.log(diff(format('1.234567891234567891234567', { from: Ether, to: GWei }), '1234567891.234567891234567'))
console.log(diff(format('1.234567891234567891234567', { from: Ether, to: Wei }), '1234567891234567891.234567'))

console.log(diff(format('1.234567891234567', { from: Ether, to: Ether }), '1.234567891234567'))
console.log(diff(format('1.234567891234567', { from: Ether, to: GWei }), '1234567891.234567'))
console.log(diff(format('1.234567891234567', { from: Ether, to: Wei }), '1234567891234567000'))

console.log(diff(format('0.1234', { from: Wei, to: Ether }), '0.0000000000000000001234'))
console.log(diff(format('0.1234', { from: Wei, to: GWei }), '0.0000000001234'))
console.log(diff(format('0.1234', { from: Wei, to: Wei }), '0.1234'))

console.log(diff(format('0.1234', { from: Wei, to: Ether }), '0.0000000000000000001234'))
console.log(diff(format('0.1234', { from: Wei, to: GWei }), '0.0000000001234'))
console.log(diff(format('0.1234', { from: Wei, to: Wei, decimals: 2 }), '0.12'))
console.log(diff(format('0.12345', { from: Wei, to: Wei, decimals: 4 }), '0.1234'))

console.log(parse('0.00002', { from: Ether }))
console.log(1e18)
