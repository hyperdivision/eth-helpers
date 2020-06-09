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
