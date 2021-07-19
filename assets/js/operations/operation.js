import { getGameObjectType, isShape } from "../util.js";
export class OperationIngredientTypeMismatchError extends Error {
}
export class OperationInvalidIngredientError extends Error {
}
export function createOperation(config) {
    const op = function (ingredients) {
        // validate ingredients
        validateIngredientTypes(ingredients, config.ingredients);
        try {
            var result = config.operate(ingredients);
        }
        catch (e) {
            if (e instanceof OperationInvalidIngredientError) {
                e.message = config.name + ": " + e.message;
            }
            throw e;
        }
        return result;
    };
    return op;
}
function validateIngredientTypes(ingredients, types) {
    if (ingredients.length !== types.length)
        throw new OperationIngredientTypeMismatchError(`Ingredient array length (${ingredients.length}) not equal to expected length (${types.length})`);
    ingredients.forEach((ingredient, i) => {
        const ingredientType = types[i];
        if (ingredientType instanceof Array) {
            if (isShape(ingredient))
                throw new OperationIngredientTypeMismatchError(`Expected game object array, got shape in ingredient ${i + 1}`);
            if (!(ingredient instanceof Array))
                throw new OperationIngredientTypeMismatchError(`Expected array, got ${getGameObjectType(ingredient)} in ingredient ${i + 1}`);
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
            throw new OperationIngredientTypeMismatchError(`Expected ${ingredientType}, got ${getGameObjectType(ingredient)} in ingredient ${i + 1}`);
    });
}
