import UUID from 'uuid'
import Readable from './readable.js'
import LowEntropy from './low-entropy.js'
import readable from './readable.js'

const generate = (uuid) => {
  if (!uuid) {
    uuid = new Array()
    UUID.v4({}, uuid)

    return Readable.generate(uuid)
  }

  return Readable.generate(UUID.parse(uuid))
}

const inverse = (readable) => {
  return UUID.stringify(Readable.inverse(readable))
}

const short = (uuid) => {
  return LowEntropy.generate(UUID.parse(uuid))
}

const check = (readable, uuid)  => {
  return LowEntropy.check(readable, UUID.parse(uuid))
}

export default { generate, inverse, short, check }