import { renderShape } from "./renderShape";
import { Paint } from './operations/Paint'
import { getGameObjectType, shapeDescriptorToShortKey } from "./util";
import { Shape, ShortKeyConversionError } from "./Shape";
const textInput = document.getElementById("code") as HTMLInputElement;

const errorMessage = document.getElementById("error") as HTMLParagraphElement;

const canvas = document.getElementById("result") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const updateResult = () => {
  try {
    renderShape.call(ctx, new Shape(textInput.value));
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
  Paint, Shape, shapeDescriptorToShortKey,
  getGameObjectType
}

Object.assign(window, globalDebugFns)