// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"7tYYr":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "5d699102a4c1fcc2d107ce2dfa7ffa95";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"yv9yU":[function(require,module,exports) {
"use strict";
var _renderShape = _interopRequireDefault(require("./renderShape"));
var _Paint = require("./operations/Paint");
var _util = require("./util");
var _Shape = require("./Shape");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const textInput = document.getElementById('code');
const errorMessage = document.getElementById('error');
const canvas = document.getElementById('result');
const ctx = canvas.getContext('2d');
if (ctx == null) throw new Error('No context found for canvas');
const updateResult = () => {
  try {
    _renderShape.default.call(ctx, _Shape.Shape.fromShortKey(textInput.value));
    errorMessage.textContent = 'Shape generated';
    errorMessage.classList.remove('hasError');
  } catch (err) {
    if (err instanceof _Shape.ShortKeyConversionError) {
      errorMessage.textContent = 'Error: ' + err.message;
      errorMessage.classList.add('hasError');
    } else if (err instanceof Error) {
      throw err;
    }
  }
};
updateResult();
textInput.onchange = updateResult;
const globalDebugFns = {
  Paint: _Paint.Paint,
  Shape: _Shape.Shape,
  getGameObjectType: _util.getGameObjectType
};
Object.assign(window, globalDebugFns);

},{"./renderShape":"18Nbt","./operations/Paint":"7njmi","./util":"2cNuk","./Shape":"3eVfh"}],"18Nbt":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderShape;
var _Color = require("./Color");
var _Shape = require("./Shape");
const arrayQuadrantIndexToOffset = [{
  x: 1,
  y: -1
}, // tr
{
  x: 1,
  y: 1
}, // br
{
  x: -1,
  y: 1
}, // bl
{
  x: -1,
  y: -1
  // tl
}];
function beginCircle(x, y, r) {
  if (r < 0.05) {
    this.beginPath();
    this.rect(x, y, 1, 1);
    return;
  }
  this.beginPath();
  this.arc(x, y, r, 0, 2.0 * Math.PI);
}
function radians(degrees) {
  return degrees * Math.PI / 180.0;
}
const renderShapeDefaults = {
  backgroundColor: '#fff',
  w: 512,
  h: 512,
  shadowColor: 'rgba(40, 50, 65, 0.1)',
  outlineColor: '#555'
};
function renderShape(shape, options = {}) {
  const layers = shape.descriptor;
  const opts = Object.assign(renderShapeDefaults, options);
  this.save();
  const {w, h, shadowColor} = opts;
  this.canvas.width = w;
  this.canvas.height = h;
  this.fillStyle = opts.backgroundColor;
  const dpi = 1;
  this.fillRect(0, 0, w, h);
  this.translate(w * dpi / 2, h * dpi / 2);
  this.scale(dpi * w / 28, dpi * h / 28);
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
      const {subShape, color} = quadrants[quadrantIndex];
      const quadrantPos = arrayQuadrantIndexToOffset[quadrantIndex];
      const centerQuadrantX = quadrantPos.x * quadrantHalfSize;
      const centerQuadrantY = quadrantPos.y * quadrantHalfSize;
      const rotation = radians(quadrantIndex * 90);
      this.translate(centerQuadrantX, centerQuadrantY);
      this.rotate(rotation);
      this.fillStyle = _Color.ColorHexCodes[color];
      this.strokeStyle = opts.outlineColor || 'rgba(0, 0, 0, 0)';
      this.lineWidth = 1;
      const insetPadding = 0.0;
      switch (subShape) {
        case _Shape.SubShape.rect:
          {
            this.beginPath();
            const dims = quadrantSize * layerScale;
            this.rect(insetPadding + -quadrantHalfSize, -insetPadding + quadrantHalfSize - dims, dims, dims);
            break;
          }
        case _Shape.SubShape.star:
          {
            this.beginPath();
            const dims = quadrantSize * layerScale;
            const originX = insetPadding - quadrantHalfSize;
            const originY = -insetPadding + quadrantHalfSize - dims;
            const moveInwards = dims * 0.4;
            this.moveTo(originX, originY + moveInwards);
            this.lineTo(originX + dims, originY);
            this.lineTo(originX + dims - moveInwards, originY + dims);
            this.lineTo(originX, originY + dims);
            this.closePath();
            break;
          }
        case _Shape.SubShape.windmill:
          {
            this.beginPath();
            const dims = quadrantSize * layerScale;
            const originX = insetPadding - quadrantHalfSize;
            const originY = -insetPadding + quadrantHalfSize - dims;
            const moveInwards = dims * 0.4;
            this.moveTo(originX, originY + moveInwards);
            this.lineTo(originX + dims, originY);
            this.lineTo(originX + dims, originY + dims);
            this.lineTo(originX, originY + dims);
            this.closePath();
            break;
          }
        case _Shape.SubShape.circle:
          {
            this.beginPath();
            this.moveTo(insetPadding + -quadrantHalfSize, -insetPadding + quadrantHalfSize);
            this.arc(insetPadding + -quadrantHalfSize, -insetPadding + quadrantHalfSize, quadrantSize * layerScale, -Math.PI * 0.5, 0);
            this.closePath();
            break;
          }
        default:
          {
            throw new Error('Unkown sub shape: ' + subShape);
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

},{"./Color":"4HDMP","./Shape":"3eVfh"}],"4HDMP":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.possibleColorsString = exports.ShortCodeToColor = exports.ColorHexCodes = exports.ColorShortCode = exports.Color = void 0;
// From colors
/** @enum {string}*/
let Color;
exports.Color = Color;
(function (Color) {
  Color["red"] = "red";
  Color["green"] = "green";
  Color["blue"] = "blue";
  Color["yellow"] = "yellow";
  Color["purple"] = "purple";
  Color["cyan"] = "cyan";
  Color["white"] = "white";
  Color["uncolored"] = "uncolored";
})(Color || (exports.Color = Color = {}));
;
/** @enum {string}*/
const ColorShortCode = {
  [Color.red]: "r",
  [Color.green]: "g",
  [Color.blue]: "b",
  [Color.yellow]: "y",
  [Color.purple]: "p",
  [Color.cyan]: "c",
  [Color.white]: "w",
  [Color.uncolored]: "u"
};
exports.ColorShortCode = ColorShortCode;
/** @enum {string}*/
const ColorHexCodes = {
  [Color.red]: "#ff666a",
  [Color.green]: "#78ff66",
  [Color.blue]: "#66a7ff",
  // red + green
  [Color.yellow]: "#fcf52a",
  // red + blue
  [Color.purple]: "#dd66ff",
  // blue + green
  [Color.cyan]: "#87fff5",
  // blue + green + red
  [Color.white]: "#ffffff",
  [Color.uncolored]: "#aaaaaa"
};
exports.ColorHexCodes = ColorHexCodes;
/** @enum {Color}*/
const ShortCodeToColor = {
};
exports.ShortCodeToColor = ShortCodeToColor;
for (const key in ColorShortCode) {
  // @ts-ignore
  ShortCodeToColor[ColorShortCode[key]] = key;
}
const possibleColorsString = Object.keys(ShortCodeToColor).join("");
exports.possibleColorsString = possibleColorsString;

},{}],"3eVfh":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shape = exports.ShortKeyConversionError = exports.layerRegex = exports.possibleShapesString = exports.ShortCodeToSubShape = exports.SubShapeShortCode = exports.maxLayer = exports.SubShape = void 0;
var _Color = require("./Color");
/** @enum {string}*/
let SubShape;
exports.SubShape = SubShape;
(function (SubShape) {
  SubShape["rect"] = "rect";
  SubShape["circle"] = "circle";
  SubShape["star"] = "star";
  SubShape["windmill"] = "windmill";
})(SubShape || (exports.SubShape = SubShape = {}));
;
const maxLayer = 4;
exports.maxLayer = maxLayer;
/** @enum {string}*/
const SubShapeShortCode = {
  [SubShape.rect]: 'R',
  [SubShape.circle]: 'C',
  [SubShape.star]: 'S',
  [SubShape.windmill]: 'W'
};
exports.SubShapeShortCode = SubShapeShortCode;
/** @enum {SubShape}*/
const ShortCodeToSubShape = {
};
exports.ShortCodeToSubShape = ShortCodeToSubShape;
for (const key in SubShapeShortCode) {
  // @ts-ignore
  ShortCodeToSubShape[SubShapeShortCode[key]] = key;
}
const possibleShapesString = Object.keys(ShortCodeToSubShape).join('');
exports.possibleShapesString = possibleShapesString;
const layerRegex = new RegExp('([' + possibleShapesString + '][' + _Color.possibleColorsString + ']|-{2}){4}');
exports.layerRegex = layerRegex;
class ShortKeyConversionError extends Error {}
exports.ShortKeyConversionError = ShortKeyConversionError;
class Shape {
  get descriptor() {
    return this._descriptor;
  }
  constructor(descriptorOrKey) {
    this._descriptor = descriptorOrKey;
  }
  toString() {
    return `Shape(${this.toShortKey()})`;
  }
  [Symbol.iterator] = (function* () {
    yield* this.descriptor[Symbol.iterator]();
  }).bind(this);
  clone() {
    const shape = this.descriptor;
    return new Shape(shape.map(layer => {
      const mapped = layer.map(quad => {
        if (quad === null) return null; else return {
          ...quad
        };
      });
      if (mapped.length !== 4) throw new Error('Unexpected error in cloneShape: layer does not have 4 quads');
      return mapped;
    }));
  }
  toShortKey() {
    return this.descriptor.map(l => l.map(q => q === null ? '--' : SubShapeShortCode[q.subShape] + _Color.ColorShortCode[q.color]).join('')).join(':');
  }
  static fromShortKey(key) {
    const sourceLayers = key.split(':');
    if (!sourceLayers[0]) {
      throw new ShortKeyConversionError('Expected 1-4 layers, recieved 0');
    }
    if (sourceLayers.length > maxLayer) {
      throw new ShortKeyConversionError(`Expected 1-4 layers, recieved ${sourceLayers.length}`);
    }
    const layers = [];
    for (let i = 0; i < sourceLayers.length; ++i) {
      const text = sourceLayers[i];
      if (text.length !== 8) {
        throw new ShortKeyConversionError("Invalid layer: '" + text + "' -> must be 8 characters");
      }
      if (text === ('--').repeat(4)) {
        throw new ShortKeyConversionError('Empty layers are not allowed');
      }
      if (!layerRegex.test(text)) {
        throw new ShortKeyConversionError('Invalid syntax in layer ' + (i + 1));
      }
      const quads = [null, null, null, null];
      for (let quad = 0; quad < 4; ++quad) {
        const shapeText = text[quad * 2 + 0];
        const subShape = ShortCodeToSubShape[shapeText];
        const color = _Color.ShortCodeToColor[text[quad * 2 + 1]];
        if (subShape) {
          if (!color) {
            throw new ShortKeyConversionError('Invalid shape color key: ' + key);
          }
          quads[quad] = {
            subShape,
            color
          };
        } else if (shapeText !== '-') {
          throw new ShortKeyConversionError('Invalid shape key: ' + shapeText);
        }
      }
      layers.push(quads);
    }
    return new Shape(layers);
  }
}
exports.Shape = Shape;

},{"./Color":"4HDMP"}],"7njmi":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoublePaint = exports.QuadPaint = exports.Paint = void 0;
var _Color = require("../Color");
var _Shape = require("../Shape");
var _operation = require("./operation");
// adapted from shapez.io::js/game/shape_definition::586
function cloneAndPaintWith(shape, color) {
  if (color === _Color.Color.uncolored) throw new _operation.OperationInvalidIngredientError("A shape cannot be painted uncolored");
  const cloned = shape.clone().descriptor;
  for (let layerIndex = 0; layerIndex < cloned.length; ++layerIndex) {
    const quadrants = cloned[layerIndex];
    for (let quadrantIndex = 0; quadrantIndex < 4; ++quadrantIndex) {
      const item = quadrants[quadrantIndex];
      if (item) {
        item.color = color;
      }
    }
  }
  return new _Shape.Shape(cloned);
}
// adapted from shapez.io::js/game/shape_definition::601/
function cloneAndPaintWith4Colors(shape, colors) {
  if (colors.some(c => c === _Color.Color.uncolored)) throw new _operation.OperationInvalidIngredientError("A shape cannot be painted uncolored");
  const newLayers = shape.clone().descriptor;
  for (let layerIndex = 0; layerIndex < newLayers.length; ++layerIndex) {
    const quadrants = newLayers[layerIndex];
    for (let quadrantIndex = 0; quadrantIndex < 4; ++quadrantIndex) {
      const item = quadrants[quadrantIndex];
      const color = colors[quadrantIndex];
      if (item && color) {
        item.color = color;
      }
    }
  }
  return new _Shape.Shape(newLayers);
}
const Paint = (0, _operation.createOperation)({
  name: 'Paint',
  ingredients: ['shape', 'color'],
  result: 'shape',
  operate: ingredients => cloneAndPaintWith(...ingredients)
});
exports.Paint = Paint;
const QuadPaint = (0, _operation.createOperation)({
  name: 'QuadPaint',
  ingredients: ['shape', ['color', 'color', 'color', 'color'], ['boolean', 'boolean', 'boolean', 'boolean']],
  result: 'shape',
  operate: ([shape, colors, bools]) => {
    if (!bools.some(b => !!b)) throw new _operation.OperationInvalidIngredientError("At least one wire must be activated");
    const activatedColors = colors.map((v, i) => bools[i] ? v : null);
    return cloneAndPaintWith4Colors(shape, activatedColors);
  }
});
exports.QuadPaint = QuadPaint;
const DoublePaint = (0, _operation.createOperation)({
  name: 'DoublePaint',
  ingredients: [['shape', 'shape'], 'color'],
  result: ['shape', 'shape'],
  operate: ([shapes, color]) => shapes.map(shape => cloneAndPaintWith(shape, color))
});
exports.DoublePaint = DoublePaint;

},{"../Shape":"3eVfh","./operation":"3pbjg","../Color":"4HDMP"}],"3pbjg":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOperation = createOperation;
exports.OperationInvalidIngredientError = exports.OperationIngredientTypeMismatchError = void 0;
var _util = require("../util");
class OperationIngredientTypeMismatchError extends Error {}
exports.OperationIngredientTypeMismatchError = OperationIngredientTypeMismatchError;
class OperationInvalidIngredientError extends Error {}
exports.OperationInvalidIngredientError = OperationInvalidIngredientError;
function createOperation(config) {
  const op = function (ingredients) {
    // validate ingredients
    validateIngredientTypes(ingredients, config.ingredients);
    try {
      let result = config.operate(ingredients);
      return {
        name: config.name,
        ingredients,
        isError: false,
        result
      };
    } catch (e) {
      if (e instanceof OperationInvalidIngredientError) {
        return {
          name: config.name,
          ingredients,
          isError: true,
          error: e.message
        };
      } else throw e;
    }
  };
  return op;
}
function validateIngredientTypes(ingredients, types) {
  if (ingredients.length !== types.length) throw new OperationIngredientTypeMismatchError(`Ingredient array length (${ingredients.length}) not equal to expected length (${types.length})`);
  ingredients.forEach((ingredient, i) => {
    const ingredientType = types[i];
    if (ingredientType instanceof Array) {
      if (!(ingredient instanceof Array)) throw new OperationIngredientTypeMismatchError(`Expected array, got '${ingredient}' in ingredient ${i}`);
      if (ingredient.length !== ingredientType.length) throw new OperationIngredientTypeMismatchError(`Ingredient array length (${ingredient.length}) in ingredient ${i} not equal to expected length (${ingredientType.length})`);
      try {
        validateIngredientTypes(ingredient, ingredientType);
      } catch (e) {
        if (e instanceof OperationIngredientTypeMismatchError) {
          e.message = e.message.replace(/ingredient/g, "index") + ` in ingredient ${i}`;
        }
        throw e;
      }
    } else if ((0, _util.getGameObjectType)(ingredient) !== ingredientType) throw new OperationIngredientTypeMismatchError(`Expected ${ingredientType}, got '${ingredient}' in ingredient ${i}`);
  });
}

},{"../util":"2cNuk"}],"2cNuk":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSubShape = isSubShape;
exports.isColor = isColor;
exports.isLayer = isLayer;
exports.isShape = isShape;
exports.isShapeKey = isShapeKey;
exports.isShapeDescriptor = isShapeDescriptor;
exports.getGameObjectType = getGameObjectType;
var _Color = require("./Color");
var _Shape = require("./Shape");
/*
* Lots of code here is copied 1:1 from actual game files
*
*/
function isSubShape(subshape) {
  return typeof subshape === "string" && !!_Shape.SubShape[subshape];
}
function isColor(color) {
  return typeof color === "string" && (color in _Color.Color);
}
function isLayer(layer) {
  if (!(layer instanceof Array && layer.length === 4)) return false;
  if (layer.every(q => q === null)) return false;
  return layer.every(quad => {
    if (quad === null) return true;
    if (!(quad instanceof Object)) return false;
    if (!(("subShape" in quad) && ("color" in quad))) return false;
    return isSubShape(quad.subShape) && isColor(quad.color);
  });
}
function isShape(shape) {
  return shape instanceof _Shape.Shape;
}
function isShapeKey(key) {
  if (typeof key !== "string") return false;
  try {
    _Shape.Shape.fromShortKey(key);
    return true;
  } catch (e) {
    if (e instanceof _Shape.ShortKeyConversionError) return false; else throw e;
  }
}
function isShapeDescriptor(descriptor) {
  if (!(descriptor instanceof Array && descriptor.length > 0 && descriptor.length <= 4)) return false;
  return descriptor.every(isLayer);
}
function getGameObjectType(gameObject) {
  if (typeof gameObject === 'boolean') return 'boolean';
  if (isColor(gameObject)) return 'color';
  if (isShape(gameObject)) return 'shape';
  return null;
}

},{"./Color":"4HDMP","./Shape":"3eVfh"}]},["7tYYr","yv9yU"], "yv9yU", "parcelRequire67a6")

//# sourceMappingURL=index.fa7ffa95.js.map
