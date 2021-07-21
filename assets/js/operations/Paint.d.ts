import { Color } from "../Color.js";
import { Shape } from "../Shape.js";
export declare const Paint: import("./operation.js").Operation<[Shape, Color], Shape>;
export declare const QuadPaint: import("./operation.js").Operation<[Shape, [Color, Color, Color, Color], [boolean, boolean, boolean, boolean]], Shape>;
export declare const DoublePaint: import("./operation.js").Operation<[[Shape, Shape], Color], [Shape, Shape]>;
