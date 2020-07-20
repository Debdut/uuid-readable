import Name from '../data/name/index.js'
import Grammer from '../data/grammer/index.js'
import Place from '../data/place/index.json'
import Animal from '../data/animal/index.js'

class Element {
  constructor(length, generator) {
    this.length = length,
    this.generator = generator
    this.bit = parseInt(Math.log2(this.length))
  }

  generate(i) {
    return this.generator(i)
  }
}

const Count = (n) => new Element(n, i => i+2)
const List = (list) => new Element(list.length, i => list[i % list.length])

const Schema = [
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

export default Schema