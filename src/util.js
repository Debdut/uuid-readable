const caps = (w) => w.charAt(0).toUpperCase() + w.slice(1)
const deCaps = (w) => w.toLowerCase()

const toBits = (byte, length = 8) => {
  const bits = []
  for (let i = 0; i < length; i++) {
    bits.unshift(byte % 2)
    byte = byte >> 1
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

export default { caps, deCaps, toBits, toByte }