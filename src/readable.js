import Schema from './schema.js'
import _ from './util.js'

const partition = (parts, bytes) => {
  let bits = bytes
    .map(byte => toBits(byte))
    .reduce((a, c) => a.concat(c), [])
  let _bytes = []

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    const temp = bits.splice(part)
    const part_bits = bits
    bits = temp
    const byte = toByte(part_bits)
    _bytes.push(byte)
  }

  return _bytes
}

const toBits = (byte) => {
  const bits = []
  let length = 8
  while (length > 0) {
    bits.unshift(byte % 2)
    byte = byte >> 1
    length--
  }

  return bits
}

const toByte = (bits) => {
  let byte = 0
  for (let i = 0; i < bits.length; i++) {
    const bit = bits[i]
    byte = 2 * byte + bit
  }
  return byte
}

const sentence = (w) => `${w[0]} ${w[1]} ${w[2]} the ${_.caps(w[3])} of ${w[4]} ${w[5]} ${w[6]} ${w[7]} ${w[8]} and ${w[9]} ${w[10]} ${w[11]}`

const check = () => {
  return Schema
    .map(s => s.bit)
    .reduce((a,c) => a+c)
}

const generate = (uuid) =>  {
  const parts = Schema
    .map(s => s.bit)
  const words = partition(parts, uuid)
    .map((b, i) => Schema[i].generate(b))
  return sentence(words)
}

export default { generate, check }