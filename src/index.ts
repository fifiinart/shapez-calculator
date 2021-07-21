import { fromShortKey, ShortKeyConversionError } from "./fromShortKey.js";
import { renderShape } from "./renderShape.js";
import { Paint } from './operations/Paint.js'
import { getGameObjectType, shapeDescriptorToShortKey } from "./util.js";
const textInput = document.getElementById("code") as HTMLInputElement;

const errorMessage = document.getElementById("error") as HTMLParagraphElement;

const canvas = document.getElementById("result") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const updateResult = () => {
  try {
    renderShape.call(ctx, fromShortKey(textInput.value));
    errorMessage.textContent = "Shape generated";
    errorMessage.classList.remove("hasError");
  } catch (err) {
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
  Paint, fromShortKey, shapeDescriptorToShortKey,
  getGameObjectType
}

Object.assign(window, globalDebugFns)