const diff = require('pretty-string-diff')
const { Ether, Wei, GWei, format, parse } = require('./units')

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
