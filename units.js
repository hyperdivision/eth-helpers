const assert = require('nanoassert')
const Wei = 1n
const KWei = 1000n * Wei
const MWei = 1000n * KWei
const GWei = 1000n * MWei
const µEther = 1000n * GWei
const mEther = 1000n * µEther
const Ether = 1000n * mEther
const KEther = 1000n * Ether
const MEther = 1000n * KEther
const GEther = 1000n * MEther
const TEther = 1000n * GEther

module.exports = {
  Wei,
  KWei,
  babbage: KWei,
  MWei,
  lovelace: MWei,
  GWei,
  shannon: GWei,
  µEther,
  microether: µEther,
  szabo: µEther,
  mEther,
  milliether: mEther,
  finney: mEther,
  Ether,
  KEther,
  MEther,
  GEther,
  TEther,

  convert,
  convertLossy,
  format,
  parse
}

function convert (value, from, to = Wei) {
  assert(to <= from, 'Cannot convert to lower precision')
  return value * to / from
}

function convertLossy (value, from, to = Wei) {
  return Number(value) * Number(to) / Number(from)
}

function format (value, { from, to = Wei, decimals = undefined }) {
  value = value.toString()
  var [numerator = '0', fraction = '0'] = value.split('.')

  // Scale up
  if (to < from) {
    const rate = Math.log10(Number(from / to))
    numerator = numerator + fraction.slice(0, rate).padEnd(rate, '0')
    fraction = fraction.slice(rate).padEnd(1, '0')
  }

  // Scale down
  if (to > from) {
    const rate = Math.log10(Number(to / from))
    fraction = numerator.slice(0, rate).padStart(rate, '0') + fraction
    numerator = numerator.slice(rate).padStart(1, '0')
  }

  fraction = fraction.slice(0, decimals).padEnd(numerator.length, '0')

  return [numerator, fraction]
    .join('.')

    .replace(/^0+/, '') // Remove leading 0's
    .replace(decimals == null ? /\.?0*$/ : '', '')
    .replace(/^\./, '0.') // Add leading zero if dangling decimal separator
}

function parse (value, { from, to = Wei }) {
  assert(to <= from, 'Cannot convert to lower precision')

  value = value.toString()
  var [numerator = '0', fraction = '0'] = value.split('.')

  const nFrom = Math.log10(Number(from))
  const nTo = Math.log10(Number(to))
  const rate = nFrom - nTo

  fraction = fraction.padEnd(rate, '0')
  return BigInt(numerator + fraction) * to
}
