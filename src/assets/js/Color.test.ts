import { Color, ColorShortCode, ShortCodeToColor } from './Color'

it('Maps color strings to properties on the Color enum', () => {
  expect(Color.red).toEqual('red')
  expect(Color.green).toEqual('green')
  expect(Color.blue).toEqual('blue')
  expect(Color.yellow).toEqual('yellow')
  expect(Color.purple).toEqual('purple')
  expect(Color.cyan).toEqual('cyan')
  expect(Color.white).toEqual('white')
  expect(Color.uncolored).toEqual('uncolored')
})

it('Maps to actual color strings', () => {
  for (const color of Object.values(Color)) {
    expect(typeof color).toBe('string')
  }
})

it('Makes ColorShortCode and ShortCodeToColor reversible', () => {
  for (const color of Object.values(Color)) {
    expect(ShortCodeToColor[ColorShortCode[color]]).toBe(color)
  }
})