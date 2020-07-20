import Uuid from 'uuid'
import Readable from './readable.js'

const generate = (uuid) => {
  if (!uuid) {
    uuid = new Array()
    Uuid.v4({}, uuid)
  }

  return Readable.generate(uuid)
}

export default generate