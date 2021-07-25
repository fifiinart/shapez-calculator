import { Color } from "../Color";
import { Shape } from "../Shape";
import { createOperation, OperationInvalidIngredientError } from "./operation";

// adapted from shapez.io::js/game/shape_definition::586
function cloneAndPaintWith(shape: Shape, color: Color) {
  if (color === Color.uncolored) throw new OperationInvalidIngredientError("A shape cannot be painted uncolored")
  const cloned = shape.clone().descriptor

  for (let layerIndex = 0; layerIndex < cloned.length; ++layerIndex) {
    const quadrants = cloned[layerIndex];
    for (let quadrantIndex = 0; quadrantIndex < 4; ++quadrantIndex) {
      const item = quadrants[quadrantIndex];
      if (item) {
        item.color = color;
      }
    }
  }

  return new Shape(cloned);
}

// adapted from shapez.io::js/game/shape_definition::601/
function cloneAndPaintWith4Colors(shape: Shape, colors: [Color | null, Color | null, Color | null, Color | null]) {
  if (colors.some(c => c === Color.uncolored)) throw new OperationInvalidIngredientError("A shape cannot be painted uncolored")
  const newLayers = shape.clone().descriptor

  for (let layerIndex = 0; layerIndex < newLayers.length; ++layerIndex) {
    const quadrants = newLayers[layerIndex];
    for (let quadrantIndex = 0; quadrantIndex < 4; ++quadrantIndex) {
      const item = quadrants[quadrantIndex];
      const color = colors[quadrantIndex]
      if (item && color) {
        item.color = color;
      }
    }
  }
  return new Shape(newLayers)
}

export const Paint = createOperation<[Shape, Color], Shape>({
  name: 'Paint',
  ingredients: ['shape', 'color'],
  result: 'shape',
  operate: (ingredients) => cloneAndPaintWith(...ingredients)
})

export const QuadPaint = createOperation<[Shape, [Color, Color, Color, Color], [boolean, boolean, boolean, boolean]], Shape>({
  name: 'QuadPaint',
  ingredients: ['shape', ['color', 'color', 'color', 'color'], ['boolean', 'boolean', 'boolean', 'boolean']],
  result: 'shape',
  operate: ([shape, colors, bools]) => {
    if (!(bools.some(b => !!b))) throw new OperationInvalidIngredientError("At least one wire must be activated")

    const activatedColors = colors.map((v, i) => bools[i] ? v : null) as [Color | null, Color | null, Color | null, Color | null]
    return cloneAndPaintWith4Colors(shape, activatedColors)
  }
})

export const DoublePaint = createOperation<[[Shape, Shape], Color], [Shape, Shape]>({
  name: 'DoublePaint',
  ingredients: [['shape', 'shape'], 'color'],
  result: ['shape', 'shape'],
  operate: ([shapes, color]) => shapes.map(shape => cloneAndPaintWith(shape, color)) as [Shape, Shape]
})
