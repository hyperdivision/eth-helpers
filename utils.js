function format (value) {
  if (value == null) return null
  if (typeof value === 'string') {
    if (value[1] === 'x') return value
    return '0x' + value
  }
  if (typeof value === 'boolean') return '0x' + (value ? '1' : '0')
  if (Buffer.isBuffer(value)) return '0x' + value.toString('hex').replace(/^0*/, '')
  if (typeof value === 'number' && Number.isInteger(value)) return '0x' + value.toString(16)
  if (typeof value === 'bigint') return '0x' + value.toString(16)

  throw new Error('Unknown data type')
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

module.exports = {
  format,
  mined
}
