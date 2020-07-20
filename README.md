# readable-uuid

[![Generic badge](https://img.shields.io/badge/build-success-brightgreen.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/tests-100%25-brightgreen.svg)](https://shields.io/)

> _Generate Easy to Remember, Readable UUIDs, that are **Shakespearean** gramatically correct sentences 🥳_

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

## Installation

```sh
npm install readable-uuid --save
```

## Usage

```js
const id = require('readable-uuid')

console.log( id() )
// Cathleen Brooke Dieball the Monolith of Alderson reflects Arly Arnie Keenan and 18 large ants
```

Pass your own UUID

```js
console.log( id(uuid) )
```

MongoDB

```js
const id = require('readable-uuid')

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

