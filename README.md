# uuid-readable

[![Generic badge](https://img.shields.io/badge/build-success-brightgreen.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/tests-100%25-brightgreen.svg)](https://shields.io/)

> _Generate Easy to Remember, Readable UUIDs, that are **Shakespearean** and Gramatically Correct Sentences 🥳_

![Logo](/assets/logo.png)

- Built on UUID v4
- Supports any UUID version (v1, v3, v4, v5, v6)
- Optionally pass your UUID to generate a unique sentence
- 128 Bit Crypto Secure
- Gramatically correct sentences
- Easy to remember
- Has a Shakespeare feeling
- Universally Unique Identifier

## Example

> _Loren Chariot Addy the Titbit of Cholame questioned Cele Garth Alda and 16 windy frogs_

> _Drucill Hubert Lewse the Comer of Avera rejoices Fiann Craggy Florie and 5 hard trouts_

> _Jacquette Brandt John the Pectus of Barnsdall doubted Glenn Gay Gregg and 12 noisy stoats_

### Note 

> _Think of it this way, it's impossible to remember 32 random characters in UUID, but these sentences even though hard can be remembered, and are definitely fun!_

## Installation

```sh
npm install uuid-readable --save
```

## Usage

```js
const id = require('uuid-readable')

console.log( id() )
// Cathleen d Dieball the Monolith of Alderson reflects Arly Arnie Keenan and 18 large ants
```

Pass your own UUID

```js
console.log( id(uuid) )
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

## Use Cases

- Customer Support

You can remember parts of the id and that's enough to search it up and communicate throughout a large team. I will be using it as a secret generation for a service, and customer tickets.
