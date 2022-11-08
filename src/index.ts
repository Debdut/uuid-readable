import * as UUID from "uuid";
import Readable from "./readable";
import LowEntropy from "./low-entropy";

// Generate a uuid readable.
export const generate = (uuid: string) => {
  if (!uuid) {
    const _uuid: number[] = [];
    UUID.v4({}, _uuid);

    return Readable.generate(_uuid);
  }

  return Readable.generate(UUID.parse(uuid) as number[]);
};

// Get uuid back from readable.
export const inverse = (readable: string) => {
  return UUID.stringify(Readable.inverse(readable));
};

// Create a low entropy 32 bit uuid readable.
export const short = (uuid: string) => {
  return LowEntropy.generate(UUID.parse(uuid) as number[]);
};

// Check if the low entropy uuid is generated from the given uuid.
export const check = (readable: string, uuid: string) => {
  return LowEntropy.check(readable, UUID.parse(uuid) as number[]);
};
