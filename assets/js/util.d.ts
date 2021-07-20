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
interface Vector {
    x: number;
    y: number;
}
export declare const arrayQuadrantIndexToOffset: Vector[];
/** @enum {string} */
export declare enum Color {
    red = "red",
    green = "green",
    blue = "blue",
    yellow = "yellow",
    purple = "purple",
    cyan = "cyan",
    white = "white",
    uncolored = "uncolored"
}
/** @enum {string} */
export declare const ColorShortCode: {
    readonly red: "r";
    readonly green: "g";
    readonly blue: "b";
    readonly yellow: "y";
    readonly purple: "p";
    readonly cyan: "c";
    readonly white: "w";
    readonly uncolored: "u";
};
declare type ColorShortCode = typeof ColorShortCode;
/** @enum {string} */
export declare const ColorHexCodes: {
    readonly red: "#ff666a";
    readonly green: "#78ff66";
    readonly blue: "#66a7ff";
    readonly yellow: "#fcf52a";
    readonly purple: "#dd66ff";
    readonly cyan: "#87fff5";
    readonly white: "#ffffff";
    readonly uncolored: "#aaaaaa";
};
declare type ShortCodeToColor = {
    [K in keyof ColorShortCode as ColorShortCode[K]]: K;
};
export declare type SubShapeShortCodeUnion = keyof ShortCodeToSubShape;
export declare type ColorShortCodeUnion = keyof ShortCodeToColor;
/** @enum {Color} */
export declare const ShortCodeToColor: ShortCodeToColor;
export declare function beginCircle(this: CanvasRenderingContext2D, x: number, y: number, r: number): void;
export declare const layerRegex: RegExp;
export declare function radians(degrees: number): number;
export declare type Quad = null | {
    subShape: SubShape;
    color: Color;
};
export declare type Layer = [Quad, Quad, Quad, Quad];
export declare type Shape = Layer[];
export interface GameObjectTypeDictionary {
    shape: Shape;
    color: Color;
    boolean: boolean;
}
export declare type GameObject = GameObjectTypeDictionary[keyof GameObjectTypeDictionary];
export declare type GameObjectType = keyof GameObjectTypeDictionary;
export declare type TypeFromGameObject<T> = T extends boolean ? "boolean" : T extends Color ? "color" : T extends Shape ? "shape" : never;
export declare function isSubShape(subshape: unknown): subshape is SubShape;
export declare function isColor(color: unknown): color is Color;
export declare function isLayer(layer: unknown): layer is Layer;
export declare function isShape(shape: unknown): shape is Shape;
export declare function getGameObjectType(gameObject: unknown): GameObjectType | null;
export declare function shapeDescriptorToShortKey(shape: Shape): string;
export {};
