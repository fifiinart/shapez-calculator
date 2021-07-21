import { Shape } from "./Shape.js";
interface RenderShapeOptions {
    backgroundColor: string;
    w: number;
    h: number;
    shadowColor: string | false | null;
    outlineColor: string | false | null;
}
export declare function renderShape(this: CanvasRenderingContext2D, shape: Shape, options?: Partial<RenderShapeOptions>): void;
export {};
