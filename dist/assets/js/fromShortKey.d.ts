import { Layer } from "./util.js";
export declare class ShortKeyConversionError extends Error {
}
/**
 * Generates the definition from the given short key
 */
export declare function fromShortKey(key: string): Layer[];
