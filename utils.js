function format (value) {
  if (value == null) return null
  if (typeof value === 'string') {
    if (value[1] === 'x') return value
    return '0x' + value
  }
  if (Buffer.isBuffer(value)) return '0x' + value.toString('hex')
  if (typeof value === 'number') return '0x' + value.toString(16)
  if (typeof value === 'bigint') return '0x' + value.toString(16)

  throw new Error('Unknown data type')
}

module.exports = {
  format
}
