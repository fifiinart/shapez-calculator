import { Layer } from "./util.js";
interface RenderShapeOptions {
    backgroundColor: string;
    w: number;
    h: number;
    shadowColor: string | false | null;
    outlineColor: string | false | null;
}
export declare function createShapeRendering(key: string, options?: Partial<RenderShapeOptions>): HTMLCanvasElement;
export declare function renderShape(this: CanvasRenderingContext2D, layers: Layer[], options?: Partial<RenderShapeOptions>): void;
export {};
