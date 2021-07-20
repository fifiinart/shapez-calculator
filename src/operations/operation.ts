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

export interface OperationSuccess<I extends OperationIngredient[], R extends GameObject> {
  name: string;
  ingredients: I;
  isError: false;
  result: R;
}

export interface OperationError<I extends OperationIngredient[]> {
  name: string;
  ingredients: I;
  isError: true;
  error: string;
}

export type OperationResult<I extends OperationIngredient[], R extends GameObject> = OperationSuccess<I, R> | OperationError<I>

export class OperationIngredientTypeMismatchError extends Error { }
export class OperationInvalidIngredientError extends Error { }

export function createOperation<I extends OperationIngredient[], R extends GameObject = Shape>(config: OperationDescriptor<I, R>) {
  const op = function (ingredients: I): OperationResult<I, R> {
    // validate ingredients
    validateIngredientTypes<I>(ingredients, config.ingredients);
    try {
      let result = config.operate(ingredients);
      return {
        name: config.name,
        ingredients,
        isError: false,
        result
      };
    } catch (e) {
      if (e instanceof OperationInvalidIngredientError) {
        return {
          name: config.name,
          ingredients,
          isError: true,
          error: e.message
        }
      } else throw e;
    }

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
      if (!(ingredient instanceof Array)) throw new OperationIngredientTypeMismatchError(`Expected array, got '${ingredient}' in ingredient ${i + 1}`)
      if (ingredient.length !== ingredientType.length) throw new OperationIngredientTypeMismatchError(`Ingredient array length (${ingredients.length}) in ingredient ${i + 1} not equal to expected length (${types.length})`);
      try {
        validateIngredientTypes(ingredient, ingredientType)
      } catch (e) {
        if (e instanceof OperationIngredientTypeMismatchError) {
          e.message = e.message.replace(/ingredient/g, "index") + ` in index ${i + 1}`
        }
        throw e;
      }
    } else if (getGameObjectType(ingredient) !== ingredientType) throw new OperationIngredientTypeMismatchError(`Expected ${ingredientType}, got '${ingredient}' in ingredient ${i + 1}`)
  })
}
