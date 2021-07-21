import { Color } from "../Color.js";
import { createOperation, OperationInvalidIngredientError } from "./operation.js";

const ColorMixingRecipes = new Map<[Color, Color], Color>(
  [
    [[Color.red, Color.green], Color.yellow],
    [[Color.red, Color.blue], Color.purple],
    [[Color.green, Color.blue], Color.cyan],

    [[Color.yellow, Color.blue], Color.white],
    [[Color.purple, Color.green], Color.white],
    [[Color.cyan, Color.red], Color.white]
  ]
);

export const MixColors = createOperation<[Color, Color], Color>({
  name: "MixColors",
  ingredients: ["color", "color"],
  result: "color",
  operate([color1, color2]): Color {
    if (color1 === Color.uncolored || color2 === Color.uncolored) throw new OperationInvalidIngredientError("Neither color can be uncolored in a MixColors operation");
    for (const [[ingredient1, ingredient2], result] of ColorMixingRecipes) {
      if ((ingredient1 === color1 && ingredient2 === color2) || (ingredient1 === color2 && ingredient2 === color1)) return result;
    }
    throw new OperationInvalidIngredientError(`Invalid ingredients: ${color1} and ${color2}`)
  }
})