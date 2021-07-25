import { ColorHexCodes } from './Color'
import { Shape, SubShape } from './Shape'

interface Vector {
  x: number, y: number
}

const arrayQuadrantIndexToOffset: Vector[] = [
  { x: 1, y: -1 }, // tr
  { x: 1, y: 1 }, // br
  { x: -1, y: 1 }, // bl
  { x: -1, y: -1 } // tl
]

function beginCircle(this: CanvasRenderingContext2D, x: number, y: number, r: number): void {
  if (r < 0.05) {
    this.beginPath()
    this.rect(x, y, 1, 1)
    return
  }
  this.beginPath()
  this.arc(x, y, r, 0, 2.0 * Math.PI)
}

function radians(degrees: number): number {
  return (degrees * Math.PI) / 180.0
}

export interface RenderShapeOptions {
  backgroundColor: string;
  w: number;
  h: number;
  shadowColor: string | false | null;
  outlineColor: string | false | null;
}

const renderShapeDefaults: RenderShapeOptions = {
  backgroundColor: '#fff',
  w: 512,
  h: 512,
  shadowColor: 'rgba(40, 50, 65, 0.1)',
  outlineColor: '#555'
}

export default function renderShape(this: CanvasRenderingContext2D, shape: Shape, options: Partial<RenderShapeOptions> = {}) {
  const layers = shape.descriptor

  const opts: RenderShapeOptions = Object.assign(renderShapeDefaults, options)

  this.save()

  const { w, h, shadowColor } = opts
  this.canvas!.width = w
  this.canvas!.height = h

  this.fillStyle = opts.backgroundColor

  const dpi = 1

  this.fillRect(0, 0, w, h)

  this.translate((w * dpi) / 2, (h * dpi) / 2)
  this.scale((dpi * w) / 28, (dpi * h) / 28)

  const quadrantSize = 10
  const quadrantHalfSize = quadrantSize / 2

  if (shadowColor) {
    this.fillStyle = shadowColor
    beginCircle.call(this, 0, 0, quadrantSize * 1.15)
    this.fill()
  }

  for (let layerIndex = 0; layerIndex < layers.length; ++layerIndex) {
    const quadrants = layers[layerIndex]

    const layerScale = Math.max(0.1, 0.9 - layerIndex * 0.22)

    for (let quadrantIndex = 0; quadrantIndex < 4; ++quadrantIndex) {
      if (!quadrants[quadrantIndex]) {
        continue
      }
      const { subShape, color } = quadrants[quadrantIndex]!

      const quadrantPos = arrayQuadrantIndexToOffset[quadrantIndex]
      const centerQuadrantX = quadrantPos.x * quadrantHalfSize
      const centerQuadrantY = quadrantPos.y * quadrantHalfSize

      const rotation = radians(quadrantIndex * 90)

      this.translate(centerQuadrantX, centerQuadrantY)
      this.rotate(rotation)

      this.fillStyle = ColorHexCodes[color]
      this.strokeStyle = opts.outlineColor || 'rgba(0, 0, 0, 0)'
      this.lineWidth = 1

      const insetPadding = 0.0

      switch (subShape) {
        case SubShape.rect: {
          this.beginPath()
          const dims = quadrantSize * layerScale
          this.rect(
            insetPadding + -quadrantHalfSize,
            -insetPadding + quadrantHalfSize - dims,
            dims,
            dims
          )

          break
        }
        case SubShape.star: {
          this.beginPath()
          const dims = quadrantSize * layerScale

          const originX = insetPadding - quadrantHalfSize
          const originY = -insetPadding + quadrantHalfSize - dims

          const moveInwards = dims * 0.4
          this.moveTo(originX, originY + moveInwards)
          this.lineTo(originX + dims, originY)
          this.lineTo(originX + dims - moveInwards, originY + dims)
          this.lineTo(originX, originY + dims)
          this.closePath()
          break
        }

        case SubShape.windmill: {
          this.beginPath()
          const dims = quadrantSize * layerScale

          const originX = insetPadding - quadrantHalfSize
          const originY = -insetPadding + quadrantHalfSize - dims
          const moveInwards = dims * 0.4
          this.moveTo(originX, originY + moveInwards)
          this.lineTo(originX + dims, originY)
          this.lineTo(originX + dims, originY + dims)
          this.lineTo(originX, originY + dims)
          this.closePath()
          break
        }

        case SubShape.circle: {
          this.beginPath()
          this.moveTo(
            insetPadding + -quadrantHalfSize,
            -insetPadding + quadrantHalfSize
          )
          this.arc(
            insetPadding + -quadrantHalfSize,
            -insetPadding + quadrantHalfSize,
            quadrantSize * layerScale,
            -Math.PI * 0.5,
            0
          )
          this.closePath()
          break
        }

        default: {
          throw new Error('Unkown sub shape: ' + subShape)
        }
      }

      this.fill()
      this.stroke()

      this.rotate(-rotation)
      this.translate(-centerQuadrantX, -centerQuadrantY)
    }
  }

  this.restore()
}
