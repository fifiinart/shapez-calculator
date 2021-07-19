/*
 * Lots of code here is copied 1:1 from actual game files
 *
 */
export const maxLayer = 4;
/** @enum {string} */
export var SubShape;
(function (SubShape) {
    SubShape["rect"] = "rect";
    SubShape["circle"] = "circle";
    SubShape["star"] = "star";
    SubShape["windmill"] = "windmill";
})(SubShape || (SubShape = {}));
;
/** @enum {string} */
export const SubShapeShortCode = {
    [SubShape.rect]: "R",
    [SubShape.circle]: "C",
    [SubShape.star]: "S",
    [SubShape.windmill]: "W",
};
/** @enum {SubShape} */
export const ShortCodeToSubShape = {};
for (const key in SubShapeShortCode) {
    // @ts-ignore
    ShortCodeToSubShape[SubShapeShortCode[key]] = key;
}
export const arrayQuadrantIndexToOffset = [
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 }, // tl
];
// From colors.js
/** @enum {string} */
export var Color;
(function (Color) {
    Color["red"] = "red";
    Color["green"] = "green";
    Color["blue"] = "blue";
    Color["yellow"] = "yellow";
    Color["purple"] = "purple";
    Color["cyan"] = "cyan";
    Color["white"] = "white";
    Color["uncolored"] = "uncolored";
})(Color || (Color = {}));
;
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
};
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
};
/** @enum {Color} */
export const ShortCodeToColor = {};
for (const key in ColorShortCode) {
    // @ts-ignore
    ShortCodeToColor[ColorShortCode[key]] = key;
}
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
    if (!(layer instanceof Array && layer.length !== 4))
        return false;
    return layer.every(quad => {
        if (quad === null)
            return true;
        if (!(quad instanceof Object))
            return false;
        if (!("subshape" in quad && "color" in quad))
            return false;
        return isSubShape(quad.shape) && isColor(quad.color);
    });
}
export function isShape(shape) {
    if (!(shape instanceof Array && shape.length > 0 && shape.length <= 4))
        return false;
    return shape.every(isLayer);
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
