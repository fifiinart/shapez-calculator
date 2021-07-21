import { cloneShape, Color, Shape } from "../util.js";
import { createOperation } from "./operation.js";

// copied from shapez.io::js/game/shape_definition::586
function cloneAndPaintWith(shape: Shape, color: Color) {
  const cloned = cloneShape(shape)

  for (let layerIndex = 0; layerIndex < cloned.length; ++layerIndex) {
    const quadrants = cloned[layerIndex];
    for (let quadrantIndex = 0; quadrantIndex < 4; ++quadrantIndex) {
      const item = quadrants[quadrantIndex];
      if (item) {
        item.color = color;
      }
    }
  }

  return cloned;
}

// copied from shapez.io::js/game/shape_definition::601/
function cloneAndPaintWith4Colors(shape: Shape, colors: [Color | null, Color | null, Color | null, Color | null]) {
  const newLayers = cloneShape(shape)

  for (let layerIndex = 0; layerIndex < newLayers.length; ++layerIndex) {
    const quadrants = newLayers[layerIndex];
    for (let quadrantIndex = 0; quadrantIndex < 4; ++quadrantIndex) {
      const item = quadrants[quadrantIndex];
      if (item) {
        item.color = colors[quadrantIndex] || item.color;
      }
    }
  }
  return newLayers
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
  operate: ([shape, colors, bools]) => cloneAndPaintWith4Colors(shape, colors.map((c, i) => bools[i]! ? c : null) as [Color | null, Color | null, Color | null, Color | null])
})

export const DoublePaint = createOperation<[[Shape, Shape], Color], [Shape, Shape]>({
  name: 'DoublePaint',
  ingredients: [['shape', 'shape'], 'color'],
  result: ['shape', 'shape'],
  operate: ([shapes, color]) => shapes.map(shape => cloneAndPaintWith(shape, color)) as [Shape, Shape]
})
