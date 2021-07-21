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

export type ColorShortCodeUnion = keyof ShortCodeToColor;

/** @enum {Color} */
export const ShortCodeToColor = {} as ShortCodeToColor;
for (const key in ColorShortCode) {
  // @ts-ignore
  ShortCodeToColor[ColorShortCode[key]] = key;
}