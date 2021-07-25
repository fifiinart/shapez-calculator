import 'jest-extended'
import { Color } from '../Color'
import { MixColors } from './MixColors'
import { expectErrorToBe, expectResultToEqual } from './operation.test'

describe('should reject any color mixing that includes uncolored', () => {
  const tests: [Color, Color][] = [
    [Color.uncolored, Color.red],
    [Color.cyan, Color.uncolored],
    [Color.uncolored, Color.uncolored]
  ]

  for (const test of tests) {
    it(`should reject mixing '${test[0]}' and '${test[1]}'`, () => {
      expectErrorToBe(MixColors(test), 'Neither color can be uncolored in a MixColors operation')
    })
  }
})

describe('should reject any other unknown recipe', () => {
  const tests: [Color, Color][] = [
    [Color.cyan, Color.yellow],
    [Color.cyan, Color.blue],
    [Color.blue, Color.white],
    [Color.blue, Color.blue]
  ]

  for (const [c1, c2] of tests) {
    it(`should reject mixing '${test[0]}' and '${test[1]}'`, () => {
      expectErrorToBe(MixColors([c1, c2]), `Invalid ingredients: ${c1} and ${c2}`)
    })
  }
})

describe('should pass any known recipes', () => {
  const tests: [[Color, Color], Color][] = [
    [[Color.red, Color.green], Color.yellow],
    [[Color.red, Color.blue], Color.purple],
    [[Color.green, Color.blue], Color.cyan],

    [[Color.yellow, Color.blue], Color.white],
    [[Color.purple, Color.green], Color.white],
    [[Color.cyan, Color.red], Color.white]
  ]
  for (const [test, expectedRes] of tests) {
    it(`should pass mixing '${test[0]}' and '${test[1]}' to get '${expectedRes}'`, () => {
      expectResultToEqual(MixColors(test), expectedRes)
    })
  }
})
