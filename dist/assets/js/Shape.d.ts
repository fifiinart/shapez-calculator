import { Color } from "./Color";
export declare type Quad = null | {
    subShape: SubShape;
    color: Color;
};
export declare type Layer = [Quad, Quad, Quad, Quad];
export declare type ShapeDescriptor = Layer[];
export declare const maxLayer = 4;
/** @enum {string} */
export declare enum SubShape {
    rect = "rect",
    circle = "circle",
    star = "star",
    windmill = "windmill"
}
/** @enum {string} */
export declare const SubShapeShortCode: {
    readonly rect: "R";
    readonly circle: "C";
    readonly star: "S";
    readonly windmill: "W";
};
declare type SubShapeShortCode = typeof SubShapeShortCode;
declare type ShortCodeToSubShape = {
    [K in keyof SubShapeShortCode as SubShapeShortCode[K]]: K;
};
/** @enum {SubShape} */
export declare const ShortCodeToSubShape: ShortCodeToSubShape;
export declare type SubShapeShortCodeUnion = keyof ShortCodeToSubShape;
export declare class ShortKeyConversionError extends Error {
}
export declare class Shape {
    private _descriptor;
    get descriptor(): ShapeDescriptor;
    constructor(key: string);
    constructor(descriptor: ShapeDescriptor);
    [Symbol.iterator]: () => Generator<Layer, void, undefined>;
    clone(): Shape;
    private fromShortKey;
}
export {};
