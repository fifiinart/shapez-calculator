/** @enum {string} */
export declare enum Color {
    red = "red",
    green = "green",
    blue = "blue",
    yellow = "yellow",
    purple = "purple",
    cyan = "cyan",
    white = "white",
    uncolored = "uncolored"
}
/** @enum {string} */
export declare const ColorShortCode: {
    readonly red: "r";
    readonly green: "g";
    readonly blue: "b";
    readonly yellow: "y";
    readonly purple: "p";
    readonly cyan: "c";
    readonly white: "w";
    readonly uncolored: "u";
};
declare type ColorShortCode = typeof ColorShortCode;
/** @enum {string} */
export declare const ColorHexCodes: {
    readonly red: "#ff666a";
    readonly green: "#78ff66";
    readonly blue: "#66a7ff";
    readonly yellow: "#fcf52a";
    readonly purple: "#dd66ff";
    readonly cyan: "#87fff5";
    readonly white: "#ffffff";
    readonly uncolored: "#aaaaaa";
};
declare type ShortCodeToColor = {
    [K in keyof ColorShortCode as ColorShortCode[K]]: K;
};
export declare type ColorShortCodeUnion = keyof ShortCodeToColor;
/** @enum {Color} */
export declare const ShortCodeToColor: ShortCodeToColor;
export {};
