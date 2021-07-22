import { Color, ColorShortCodeUnion, possibleColorsString, ShortCodeToColor } from "./Color";




export type Quad = null | { subShape: SubShape; color: Color }
export type Layer = [Quad, Quad, Quad, Quad];
export type ShapeDescriptor = Layer[];

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
export const possibleShapesString = Object.keys(ShortCodeToSubShape).join("");
export const layerRegex = new RegExp(
  "([" + possibleShapesString + "][" + possibleColorsString + "]|-{2}){4}"
);

export type SubShapeShortCodeUnion = keyof ShortCodeToSubShape

export class ShortKeyConversionError extends Error { }

export class Shape {

  private _descriptor: ShapeDescriptor;
  get descriptor() { return this._descriptor; }

  constructor(key: string)
  constructor(descriptor: ShapeDescriptor)
  constructor(descriptorOrKey: ShapeDescriptor | string) {
    if (descriptorOrKey instanceof Array) this._descriptor = descriptorOrKey;
    else this._descriptor = this.fromShortKey(descriptorOrKey)
  }

  [Symbol.iterator] = function* (this: Shape) {
    yield* this.descriptor[Symbol.iterator]()
  }.bind(this)

  clone() {
    const shape = this.descriptor;
    return new Shape(shape.map(layer => {
      const mapped = layer.map<Quad>(quad => {
        if (quad === null) return null;
        else return { ...quad };
      })
      if (mapped.length !== 4) throw new Error("Unexpected error in cloneShape: layer does not have 4 quads")
      return mapped as Layer;
    }))
  }

  private fromShortKey(key: string) {
    const sourceLayers = key.split(":");
    if (sourceLayers.length > maxLayer) {
      throw new Error("Only " + maxLayer + " layers allowed");
    }

    let layers = [];
    for (let i = 0; i < sourceLayers.length; ++i) {
      const text = sourceLayers[i];
      if (text.length !== 8) {
        throw new ShortKeyConversionError("Invalid layer: '" + text + "' -> must be 8 characters");
      }

      if (text === "--".repeat(4)) {
        throw new ShortKeyConversionError("Empty layers are not allowed");
      }

      if (!layerRegex.test(text)) {
        throw new ShortKeyConversionError("Invalid syntax in layer " + (i + 1));
      }



      const quads: Layer = [null, null, null, null];
      for (let quad = 0; quad < 4; ++quad) {
        const shapeText = text[quad * 2 + 0];
        const subShape = ShortCodeToSubShape[shapeText as SubShapeShortCodeUnion];
        const color = ShortCodeToColor[text[quad * 2 + 1] as ColorShortCodeUnion];
        if (subShape) {
          if (!color) {
            throw new ShortKeyConversionError("Invalid shape color key: " + key);
          }
          quads[quad] = {
            subShape,
            color,
          };
        } else if (shapeText !== "-") {
          throw new ShortKeyConversionError("Invalid shape key: " + shapeText);
        }
      }
      layers.push(quads);
    }

    return layers;
  }
}