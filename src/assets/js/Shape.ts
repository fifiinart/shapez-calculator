import { Color, ColorShortCode, ColorShortCodeUnion, possibleColorsString, ShortCodeToColor } from './Color'
/** @enum {string} */
export enum SubShape {
  rect = 'rect',
  circle = 'circle',
  star = 'star',
  windmill = 'windmill',
};

export type Quad = null | { subShape: SubShape; color: Color }
export type Layer = [Quad, Quad, Quad, Quad];
export type ShapeDescriptor = Layer[];

export const maxLayer = 4

/** @enum {string} */
export const SubShapeShortCode = {
  [SubShape.rect]: 'R',
  [SubShape.circle]: 'C',
  [SubShape.star]: 'S',
  [SubShape.windmill]: 'W'
} as const

type ShortCodeToSubShape = {
  [K in keyof typeof SubShapeShortCode as typeof SubShapeShortCode[K]]: K;
};

/** @enum {SubShape} */
const ShortCodeToSubShape = {} as {
  [K in keyof typeof SubShapeShortCode as typeof SubShapeShortCode[K]]: K;
}
for (const key in SubShapeShortCode) {
  // @ts-ignore
  ShortCodeToSubShape[SubShapeShortCode[key]] = key
}

export { ShortCodeToSubShape }

export const possibleShapesString = Object.keys(ShortCodeToSubShape).join('')
export const layerRegex = new RegExp(
  '([' + possibleShapesString + '][' + possibleColorsString + ']|-{2}){4}'
)

export type SubShapeShortCodeUnion = keyof ShortCodeToSubShape

export class ShortKeyConversionError extends Error { }

export class Shape {
  private _descriptor: ShapeDescriptor;
  get descriptor() { return this._descriptor }

  constructor(descriptorOrKey: ShapeDescriptor) {
    this._descriptor = descriptorOrKey
  }

  toString() {
    return `Shape(${this.toShortKey()})`
  }

  [Symbol.iterator] = function* (this: Shape) {
    yield* this.descriptor[Symbol.iterator]()
  }.bind(this)

  clone() {
    const shape = this.descriptor
    return new Shape(shape.map(layer => {
      const mapped = layer.map<Quad>(quad => {
        if (quad === null) return null
        else return { ...quad }
      })
      if (mapped.length !== 4) throw new Error('Unexpected error in cloneShape: layer does not have 4 quads')
      return mapped as Layer
    }))
  }

  toShortKey() {
    return this.descriptor.map(
      l => l.map(
        q => q === null
          ? '--'
          : SubShapeShortCode[q.subShape] + ColorShortCode[q.color]
      ).join('')
    ).join(':')
  }

  static fromShortKey(key: string) {
    const sourceLayers = key.split(':')
    if (!sourceLayers[0]) {
      throw new ShortKeyConversionError('Expected 1-4 layers, recieved 0')
    }
    if (sourceLayers.length > maxLayer) {
      throw new ShortKeyConversionError(`Expected 1-4 layers, recieved ${sourceLayers.length}`)
    }

    const layers = []
    for (let i = 0; i < sourceLayers.length; ++i) {
      const text = sourceLayers[i]
      if (text.length !== 8) {
        throw new ShortKeyConversionError("Invalid layer: '" + text + "' -> must be 8 characters")
      }

      if (text === '--'.repeat(4)) {
        throw new ShortKeyConversionError('Empty layers are not allowed')
      }

      if (!layerRegex.test(text)) {
        throw new ShortKeyConversionError('Invalid syntax in layer ' + (i + 1))
      }

      const quads: Layer = [null, null, null, null]
      for (let quad = 0; quad < 4; ++quad) {
        const shapeText = text[quad * 2 + 0]
        const subShape = ShortCodeToSubShape[shapeText as SubShapeShortCodeUnion]
        const color = ShortCodeToColor[text[quad * 2 + 1] as ColorShortCodeUnion]
        if (subShape) {
          if (!color) {
            throw new ShortKeyConversionError('Invalid shape color key: ' + key)
          }
          quads[quad] = {
            subShape,
            color
          }
        } else if (shapeText !== '-') {
          throw new ShortKeyConversionError('Invalid shape key: ' + shapeText)
        }
      }
      layers.push(quads)
    }

    return new Shape(layers)
  }
}
