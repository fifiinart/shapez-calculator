import { maxLayer, layerRegex, Layer, ShortCodeToSubShape, SubShapeShortCodeUnion, ShortCodeToColor, ColorShortCodeUnion } from "./util.js";

export class ShortKeyConversionError extends Error { }

/**
 * Generates the definition from the given short key
 */

export function fromShortKey(key: string) {
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
