declare class Element<T> {
    length: number;
    generate: (a: number) => T;
    inv: (a: T) => number;
    bit: number;
    constructor(length: number, generate: (a: number) => T, inv: (a: T) => number);
    inverse(val: T): -1 | number[];
}
declare const _default: {
    Full: (Element<string> | Element<number>)[];
    LowEntropy: (Element<string> | Element<number>)[];
};
export default _default;
//# sourceMappingURL=schema.d.ts.map