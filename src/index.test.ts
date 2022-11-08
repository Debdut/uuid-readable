import * as UUID from "uuid";
import { generate, inverse, short, check } from "./index";

describe("uuid readable", () => {
  const uuid = UUID.v4();
  const readable = generate(uuid);
  const uuidFromReadable = inverse(readable);
  const shortReadable = short(uuid);
  const checkShortReadable = check(shortReadable, uuid);

  it("generate", () => {
    expect(typeof readable).toBe("string");
  });

  it("inverse", () => {
    expect(uuidFromReadable).toBe(uuid);
  });

  it("short", () => {
    expect(typeof shortReadable).toBe("string");
  });

  it("check", () => {
    expect(checkShortReadable).toBe(true);
  });
});
