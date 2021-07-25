import 'jest-extended'
import { layerRegex, Shape } from "./Shape"

const shapes = [
  Shape.fromShortKey("CuCuCuCu"),
  Shape.fromShortKey("CuRuRuCu"),
  Shape.fromShortKey("CuCuRcRc"),
  Shape.fromShortKey("RcCcCuCu"),
  Shape.fromShortKey("RcCc--Cu"),
];
describe("Shape@@iterator", () => {
  it("should return the same values from its @@iterator as its descriptor", () => {
    for (const shape of shapes) {
      expect([...shape]).toEqual(shape.descriptor)
    }
  })
})

describe('Shape#clone()', () => {
  it('should clone the shape descriptor but not be the shape descriptor itself', () => {
    for (const shape of shapes) {
      const clone = shape.clone();
      // same contents but diff reference
      expect(clone.descriptor).toEqual(shape.descriptor);
      expect(clone.descriptor).not.toBe(shape.descriptor);
    }
  })
})

describe('Shape#toString() and Shape#toShortKey()', () => {
  const shapeToStrings = [
    "Shape(CuCuCuCu)",
    "Shape(CuRuRuCu)",
    "Shape(CuCuRcRc)",
    "Shape(RcCcCuCu)",
    "Shape(RcCc--Cu)",
  ]
  it('should return the right string representation of the shape', () => {
    const zipped = shapes.map((v, i) => [v, shapeToStrings[i]] as const)
    for (const [shape, string] of zipped) {
      expect(shape.toString()).toBe(string)
    }
  })
})

describe('Shape.toShortKey()', () => {
  it('should throw when the key has less than 1 and more than 4 segments', () => {
    const testCases: [string, number][] = [
      ["", 0],
      ["A:A:A:A:A", 5],
      ["B:B:B:B:B:B:B:B:B:B", 10]
    ];

    for (const [key, segments] of testCases) {
      expect(() => Shape.fromShortKey(key)).toThrow(`Expected 1-4 layers, recieved ${segments}`)
    }
  })
  it('should throw when the key layers are not 8 characters', () => {
    const testCases: string[] = [
      "AAAAA",
      "AAAAAAA",
      "AA",
      "A",
      "CuCuCuCu:A"
    ]

    for (const key of testCases) {
      expect(() => Shape.fromShortKey(key)).toThrow("must be 8 characters")
    }
  })

  it('should throw when a layer is empty', () => {
    const testCases: string[] = [
      "--------",
      "--------:CuCuCuCu",
      "CuCuCuCu:--------",
    ]

    for (const key of testCases) {
      expect(() => Shape.fromShortKey(key)).toThrow("Empty layers")
    }
  })
})
