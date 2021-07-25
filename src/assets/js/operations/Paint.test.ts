import "jest-extended"
import { Color } from "../Color"
import { Shape } from "../Shape"
import { expectErrorToBe, expectResultingShapeToBe } from "./operation.test"
import { Paint } from './Paint'


describe('Paint', () => {
  describe('should paint the shapes as expected', () => {
    const expected: [string, Color, string][] = [
      ["CuCuCuCu", Color.red, "CrCrCrCr"],
      ["CuRrCrSu", Color.white, "CwRwCwSw"],
      ["CuRrCrSu:CwRwCwSw", Color.white, "CwRwCwSw:CwRwCwSw"],
      ["CuRrCrSu:CwRwCwSw:RuRuRuRu", Color.white, "CwRwCwSw:CwRwCwSw:RwRwRwRw"],
    ];

    for (const [shape, color, result] of expected) {
      it(`should paint ${shape} ${color} to get ${result}`, () => {
        const operationResult = Paint([Shape.fromShortKey(shape), color])
        expectResultingShapeToBe(operationResult, result)
      })
    }
  })

  describe("should error on receiving uncolored", () => {
    const keys: string[] = [
      "CuCuCuCu",
      "CuRrCuRu",
      "CcCcRcSc"
    ]

    for (const key of keys) {
      it(`should error on receiving uncolored with key ${key}`, () => {
        expectErrorToBe(Paint([Shape.fromShortKey(key), Color.uncolored]), "A shape cannot be painted uncolored")
      })
    }
  })
})