import Schema from "./schema.js";
import _ from "./util.js";

const partition = (parts: number[], bytes: number[]) => {
  let bits = Array.from(bytes)
    .map((byte) => _.toBits(byte))
    .map((bits) => bits.slice(0, 2))
    .reduce((a, c) => a.concat(c), []);
  const _bytes = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i] as number;
    const temp = bits.splice(part);
    const part_bits = bits;
    bits = temp;
    const byte = _.toByte(part_bits);
    _bytes.push(byte);
  }

  return _bytes;
};

const sentence = (w: (string | number | undefined)[]) =>
  `${w[0]} ${w[1]} ${w[2]} ${w[3]} ${w[4]}`;
const deSentence = (s: string) => {
  const w = s.trim().split(" ");

  return [parseInt(w[0] as string, 10), w[1], w[2], w[3], w[4]];
};

const generate = (uuid: number[]) => {
  const parts = Schema.LowEntropy.map((s) => s.bit);

  const words = partition(parts, uuid).map((b, i) =>
    Schema.LowEntropy[i]?.generate(b)
  );

  return sentence(words);
};

const check = (readable: string, uuid: number[]) => {
  const uuidBits = Array.from(uuid)
    .map((byte) => _.toBits(byte))
    .map((bits) => bits.slice(0, 2))
    .reduce((a, c) => a.concat(c), []);

  const readableBits = deSentence(readable).map((w, i) =>
    Schema.LowEntropy[i]?.inverse(w as never)
  );

  if (readableBits.indexOf(-1) >= 0) {
    return false;
  }

  const readableBitsReduced = readableBits.reduce(
    (a, c) => (a as number[]).concat(c as number[]),
    []
  );

  for (let i = 0; i < uuidBits.length; i++) {
    // @ts-ignore
    if (uuidBits[i] !== readableBitsReduced[i]) {
      return false;
    }
  }

  return true;
};

export default { generate, check };
