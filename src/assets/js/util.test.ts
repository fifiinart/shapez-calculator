import { Color } from './Color'
import { SubShape } from './Shape'
import { isColor, isSubShape } from './util'

describe("Filter functions", () => {
  describe("isSubShape", () => {
    it("Lets all subshapes pass through", () => {
      for (const subshape of Object.values(SubShape)) {
        expect(isSubShape(subshape)).toBe(true)
      }
    })
    it("Does not let colors pass through", () => {
      for (const color of Object.values(Color)) {
        expect(isSubShape(color)).toBe(false)
      }
    })
  })
  describe("isColor", () => {
    it("Lets all colors pass through", () => {
      for (const color of Object.values(Color)) {
        expect(isColor(color)).toBe(true)
      }
    })
    it("Does not let subshapes pass through", () => {
      for (const subshape of Object.values(SubShape)) {
        expect(isColor(subshape)).toBe(false)
      }
    })
  })
})