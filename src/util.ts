/*
 * Lots of code here is copied 1:1 from actual game files
 *
 */

export const maxLayer = 4;

/** @enum {string} */
export enum SubShape {
  rect = "rect",
  circle = "circle",
  star = "star",
  windmill = "windmill",
};

/** @enum {string} */
export const SubShapeShortCode = {
  [SubShape.rect]: "R",
  [SubShape.circle]: "C",
  [SubShape.star]: "S",
  [SubShape.windmill]: "W",
} as const;

type SubShapeShortCode = typeof SubShapeShortCode;

type ShortCodeToSubShape = {
  [K in keyof SubShapeShortCode as SubShapeShortCode[K]]: K;
};

/** @enum {SubShape} */
export const ShortCodeToSubShape = {} as ShortCodeToSubShape;
for (const key in SubShapeShortCode) {
  // @ts-ignore
  ShortCodeToSubShape[SubShapeShortCode[key]] = key;
}

interface Vector {
  x: number, y: number
}

export const arrayQuadrantIndexToOffset: Vector[] = [
  { x: 1, y: -1 }, // tr
  { x: 1, y: 1 }, // br
  { x: -1, y: 1 }, // bl
  { x: -1, y: -1 }, // tl
];

// From colors.js
/** @enum {string} */
export enum Color {
  red = "red",
  green = "green",
  blue = "blue",

  yellow = "yellow",
  purple = "purple",
  cyan = "cyan",

  white = "white",
  uncolored = "uncolored",
};

/** @enum {string} */
export const ColorShortCode = {
  [Color.red]: "r",
  [Color.green]: "g",
  [Color.blue]: "b",

  [Color.yellow]: "y",
  [Color.purple]: "p",
  [Color.cyan]: "c",

  [Color.white]: "w",
  [Color.uncolored]: "u",
} as const;

type ColorShortCode = typeof ColorShortCode;

/** @enum {string} */
export const ColorHexCodes = {
  [Color.red]: "#ff666a",
  [Color.green]: "#78ff66",
  [Color.blue]: "#66a7ff",

  // red + green
  [Color.yellow]: "#fcf52a",

  // red + blue
  [Color.purple]: "#dd66ff",

  // blue + green
  [Color.cyan]: "#87fff5",

  // blue + green + red
  [Color.white]: "#ffffff",

  [Color.uncolored]: "#aaaaaa",
} as const;

type ShortCodeToColor = {
  [K in keyof ColorShortCode as ColorShortCode[K]]: K;
};

export type SubShapeShortCodeUnion = keyof ShortCodeToSubShape
export type ColorShortCodeUnion = keyof ShortCodeToColor;

/** @enum {Color} */
export const ShortCodeToColor = {} as ShortCodeToColor;
for (const key in ColorShortCode) {
  // @ts-ignore
  ShortCodeToColor[ColorShortCode[key]] = key;
}

export function beginCircle(this: CanvasRenderingContext2D, x: number, y: number, r: number): void {
  if (r < 0.05) {
    this.beginPath();
    this.rect(x, y, 1, 1);
    return;
  }
  this.beginPath();
  this.arc(x, y, r, 0, 2.0 * Math.PI);
};

const possibleShapesString = Object.keys(ShortCodeToSubShape).join("");
const possibleColorsString = Object.keys(ShortCodeToColor).join("");
export const layerRegex = new RegExp(
  "([" + possibleShapesString + "][" + possibleColorsString + "]|-{2}){4}"
);

/////////////////////////////////////////////////////

export function radians(degrees: number) {
  return (degrees * Math.PI) / 180.0;
}

export type Quad = null | { subShape: SubShape; color: Color }
export type Layer = [Quad, Quad, Quad, Quad];
export type Shape = Layer[];


export interface GameObjectTypeDictionary {
  shape: Shape;
  color: Color;
  boolean: boolean;
}

export type GameObject = GameObjectTypeDictionary[keyof GameObjectTypeDictionary]
export type GameObjectType = keyof GameObjectTypeDictionary

export type TypeFromGameObject<T> =
  T extends boolean ? "boolean" :
  T extends Color ? "color" :
  T extends Shape ? "shape" : never

export function isSubShape(subshape: unknown): subshape is SubShape {
  return typeof subshape === "string" && !!SubShape[subshape as keyof typeof SubShape]
}

export function isColor(color: unknown): color is Color {
  return typeof color === "string" && !!Color[color as keyof typeof Color]
}

export function isLayer(layer: unknown): layer is Layer {
  if (!(layer instanceof Array && layer.length === 4)) return false;
  return layer.every(quad => {
    if (quad === null) return true;
    if (!(quad instanceof Object)) return false;
    if (!("subShape" in quad && "color" in quad)) return false;
    return isSubShape(quad.subShape) && isColor(quad.color);
  })
}

export function isShape(shape: unknown): shape is Shape {
  if (!(shape instanceof Array && shape.length > 0 && shape.length <= 4)) return false;
  return shape.every(isLayer);
}

export function getGameObjectType(gameObject: unknown): GameObjectType | null {
  if (typeof gameObject === 'boolean') return 'boolean';
  if (isColor(gameObject)) return 'color';
  if (isShape(gameObject)) return 'shape';
  return null;
}

export function shapeDescriptorToShortKey(shape: Shape): string {
  let key = ""
  for (const layer of shape) {
    for (const quad of layer) {
      if (quad === null) key += '--';
      else key += SubShapeShortCode[quad.subShape] + ColorShortCode[quad.color];
    }
    key += ':';
  }
  key = key.substr(0, key.length - 1);
  return key;
}

export function cloneShape(shape: Shape): Shape {
  return shape.map(layer => {
    const mapped = layer.map<Quad>(quad => {
      if (quad === null) return null;
      else return { ...quad };
    })
    if (mapped.length !== 4) throw new Error("Unexpected error in cloneShape: layer does not have 4 quads")
    return mapped as Layer;
  })
}