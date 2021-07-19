import { fromShortKey, ShortKeyConversionError } from "./fromShortKey.js";
import { MixColors } from "./operations/MixColors.js";
import { renderShape } from "./renderShape.js";
import { Color } from "./util.js";
const textInput = document.getElementById("code");
const errorMessage = document.getElementById("error");
const canvas = document.getElementById("result");
const ctx = canvas.getContext("2d");
const updateResult = () => {
    try {
        renderShape.call(ctx, fromShortKey(textInput.value));
        errorMessage.textContent = "Shape generated";
        errorMessage.classList.remove("hasError");
    }
    catch (err) {
        if (err instanceof ShortKeyConversionError) {
            errorMessage.textContent = "Error: " + err.message;
            errorMessage.classList.add("hasError");
        }
        else if (err instanceof Error)
            throw err;
    }
};
updateResult();
textInput.onchange = updateResult;
console.log(MixColors([Color.red, Color.cyan]));
