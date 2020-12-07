import Schema from './schema.js'
import _ from './util.js'

const partition = (parts, bytes) => {
  let bits = Array.from(bytes)
    .map(byte => _.toBits(byte))
    .map(bits => bits.slice(0, 2))
    .reduce((a, c) => a.concat(c), [])
  let _bytes = []

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    const temp = bits.splice(part)
    const part_bits = bits
    bits = temp
    const byte = _.toByte(part_bits)
    _bytes.push(byte)
  }

  return _bytes
}

const sentence = (w) => `${w[0]} ${w[1]} ${w[2]} ${w[3]} ${w[4]}`
const deSentence = (s) => {
  const w = s
    .trim()
    .split(' ')
  w[0] = parseInt(w[0], 10)

  return w
}

const generate = (uuid) => {
  const parts = Schema.LowEntropy
    .map(s => s.bit)
  
  const words = partition(parts, uuid)
    .map((b, i) => Schema.LowEntropy[i].generate(b))

  return sentence(words)
}

const check = (readable, uuid) => {
  let uuidBits = Array.from(uuid)
    .map(byte => _.toBits(byte))
    .map(bits => bits.slice(0, 2))
    .reduce((a, c) => a.concat(c), [])

  let readableBits = deSentence(readable)
    .map((w, i) => Schema.LowEntropy[i].inverse(w))
     
  if (readableBits.indexOf(-1) >= 0) {
    return false
  }

  readableBits = readableBits
    .reduce((a, c) => a.concat(c), [])

  for (let i = 0; i < uuidBits.length; i++) {
    if (uuidBits[i] !== readableBits[i]) {
      return false
    }
  }

  return true
}

export default { generate, check }