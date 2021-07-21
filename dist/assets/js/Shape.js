var _a;
import { ShortCodeToColor } from "./Color";
import { layerRegex } from "./util";
export const maxLayer = 4;
/** @enum {string} */
export var SubShape;
(function (SubShape) {
    SubShape["rect"] = "rect";
    SubShape["circle"] = "circle";
    SubShape["star"] = "star";
    SubShape["windmill"] = "windmill";
})(SubShape || (SubShape = {}));
;
/** @enum {string} */
export const SubShapeShortCode = {
    [SubShape.rect]: "R",
    [SubShape.circle]: "C",
    [SubShape.star]: "S",
    [SubShape.windmill]: "W",
};
/** @enum {SubShape} */
export const ShortCodeToSubShape = {};
for (const key in SubShapeShortCode) {
    // @ts-ignore
    ShortCodeToSubShape[SubShapeShortCode[key]] = key;
}
export class ShortKeyConversionError extends Error {
}
export class Shape {
    constructor(descriptorOrKey) {
        this[_a] = function* () {
            yield* this.descriptor[Symbol.iterator]();
        }.bind(this);
        if (descriptorOrKey instanceof Array)
            this._descriptor = descriptorOrKey;
        else
            this._descriptor = this.fromShortKey(descriptorOrKey);
    }
    get descriptor() { return this._descriptor; }
    clone() {
        const shape = this.descriptor;
        return new Shape(shape.map(layer => {
            const mapped = layer.map(quad => {
                if (quad === null)
                    return null;
                else
                    return Object.assign({}, quad);
            });
            if (mapped.length !== 4)
                throw new Error("Unexpected error in cloneShape: layer does not have 4 quads");
            return mapped;
        }));
    }
    fromShortKey(key) {
        const sourceLayers = key.split(":");
        if (sourceLayers.length > maxLayer) {
            throw new Error("Only " + maxLayer + " layers allowed");
        }
        let layers = [];
        for (let i = 0; i < sourceLayers.length; ++i) {
            const text = sourceLayers[i];
            if (text.length !== 8) {
                throw new ShortKeyConversionError("Invalid layer: '" + text + "' -> must be 8 characters");
            }
            if (text === "--".repeat(4)) {
                throw new ShortKeyConversionError("Empty layers are not allowed");
            }
            if (!layerRegex.test(text)) {
                throw new ShortKeyConversionError("Invalid syntax in layer " + (i + 1));
            }
            const quads = [null, null, null, null];
            for (let quad = 0; quad < 4; ++quad) {
                const shapeText = text[quad * 2 + 0];
                const subShape = ShortCodeToSubShape[shapeText];
                const color = ShortCodeToColor[text[quad * 2 + 1]];
                if (subShape) {
                    if (!color) {
                        throw new ShortKeyConversionError("Invalid shape color key: " + key);
                    }
                    quads[quad] = {
                        subShape,
                        color,
                    };
                }
                else if (shapeText !== "-") {
                    throw new ShortKeyConversionError("Invalid shape key: " + shapeText);
                }
            }
            layers.push(quads);
        }
        return layers;
    }
}
_a = Symbol.iterator;
