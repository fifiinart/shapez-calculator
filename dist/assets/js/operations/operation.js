import { getGameObjectType } from "../util.js";
export class OperationIngredientTypeMismatchError extends Error {
}
export class OperationInvalidIngredientError extends Error {
}
export function createOperation(config) {
    const op = function (ingredients) {
        // validate ingredients
        validateIngredientTypes(ingredients, config.ingredients);
        try {
            let result = config.operate(ingredients);
            return {
                name: config.name,
                ingredients,
                isError: false,
                result
            };
        }
        catch (e) {
            if (e instanceof OperationInvalidIngredientError) {
                return {
                    name: config.name,
                    ingredients,
                    isError: true,
                    error: e.message
                };
            }
            else
                throw e;
        }
    };
    return op;
}
function validateIngredientTypes(ingredients, types) {
    if (ingredients.length !== types.length)
        throw new OperationIngredientTypeMismatchError(`Ingredient array length (${ingredients.length}) not equal to expected length (${types.length})`);
    ingredients.forEach((ingredient, i) => {
        const ingredientType = types[i];
        if (ingredientType instanceof Array) {
            if (!(ingredient instanceof Array))
                throw new OperationIngredientTypeMismatchError(`Expected array, got '${ingredient}' in ingredient ${i + 1}`);
            if (ingredient.length !== ingredientType.length)
                throw new OperationIngredientTypeMismatchError(`Ingredient array length (${ingredients.length}) in ingredient ${i + 1} not equal to expected length (${types.length})`);
            try {
                validateIngredientTypes(ingredient, ingredientType);
            }
            catch (e) {
                if (e instanceof OperationIngredientTypeMismatchError) {
                    e.message = e.message.replace(/ingredient/g, "index") + ` in index ${i + 1}`;
                }
                throw e;
            }
        }
        else if (getGameObjectType(ingredient) !== ingredientType)
            throw new OperationIngredientTypeMismatchError(`Expected ${ingredientType}, got '${ingredient}' in ingredient ${i + 1}`);
    });
}
