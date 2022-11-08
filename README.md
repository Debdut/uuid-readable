# uuid-readable [![Generic badge](https://img.shields.io/twitter/follow/KarmakarDebdut?style=social)](https://twitter.com/KarmakarDebdut) [![Generic Badge](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fctt.ac%2F9y3cf)](https://ctt.ac/9y3cf)

![Generic badge](https://img.shields.io/badge/build-success-brightgreen.svg) ![Generic badge](https://img.shields.io/badge/tests-100%25-brightgreen.svg)

> _Generate Easy to Remember, Readable UUIDs, that are **Shakespearean** and Grammatically Correct Sentences 🥳_

![Logo](/assets/logo.png)

- Built on UUID v4
- Optionally pass your UUID to generate a unique sentence
- 128 Bit Crypto Secure
- Grammatically correct sentences
- Easy to remember
- Has a Shakespeare feeling
- Universally Unique Identifier
- Generate Low Entropy 32 Bit Tokens

## Example

### 128 Bit UUID Readable

> _Loren Chariot Addy the Titbit of Cholame questioned Cele Garth Alda and 16 windy frogs_

> _Drucill Hubert Lewse the Comer of Avera rejoices Fiann Craggy Florie and 5 hard trouts_

> _Jacquette Brandt John the Pectus of Barnsdall doubted Glenn Gay Gregg and 12 noisy stoats_

### Low Entropy 32 Bit

> _11 pretty dragonflies regularly sang_

> _2 fat toads happily buzzed_

### Note 

> _Think of it this way, it's impossible to remember 32 random characters in UUID, but these sentences even though hard can be remembered, and are definitely fun!_

Alternatively, generate 32 bit readable small sentences from 128 bit UUID and check later if they match.

## API

Thanks to [uuid.rocks](https://uuid.rocks), we have an [API Endpoint](https://uuid.rocks/plain?readable)

```sh
curl https://uuid.rocks/plain?readable
# Joyce Ange Barrett the Orient of Alco killed Marlyn Hewett Lady and 11 strong bulls
```

## Installation

```sh
npm install uuid-readable --save
```

## Usage

```js
const id = require('uuid-readable')

console.log( id.generate() )
// Cathleen d Dieball the Monolith of Alderson reflects Arly Arnie Keenan and 18 large ants
```

Pass your own UUID

```js
console.log( id.generate(uuid) )
```

Inverse, get UUID back from Readable UUID

```js
const uuid = '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const readable = id.generate(uuid)
const inverse = id.inverse(readable)
 
inverse === uuid // true
```

Low Entropy 32bit Readable (Use as Readable Hash)

```js
const short = id.short(uuid)
// 5 fat toads happily buzzed

// Check Later
id.check(short, uuid) //true
```

MongoDB

```js
const id = require('uuid-readable')

readable_id: {
  'type': String,
  'default': id
}

// or use as real id

_id: {
  'type': String,
  'default': id
}
```

## How does it work?

UUID is converted to 128 bits. 

- 12 bits for first name
- 11 bits for middle name
- 14 bits for last name
- 13 bits for a personal pronoun
- 13 bits for name of place
- 10 bits for verb
- 12 bits for first name
- 11 bits for middle name
- 14 bits for last name
- 5 bits for number of animals
- 6 bits for animal adjective
- 7 bits for animal

For example, 7 bits for animal means we choose one animal from a list of atleast `2**7 = 128` animals

Alternatively, the inverse funcation proves that UUID and Readable UUID form a bijection, hence no loss of entropy.

## Use Cases

- Customer Support

You can remember parts of the id and that's enough to search it up and communicate throughout a large team. I will be using it as a secret generation for a service, and customer tickets.

## Sponsors

[Shakespeare Geek](http://www.shakespearegeek.com)
