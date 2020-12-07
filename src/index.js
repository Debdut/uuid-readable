import UUID from 'uuid'
import Readable from './readable.js'

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

export default { generate, inverse}