import Name from "../data/name";
import Grammer from "../data/grammer";
import Place from "../data/place";
import Animal from "../data/animal";

import _ from "./util.js";

class Element<T> {
  length: number;
  generate: (a: number) => T;
  inv: (a: T) => number;
  bit: number;
  constructor(
    length: number,
    generate: (a: number) => T,
    inv: (a: T) => number
  ) {
    (this.length = length), (this.generate = generate);
    this.inv = inv;

    this.bit = Math.trunc(Math.log2(this.length));
  }

  inverse(val: T) {
    const byte = this.inv(val);
    if (byte === -1) {
      return -1;
    }

    return _.toBits(byte, this.bit);
  }
}

const Count = (n: number) =>
  new Element<number>(
    n,
    (i: number) => i + 2,
    (i: number) => (i > 1 && i < 34 ? i - 2 : -1)
  );

const List = (list: string[]) =>
  new Element<string>(
    list.length,
    (i: number) => list[i % list.length] as string,
    (word: string) => list.indexOf(word)
  );

const Full = [
  List(Name.First),
  List(Name.Middle),
  List(Name.Last),
  List(Grammer.PersonalNoun),
  List(Place),
  List(Grammer.Verb),
  List(Name.First),
  List(Name.Middle),
  List(Name.Last),
  Count(32),
  List(Animal.Adjective),
  List(Animal.Noun),
];

const LowEntropy = [
  Count(64),
  List(Animal.Adjective),
  List(Animal.Noun),
  List(Grammer.Adverb),
  List(Animal.Verb),
];

export default { Full, LowEntropy };
