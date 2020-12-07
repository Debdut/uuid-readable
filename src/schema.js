import Name from '../data/name/index.js'
import Grammer from '../data/grammer/index.js'
import Place from '../data/place/index.json'
import Animal from '../data/animal/index.js'

import _ from './util.js'

class Element {
  constructor(length, generate, inverse) {
    this.length = length,
    this.generate = generate
    this.inv = inverse

    this.bit = parseInt(Math.log2(this.length))
  }

  inverse (val) {
    const byte = this.inv(val)
    if (byte === -1) {
      return -1
    }

    return _.toBits(byte, this.bit)
  }
}

const Count = (n) => new Element(n, i => i+2, i => (i > 1 && i < 34) ? i - 2: -1)
const List = (list) => new Element(list.length, i => list[i % list.length], word => list.indexOf(word))

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
  List(Animal.Noun)
]

const LowEntropy = [
  Count(64),
  List(Animal.Adjective),
  List(Animal.Noun),
  List(Grammer.Adverb),
  List(Animal.Verb)
]

export default { Full, LowEntropy }