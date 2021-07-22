import { beginCircle, arrayQuadrantIndexToOffset, radians } from "./util";
import { ColorHexCodes } from "./Color";
import { Shape, SubShape } from "./Shape";

interface RenderShapeOptions {
  backgroundColor: string;
  w: number;
  h: number;
  shadowColor: string | false | null;
  outlineColor: string | false | null;
}

const renderShapeDefaults: RenderShapeOptions = {
  backgroundColor: "#fff",
  w: 512,
  h: 512,
  shadowColor: "rgba(40, 50, 65, 0.1)",
  outlineColor: "#555",
}

export function renderShape(this: CanvasRenderingContext2D, shape: Shape, options: Partial<RenderShapeOptions> = {}) {

  const layers = shape.descriptor

  const opts: RenderShapeOptions = Object.assign(renderShapeDefaults, options)

  this.save();

  const { w, h, shadowColor } = opts;
  this.canvas!.width = w;
  this.canvas!.height = h;

  this.fillStyle = opts.backgroundColor;


  const dpi = 1;

  this.fillRect(0, 0, w, h);

  this.translate((w * dpi) / 2, (h * dpi) / 2);
  this.scale((dpi * w) / 28, (dpi * h) / 28);

  const quadrantSize = 10;
  const quadrantHalfSize = quadrantSize / 2;

  if (shadowColor) {
    this.fillStyle = shadowColor;
    beginCircle.call(this, 0, 0, quadrantSize * 1.15);
    this.fill();
  }

  for (let layerIndex = 0; layerIndex < layers.length; ++layerIndex) {
    const quadrants = layers[layerIndex];

    const layerScale = Math.max(0.1, 0.9 - layerIndex * 0.22);

    for (let quadrantIndex = 0; quadrantIndex < 4; ++quadrantIndex) {
      if (!quadrants[quadrantIndex]) {
        continue;
      }
      const { subShape, color } = quadrants[quadrantIndex]!;

      const quadrantPos = arrayQuadrantIndexToOffset[quadrantIndex];
      const centerQuadrantX = quadrantPos.x * quadrantHalfSize;
      const centerQuadrantY = quadrantPos.y * quadrantHalfSize;

      const rotation = radians(quadrantIndex * 90);

      this.translate(centerQuadrantX, centerQuadrantY);
      this.rotate(rotation);

      this.fillStyle = ColorHexCodes[color];
      this.strokeStyle = opts.outlineColor || "rgba(0, 0, 0, 0)";
      this.lineWidth = 1;

      const insetPadding = 0.0;

      switch (subShape) {
        case SubShape.rect: {
          this.beginPath();
          const dims = quadrantSize * layerScale;
          this.rect(
            insetPadding + -quadrantHalfSize,
            -insetPadding + quadrantHalfSize - dims,
            dims,
            dims
          );

          break;
        }
        case SubShape.star: {
          this.beginPath();
          const dims = quadrantSize * layerScale;

          let originX = insetPadding - quadrantHalfSize;
          let originY = -insetPadding + quadrantHalfSize - dims;

          const moveInwards = dims * 0.4;
          this.moveTo(originX, originY + moveInwards);
          this.lineTo(originX + dims, originY);
          this.lineTo(originX + dims - moveInwards, originY + dims);
          this.lineTo(originX, originY + dims);
          this.closePath();
          break;
        }

        case SubShape.windmill: {
          this.beginPath();
          const dims = quadrantSize * layerScale;

          let originX = insetPadding - quadrantHalfSize;
          let originY = -insetPadding + quadrantHalfSize - dims;
          const moveInwards = dims * 0.4;
          this.moveTo(originX, originY + moveInwards);
          this.lineTo(originX + dims, originY);
          this.lineTo(originX + dims, originY + dims);
          this.lineTo(originX, originY + dims);
          this.closePath();
          break;
        }

        case SubShape.circle: {
          this.beginPath();
          this.moveTo(
            insetPadding + -quadrantHalfSize,
            -insetPadding + quadrantHalfSize
          );
          this.arc(
            insetPadding + -quadrantHalfSize,
            -insetPadding + quadrantHalfSize,
            quadrantSize * layerScale,
            -Math.PI * 0.5,
            0
          );
          this.closePath();
          break;
        }

        default: {
          throw new Error("Unkown sub shape: " + subShape);
        }
      }

      this.fill();
      this.stroke();

      this.rotate(-rotation);
      this.translate(-centerQuadrantX, -centerQuadrantY);
    }
  }

  this.restore();
}
