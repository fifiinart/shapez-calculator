/*
 * Lots of code here is copied 1:1 from actual game files
 *
 */
import { ShortCodeToColor, Color, ColorShortCode } from "./Color";
import { Shape, ShortCodeToSubShape, SubShape, SubShapeShortCode } from "./Shape";
export const arrayQuadrantIndexToOffset = [
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 }, // tl
];
export function beginCircle(x, y, r) {
    if (r < 0.05) {
        this.beginPath();
        this.rect(x, y, 1, 1);
        return;
    }
    this.beginPath();
    this.arc(x, y, r, 0, 2.0 * Math.PI);
}
;
const possibleShapesString = Object.keys(ShortCodeToSubShape).join("");
const possibleColorsString = Object.keys(ShortCodeToColor).join("");
export const layerRegex = new RegExp("([" + possibleShapesString + "][" + possibleColorsString + "]|-{2}){4}");
/////////////////////////////////////////////////////
export function radians(degrees) {
    return (degrees * Math.PI) / 180.0;
}
export function isSubShape(subshape) {
    return typeof subshape === "string" && !!SubShape[subshape];
}
export function isColor(color) {
    return typeof color === "string" && !!Color[color];
}
export function isLayer(layer) {
    if (!(layer instanceof Array && layer.length === 4))
        return false;
    return layer.every(quad => {
        if (quad === null)
            return true;
        if (!(quad instanceof Object))
            return false;
        if (!("subShape" in quad && "color" in quad))
            return false;
        return isSubShape(quad.subShape) && isColor(quad.color);
    });
}
export function isShape(shape) {
    return shape instanceof Shape;
}
export function getGameObjectType(gameObject) {
    if (typeof gameObject === 'boolean')
        return 'boolean';
    if (isColor(gameObject))
        return 'color';
    if (isShape(gameObject))
        return 'shape';
    return null;
}
export function shapeDescriptorToShortKey(shape) {
    let key = "";
    for (const layer of shape) {
        for (const quad of layer) {
            if (quad === null)
                key += '--';
            else
                key += SubShapeShortCode[quad.subShape] + ColorShortCode[quad.color];
        }
        key += ':';
    }
    key = key.substr(0, key.length - 1);
    return key;
}
