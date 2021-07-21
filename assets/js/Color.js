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
