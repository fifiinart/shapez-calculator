import { GameObject, getGameObjectType, isColor, isShape, Shape, TypeFromGameObject } from "../util.js";

type OperationIngredient = GameObject | GameObject[]
type OperationIngredientType<T> = T extends GameObject ? TypeFromGameObject<T> : T extends any[] ? { [K in keyof T]: OperationIngredientType<T[K]> } : never
type OperationIngredientTypeList<T> = T extends OperationIngredient[] ? { [K in keyof T]: OperationIngredientType<T[K]> } : never

export interface OperationDescriptor<I extends OperationIngredient[], R extends GameObject> {
  name: string;
  ingredients: OperationIngredientTypeList<I>;
  result: TypeFromGameObject<R>;
  operate(ingredients: I): R
}

export class OperationIngredientTypeMismatchError extends Error { }
export class OperationInvalidIngredientError extends Error { }

export function createOperation<I extends OperationIngredient[], R extends GameObject = Shape>(config: OperationDescriptor<I, R>) {
  const op = function (ingredients: I) {
    // validate ingredients
    validateIngredientTypes<I>(ingredients, config.ingredients);
    try {
      var result = config.operate(ingredients)
    } catch (e) {
      if (e instanceof OperationInvalidIngredientError) {
        e.message = config.name + ": " + e.message;
      }
      throw e;
    }
    return result;
  }
  return op;
}

function validateIngredientTypes<I extends OperationIngredient[]>(ingredients: I, types: OperationIngredientTypeList<I>): void {
  if (ingredients.length !== types.length)
    throw new OperationIngredientTypeMismatchError(`Ingredient array length (${ingredients.length}) not equal to expected length (${types.length})`);
  ingredients.forEach((ingredient, i) => {
    const ingredientType = types[i];
    if (ingredientType instanceof Array) {
      if (isShape(ingredient)) throw new OperationIngredientTypeMismatchError(`Expected game object array, got shape in ingredient ${i + 1}`)
      if (!(ingredient instanceof Array)) throw new OperationIngredientTypeMismatchError(`Expected array, got ${getGameObjectType(ingredient)} in ingredient ${i + 1}`)
      if (ingredient.length !== ingredientType.length) throw new OperationIngredientTypeMismatchError(`Ingredient array length (${ingredients.length}) in ingredient ${i + 1} not equal to expected length (${types.length})`);
      try {
        validateIngredientTypes(ingredient, ingredientType)
      } catch (e) {
        if (e instanceof OperationIngredientTypeMismatchError) {
          e.message = e.message.replace(/ingredient/g, "index") + ` in index ${i + 1}`
        }
        throw e;
      }
    } else if (getGameObjectType(ingredient) !== ingredientType) throw new OperationIngredientTypeMismatchError(`Expected ${ingredientType}, got ${getGameObjectType(ingredient)} in ingredient ${i + 1}`)
  })
}
