/* global BigInt */
const assert = require('nanoassert')
function format (value) {
  if (value == null) return null
  if (typeof value === 'string') {
    if (value[1] === 'x') return value
    return '0x' + value
  }
  if (typeof value === 'boolean') return format.boolean(value)
  if (Buffer.isBuffer(value)) return format.bytes(value)
  if (typeof value === 'number') return format.number(value)
  if (typeof value === 'bigint') return format.bigint(value)

  throw new Error('Unknown data type')
}

format.boolean = function (bool) { return bool ? '0x1' : '0x0' }
format.bytes = function (buf) { return '0x' + buf.toString('hex').replace(/^0*/, '') }
format.address = function (buf) { return '0x' + buf.toString('hex').padStart(40, '0') }
format.bigint = function (bigint) { return '0x' + bigint.toString(16) }
format.number = function (num) {
  assert(Number.isInteger(num) && num >= 0, 'Only encodes positive integers')
  return '0x' + num.toString(16)
}

async function mined (tx, eth) {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    const unlisten = await eth.subscribe(eth.getTransactionReceipt(tx), function (err, res) {
      if (err) return

      unlisten()
      if (res.status === '0x1') return resolve(res)
      return reject(new Error(res))
    })
  })
}

const parse = {
  boolean (str) { return str === '0x1' },
  bytes (str) { return Buffer.from(str.slice(str[1] === 'x' ? 2 : 0), 'hex') },
  address (str) { return fixedSize(str, 20) },
  uint256 (str) { return fixedSize(str, 32) },
  number (str) { return parseInt(str.slice(2), 16) },
  string (str) { return parse.bytes(str).toString() },
  bigint (str) { return BigInt(str) }
}

function fixedSize (str, bytes) {
  const data = str.slice(str[1] === 'x' ? 2 : 0)
  const length = Math.ceil(data.length / 2)
  const offset = bytes - length
  const buf = Buffer.alloc(bytes)
  buf.write(data, offset, length, 'hex')
  return buf
}

module.exports = {
  format,
  parse,
  mined
}
