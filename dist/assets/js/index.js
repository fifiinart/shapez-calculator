import { renderShape } from "./renderShape.js";
import { Paint } from './operations/Paint.js';
import { getGameObjectType, shapeDescriptorToShortKey } from "./util.js";
import { Shape, ShortKeyConversionError } from "./Shape.js";
const textInput = document.getElementById("code");
const errorMessage = document.getElementById("error");
const canvas = document.getElementById("result");
const ctx = canvas.getContext("2d");
const updateResult = () => {
    try {
        renderShape.call(ctx, new Shape(textInput.value));
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
const globalDebugFns = {
    Paint, Shape, shapeDescriptorToShortKey,
    getGameObjectType
};
Object.assign(window, globalDebugFns);
