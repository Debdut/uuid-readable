/*!
 * uuid-readable v0.0.0
 * (c) Debdut Karmakar <iawaiponly@gmail.com>
 * Released under the MIT License.
 */

import * as UUID from 'uuid';

var First = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var Last = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var Middle = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var Name = { First: First, Last: Last, Middle: Middle };

var Adjective$1 = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var Adverb = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var Verb$1 = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var PersonalNoun = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var Grammer = { Adjective: Adjective$1, Adverb: Adverb, Verb: Verb$1, PersonalNoun: PersonalNoun };

var Place = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var Noun = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var Adjective = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var Verb = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var Animal = { Noun: Noun, Adjective: Adjective, Verb: Verb };

var caps = function (w) { return w.charAt(0).toUpperCase() + w.slice(1); };
var deCaps = function (w) { return w.toLowerCase(); };
var toBits = function (byte, length) {
    if (length === void 0) { length = 8; }
    var bits = [];
    for (var i = 0; i < length; i++) {
        bits.unshift(byte % 2);
        byte = byte >> 1;
    }
    return bits;
};
var toByte = function (bits) {
    var byte = 0;
    for (var i = 0; i < bits.length; i++) {
        var bit = bits[i];
        byte = 2 * byte + bit;
    }
    return byte;
};
var _ = { caps: caps, deCaps: deCaps, toBits: toBits, toByte: toByte };

var Element = /** @class */ (function () {
    function Element(length, generate, inv) {
        (this.length = length), (this.generate = generate);
        this.inv = inv;
        this.bit = Math.trunc(Math.log2(this.length));
    }
    Element.prototype.inverse = function (val) {
        var byte = this.inv(val);
        if (byte === -1) {
            return -1;
        }
        return _.toBits(byte, this.bit);
    };
    return Element;
}());
var Count = function (n) {
    return new Element(n, function (i) { return i + 2; }, function (i) { return (i > 1 && i < 34 ? i - 2 : -1); });
};
var List = function (list) {
    return new Element(list.length, function (i) { return list[i % list.length]; }, function (word) { return list.indexOf(word); });
};
var Full = [
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
var LowEntropy$1 = [
    Count(64),
    List(Animal.Adjective),
    List(Animal.Noun),
    List(Grammer.Adverb),
    List(Animal.Verb),
];
var Schema = { Full: Full, LowEntropy: LowEntropy$1 };

var partition$1 = function (parts, bytes) {
    var bits = Array.from(bytes)
        .map(function (byte) { return _.toBits(byte); })
        .reduce(function (a, c) { return a.concat(c); }, []);
    var _bytes = [];
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        var temp = bits.splice(part);
        var part_bits = bits;
        bits = temp;
        var byte = _.toByte(part_bits);
        _bytes.push(byte);
    }
    return _bytes;
};
var dePartition = function (bitsList) {
    var bits = bitsList.reduce(function (a, c) { return a.concat(c); }, []);
    var bytes = [];
    for (var i = 0; i < 16; i++) {
        var part = bits.slice(8 * i, 8 * (i + 1));
        var byte = _.toByte(part);
        bytes.push(byte);
    }
    return bytes;
};
var sentence$1 = function (w) {
    return "".concat(w[0], " ").concat(w[1], " ").concat(w[2], " the ").concat(_.caps("".concat(w[3])), " of ").concat(w[4], " ").concat(w[5], " ").concat(w[6], " ").concat(w[7], " ").concat(w[8], " and ").concat(w[9], " ").concat(w[10], " ").concat(w[11]);
};
var deSentence$1 = function (s) {
    var rest = s.split(" the ");
    var p1 = rest[0].trim().split(" ");
    rest = rest[1].split(" of ");
    var p2 = rest[0].trim().split(" ");
    rest = rest[1].split(" and ");
    var p3 = rest[0].trim().split(" ");
    var p4 = rest[1].trim().split(" ");
    var w = [
        p1[0],
        p1[1],
        p1[2],
        _.deCaps(p2[0] || ""),
        p3[0],
        p3[1],
        p3[2],
        p3[3],
        p3[4],
        parseInt(p4[0] || "", 10),
        p4[1],
        p4[2],
    ];
    return w;
};
var valid = function () {
    return Schema.Full.map(function (s) { return s.bit; }).reduce(function (a, c) { return a + c; }) === 128;
};
// Parts
// [
//   12, 11, 14, 13, 13,
//   10, 12, 11, 14,  5,
//    6,  7
// ]
var generate$2 = function (uuid) {
    var parts = Schema.Full.map(function (s) { return s.bit; });
    var words = partition$1(parts, uuid).map(function (b, i) { var _a; return (_a = Schema.Full[i]) === null || _a === void 0 ? void 0 : _a.generate(b); });
    return sentence$1(words);
};
var inverse$1 = function (readable) {
    var bits = deSentence$1(readable).map(function (w, i) { var _a; return (_a = Schema.Full[i]) === null || _a === void 0 ? void 0 : _a.inverse(w); });
    // Check -1 in words
    if (bits.indexOf(-1) >= 0) {
        throw new Error("Not A Valid UUID Readable");
    }
    // dePartition
    var bytes = dePartition(bits);
    return bytes;
};
var Readable = { generate: generate$2, inverse: inverse$1, valid: valid };

var partition = function (parts, bytes) {
    var bits = Array.from(bytes)
        .map(function (byte) { return _.toBits(byte); })
        .map(function (bits) { return bits.slice(0, 2); })
        .reduce(function (a, c) { return a.concat(c); }, []);
    var _bytes = [];
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        var temp = bits.splice(part);
        var part_bits = bits;
        bits = temp;
        var byte = _.toByte(part_bits);
        _bytes.push(byte);
    }
    return _bytes;
};
var sentence = function (w) {
    return "".concat(w[0], " ").concat(w[1], " ").concat(w[2], " ").concat(w[3], " ").concat(w[4]);
};
var deSentence = function (s) {
    var w = s.trim().split(" ");
    return [parseInt(w[0], 10), w[1], w[2], w[3], w[4]];
};
var generate$1 = function (uuid) {
    var parts = Schema.LowEntropy.map(function (s) { return s.bit; });
    var words = partition(parts, uuid).map(function (b, i) { var _a; return (_a = Schema.LowEntropy[i]) === null || _a === void 0 ? void 0 : _a.generate(b); });
    return sentence(words);
};
var check$1 = function (readable, uuid) {
    var uuidBits = Array.from(uuid)
        .map(function (byte) { return _.toBits(byte); })
        .map(function (bits) { return bits.slice(0, 2); })
        .reduce(function (a, c) { return a.concat(c); }, []);
    var readableBits = deSentence(readable).map(function (w, i) { var _a; return (_a = Schema.LowEntropy[i]) === null || _a === void 0 ? void 0 : _a.inverse(w); });
    if (readableBits.indexOf(-1) >= 0) {
        return false;
    }
    var readableBitsReduced = readableBits.reduce(function (a, c) { return a.concat(c); }, []);
    for (var i = 0; i < uuidBits.length; i++) {
        // @ts-ignore
        if (uuidBits[i] !== readableBitsReduced[i]) {
            return false;
        }
    }
    return true;
};
var LowEntropy = { generate: generate$1, check: check$1 };

// Generate a uuid readable.
var generate = function (uuid) {
    if (!uuid) {
        var _uuid = [];
        UUID.v4({}, _uuid);
        return Readable.generate(_uuid);
    }
    return Readable.generate(UUID.parse(uuid));
};
// Get uuid back from readable.
var inverse = function (readable) {
    return UUID.stringify(Readable.inverse(readable));
};
// Create a low entropy 32 bit uuid readable.
var short = function (uuid) {
    return LowEntropy.generate(UUID.parse(uuid));
};
// Check if the low entropy uuid is generated from the given uuid.
var check = function (readable, uuid) {
    return LowEntropy.check(readable, UUID.parse(uuid));
};

export { check, generate, inverse, short };
//# sourceMappingURL=index.esm.js.map
