/*
 * Lots of code here is copied 1:1 from actual game files
 *
 */

import { Color, ColorShortCode } from "./Color";
import { Layer, Shape, ShapeDescriptor, SubShape, SubShapeShortCode } from "./Shape";



interface Vector {
  x: number, y: number
}

export const arrayQuadrantIndexToOffset: Vector[] = [
  { x: 1, y: -1 }, // tr
  { x: 1, y: 1 }, // br
  { x: -1, y: 1 }, // bl
  { x: -1, y: -1 }, // tl
];



export function beginCircle(this: CanvasRenderingContext2D, x: number, y: number, r: number): void {
  if (r < 0.05) {
    this.beginPath();
    this.rect(x, y, 1, 1);
    return;
  }
  this.beginPath();
  this.arc(x, y, r, 0, 2.0 * Math.PI);
}


/////////////////////////////////////////////////////

export function radians(degrees: number) {
  return (degrees * Math.PI) / 180.0;
}




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
  return shape instanceof Shape;
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
