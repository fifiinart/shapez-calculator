import 'jest-extended'
import { Color } from './Color'
import { Shape, SubShape } from './Shape'
import { GameObjectTypeDictionary, getGameObjectType, isColor, isLayer, isShapeDescriptor, isSubShape } from './util'

describe('Filter functions', () => {
  describe('isSubShape', () => {
    it('Lets all subshapes pass through', () => {
      for (const subshape of Object.values(SubShape)) {
        expect(subshape).toSatisfy(isSubShape)
      }
    })
    it('Does not let colors pass through', () => {
      for (const color of Object.values(Color)) {
        expect(color).not.toSatisfy(isSubShape)
      }
    })
  })
  describe('isColor', () => {
    it('Lets all colors pass through', () => {
      for (const color of Object.values(Color)) {
        expect(isColor(color)).toBe(true)
      }
    })
    it('Does not let subshapes pass through', () => {
      for (const subshape of Object.values(SubShape)) {
        expect(isColor(subshape)).toBe(false)
      }
    })
  })
  describe('isLayer', () => {
    it('Does not let non-arrays pass through', () => {
      const valuesToFail: any[] = [
        ['string', 123, false, null, undefined, Symbol.iterator, () => null, { abc: 123 }, Color.red]
      ]
      expect(valuesToFail).not.toSatisfyAll(isLayer)
    })

    it('Does not let arrays of length !== 4 pass through', () => {
      const valuesToFail: any[] = [
        [], [1], [1, 2], [1, 2, 3], [1, 2, 3, 4, 5]
      ]
      expect(valuesToFail).not.toSatisfyAll(isLayer)
    })

    it('Does not allow an array of null to pass through', () => {
      expect([null, null, null, null]).not.toSatisfy(isLayer)
    })

    it('Does not allow a layer of partial quads to pass through', () => {
      const valuesToFail: any[] = [
        [null, null, null, { color: Color.red }],
        [null, null, null, { subShape: SubShape.rect }],
        [{ color: Color.red }, null, null, { subShape: SubShape.circle, color: Color.blue }]
      ]

      expect(valuesToFail).not.toSatisfyAll(isLayer)
    })

    it('Does allow actual layers to pass through', () => {
      expect([
        [null, null, null, { color: Color.red, subShape: SubShape.rect }],
        [{ color: Color.red, subShape: SubShape.circle }, null, { color: Color.red, subShape: SubShape.circle }, null]
      ]).toSatisfyAll(isLayer)
    })
  })
  describe('isShapeDescriptor', () => {
    it('should not accept non length 1-4 arrays', () => {
      const valuesToFail: any[] = [
        [],
        [null, null, null, null, null],
        [null, null, null, null, null, null]
      ]

      expect(valuesToFail).not.toSatisfyAll(isShapeDescriptor)
    })

    it('should not accept arrays of non-layers', () => {
      const valuesToFail: any[] = [
        [null],
        [Color.red],
        [Color.white],
        [[null, null, null, null]]
      ]

      expect(valuesToFail).not.toSatisfyAll(isShapeDescriptor)
    })
  })

  describe('getGameObjectType', () => {
    const expectGameObjectTypeOf = (tests: [any, boolean][], type: (keyof GameObjectTypeDictionary | null)) => {
      for (const [value, isShape] of tests) {
        const expectation = expect(getGameObjectType(value))
        if (isShape) {
          expectation.toBe(type)
        } else {
          expectation.not.toBe(type)
        }
      }
    }
    it('should recognize shapes', () => {
      // [value, value is shape][]
      const tests: [any, boolean][] = [
        [Shape.fromShortKey('CuCuCuCu'), true],
        [Shape.fromShortKey('CuCuCuRu'), true],
        [Color.red, false],
        [123, false],
        [new Shape(
          [[null, null, null, { color: Color.red, subShape: SubShape.rect }]]
        ), true]
      ]

      expectGameObjectTypeOf(tests, 'shape')
    })

    it('should recognize colors', () => {
      const tests: [any, boolean][] = [
        [Shape.fromShortKey('CuCuCuCu'), false],
        [Color.uncolored, true],
        // @ts-ignore
        [Color.prototype, false],
        [Color.red, true],
        [123, false],
        [new Shape(
          [[null, null, null, { color: Color.red, subShape: SubShape.rect }]]
        ), false]
      ]

      expectGameObjectTypeOf(tests, 'color')
    })

    it('should recognize booleans', () => {
      const tests: [any, boolean][] = [
        [Shape.fromShortKey('CuCuCuCu'), false],
        [Shape.fromShortKey('CuCuCuRu'), false],
        [Color.red, false],
        [123, false],
        [false, true],
        [true, true],
        [new Shape(
          [[null, null, null, { color: Color.red, subShape: SubShape.rect }]]
        ), false]
      ]

      expectGameObjectTypeOf(tests, 'boolean')
    })

    it('should output null otherwise', () => {
      const tests: [any, boolean][] = [
        [Shape.fromShortKey('CuCuCuCu'), false],
        [Shape.fromShortKey('CuCuCuRu'), false],
        [Color.red, false],
        [123, true],
        [null, true],
        ['abcdefg', true],
        [new Shape(
          [[null, null, null, { color: Color.red, subShape: SubShape.rect }]]
        ), false]
      ]

      expectGameObjectTypeOf(tests, null)
    })
  })
})
