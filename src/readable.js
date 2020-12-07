import Schema from './schema.js'
import _ from './util.js'

const partition = (parts, bytes) => {
  let bits = Array.from(bytes)
    .map(byte => _.toBits(byte))
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

const dePartition = (bitsList) => {
  const bits = bitsList
    .reduce((a, c) => a.concat(c), [])

  let bytes = []

  for (let i = 0; i < 16; i++) {
    const part = bits.slice(8*i, 8*(i+1))
    const byte = _.toByte(part)
    bytes.push(byte)
  }

  return bytes
}

const sentence = (w) => `${w[0]} ${w[1]} ${w[2]} the ${_.caps(w[3])} of ${w[4]} ${w[5]} ${w[6]} ${w[7]} ${w[8]} and ${w[9]} ${w[10]} ${w[11]}`
const deSentence = (s) => {
  let rest, p1, p2, p3, p4

  rest = s.split(' the ')
  p1 = rest[0]

  rest = rest[1].split(' of ')
  p2 = rest[0]

  rest = rest[1].split(' and ')
  p3 = rest[0]
  p4 = rest[1]

  p1 = p1
    .trim()
    .split(' ')
  p2 = p2
    .trim()
    .split(' ')
  p3 = p3
    .trim()
    .split(' ')
  p4 = p4
    .trim()
    .split(' ')

  const w = [p1[0], p1[1], p1[2], _.deCaps(p2[0]), p3[0], p3[1], p3[2], p3[3], p3[4], parseInt(p4[0], 10), p4[1], p4[2]]

  return w
}

const valid = () => {
  return (Schema.Full
    .map(s => s.bit)
    .reduce((a,c) => a+c)) === 128
}

// Parts
// [
//   12, 11, 14, 13, 13,
//   10, 12, 11, 14,  5,
//    6,  7
// ]

const generate = (uuid) =>  {
  const parts = Schema.Full
    .map(s => s.bit)
  const words = partition(parts, uuid)
    .map((b, i) => Schema.Full[i].generate(b))
  return sentence(words)
}

const inverse = (readable) => {
  const bits = deSentence(readable)
    .map((w, i) => Schema.Full[i].inverse(w))
  
  // Check -1 in words
  if (bits.indexOf(-1) >= 0) {
    throw new Error('Not A Valid UUID Readable')
  }

  // dePartition
  const bytes = dePartition(bits)

  return bytes
}

export default { generate, inverse, valid }