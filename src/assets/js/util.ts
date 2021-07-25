/*
 * Lots of code here is copied 1:1 from actual game files
 *
 */

import { Color } from "./Color";
import { Layer, Shape, ShapeDescriptor, ShortKeyConversionError, SubShape } from "./Shape";
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
  return typeof color === "string" && color in Color
}

export function isLayer(layer: unknown): layer is Layer {
  if (!(layer instanceof Array && layer.length === 4)) return false;
  if (layer.every(q => q === null)) return false;
  return layer.every(quad => {
    if (quad === null) return true;
    if (!(quad instanceof Object)) return false;
    if (!("subShape" in quad && "color" in quad)) return false;
    return isSubShape(quad.subShape) && isColor(quad.color);
  })
}

export function isShape(shape: unknown): shape is Shape {
  return shape instanceof Shape;
}

export function isShapeKey(key: unknown) {
  if (typeof key !== "string") return false;
  try {
    Shape.fromShortKey(key);
    return true;
  } catch (e) {
    if (e instanceof ShortKeyConversionError) return false;
    else throw e;
  }
}

export function isShapeDescriptor(descriptor: unknown): descriptor is ShapeDescriptor {
  if (!(descriptor instanceof Array && descriptor.length > 0 && descriptor.length <= 4)) return false;
  return descriptor.every(isLayer);
}

export function getGameObjectType(gameObject: unknown): GameObjectType | null {
  if (typeof gameObject === 'boolean') return 'boolean';
  if (isColor(gameObject)) return 'color';
  if (isShape(gameObject)) return 'shape';
  return null;
}

