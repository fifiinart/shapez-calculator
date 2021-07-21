import { Color } from "./Color";
import { Layer, Shape, SubShape } from "./Shape";
interface Vector {
    x: number;
    y: number;
}
export declare const arrayQuadrantIndexToOffset: Vector[];
export declare function beginCircle(this: CanvasRenderingContext2D, x: number, y: number, r: number): void;
export declare const layerRegex: RegExp;
export declare function radians(degrees: number): number;
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
