import { f as boot } from "./index.fb242601.js";
import { c as core, A as Api } from "./api.b3e7b694.js";
import "./BaseAlert.d7479406.js";
const reRGBA = /^rgb(a)?\((\d{1,3}),(\d{1,3}),(\d{1,3}),?([01]?\.?\d*?)?\)$/;
function rgbToHex({ r, g, b, a }) {
  const alpha = a !== void 0;
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  if (r > 255 || g > 255 || b > 255 || alpha && a > 100) {
    throw new TypeError("Expected 3 numbers below 256 (and optionally one below 100)");
  }
  a = alpha ? (Math.round(255 * a / 100) | 1 << 8).toString(16).slice(1) : "";
  return "#" + (b | g << 8 | r << 16 | 1 << 24).toString(16).slice(1) + a;
}
function hexToRgb(hex) {
  if (typeof hex !== "string") {
    throw new TypeError("Expected a string");
  }
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  } else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  const num = parseInt(hex, 16);
  return hex.length > 6 ? { r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55) } : { r: num >> 16, g: num >> 8 & 255, b: num & 255 };
}
function hsvToRgb({ h, s, v, a }) {
  let r, g, b;
  s = s / 100;
  v = v / 100;
  h = h / 360;
  const i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a
  };
}
function rgbToHsv({ r, g, b, a }) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, s = max === 0 ? 0 : d / max, v = max / 255;
  let h;
  switch (max) {
    case min:
      h = 0;
      break;
    case r:
      h = g - b + d * (g < b ? 6 : 0);
      h /= 6 * d;
      break;
    case g:
      h = b - r + d * 2;
      h /= 6 * d;
      break;
    case b:
      h = r - g + d * 4;
      h /= 6 * d;
      break;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
    a
  };
}
function textToRgb(str) {
  if (typeof str !== "string") {
    throw new TypeError("Expected a string");
  }
  const color = str.replace(/ /g, "");
  const m = reRGBA.exec(color);
  if (m === null) {
    return hexToRgb(color);
  }
  const rgb = {
    r: Math.min(255, parseInt(m[2], 10)),
    g: Math.min(255, parseInt(m[3], 10)),
    b: Math.min(255, parseInt(m[4], 10))
  };
  if (m[1]) {
    const alpha = parseFloat(m[5]);
    rgb.a = Math.min(1, isNaN(alpha) === true ? 1 : alpha) * 100;
  }
  return rgb;
}
function lighten(color, percent) {
  if (typeof color !== "string") {
    throw new TypeError("Expected a string as color");
  }
  if (typeof percent !== "number") {
    throw new TypeError("Expected a numeric percent");
  }
  const rgb = textToRgb(color), t = percent < 0 ? 0 : 255, p = Math.abs(percent) / 100, R = rgb.r, G = rgb.g, B = rgb.b;
  return "#" + (16777216 + (Math.round((t - R) * p) + R) * 65536 + (Math.round((t - G) * p) + G) * 256 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}
function luminosity(color) {
  if (typeof color !== "string" && (!color || color.r === void 0)) {
    throw new TypeError("Expected a string or a {r, g, b} object as color");
  }
  const rgb = typeof color === "string" ? textToRgb(color) : color, r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255, R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4), G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4), B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
function brightness(color) {
  if (typeof color !== "string" && (!color || color.r === void 0)) {
    throw new TypeError("Expected a string or a {r, g, b} object as color");
  }
  const rgb = typeof color === "string" ? textToRgb(color) : color;
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
}
function blend(fgColor, bgColor) {
  if (typeof fgColor !== "string" && (!fgColor || fgColor.r === void 0)) {
    throw new TypeError("Expected a string or a {r, g, b[, a]} object as fgColor");
  }
  if (typeof bgColor !== "string" && (!bgColor || bgColor.r === void 0)) {
    throw new TypeError("Expected a string or a {r, g, b[, a]} object as bgColor");
  }
  const rgb1 = typeof fgColor === "string" ? textToRgb(fgColor) : fgColor, r1 = rgb1.r / 255, g1 = rgb1.g / 255, b1 = rgb1.b / 255, a1 = rgb1.a !== void 0 ? rgb1.a / 100 : 1, rgb2 = typeof bgColor === "string" ? textToRgb(bgColor) : bgColor, r2 = rgb2.r / 255, g2 = rgb2.g / 255, b2 = rgb2.b / 255, a2 = rgb2.a !== void 0 ? rgb2.a / 100 : 1, a = a1 + a2 * (1 - a1), r = Math.round((r1 * a1 + r2 * a2 * (1 - a1)) / a * 255), g = Math.round((g1 * a1 + g2 * a2 * (1 - a1)) / a * 255), b = Math.round((b1 * a1 + b2 * a2 * (1 - a1)) / a * 255);
  const ret = { r, g, b, a: Math.round(a * 100) };
  return typeof fgColor === "string" ? rgbToHex(ret) : ret;
}
function changeAlpha(color, offset) {
  if (typeof color !== "string") {
    throw new TypeError("Expected a string as color");
  }
  if (offset === void 0 || offset < -1 || offset > 1) {
    throw new TypeError("Expected offset to be between -1 and 1");
  }
  const { r, g, b, a } = textToRgb(color);
  const alpha = a !== void 0 ? a / 100 : 0;
  return rgbToHex({
    r,
    g,
    b,
    a: Math.round(Math.min(1, Math.max(0, alpha + offset)) * 100)
  });
}
function getPaletteColor(colorName) {
  if (typeof colorName !== "string") {
    throw new TypeError("Expected a string as color");
  }
  const el = document.createElement("div");
  el.className = `text-${colorName} invisible fixed no-pointer-events`;
  document.body.appendChild(el);
  const result = getComputedStyle(el).getPropertyValue("color");
  el.remove();
  return rgbToHex(textToRgb(result));
}
var colors = {
  rgbToHex,
  hexToRgb,
  hsvToRgb,
  rgbToHsv,
  textToRgb,
  lighten,
  luminosity,
  brightness,
  blend,
  changeAlpha,
  getPaletteColor
};
var axios$2 = { exports: {} };
var bind$2 = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
var bind$1 = bind$2;
var toString = Object.prototype.toString;
var kindOf = function(cache) {
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}
function isArray(val) {
  return Array.isArray(val);
}
function isUndefined(val) {
  return typeof val === "undefined";
}
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number";
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function isPlainObject(val) {
  if (kindOf(val) !== "object") {
    return false;
  }
  var prototype2 = Object.getPrototypeOf(val);
  return prototype2 === null || prototype2 === Object.prototype;
}
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
function isFunction(val) {
  return toString.call(val) === "[object Function]";
}
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
function isFormData(thing) {
  var pattern = "[object FormData]";
  return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
}
var isURLSearchParams = kindOfTest("URLSearchParams");
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function forEach(obj, fn) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
function merge() {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a[key] = bind$1(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
function stripBOM(content) {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
}
function inherits(constructor, superConstructor, props, descriptors2) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}
function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};
  destObj = destObj || {};
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
}
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}
function toArray(thing) {
  if (!thing)
    return null;
  var i = thing.length;
  if (isUndefined(i))
    return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}
var isTypedArray = function(TypedArray) {
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
}(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
var utils$h = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  isTypedArray,
  isFileList
};
var utils$g = utils$h;
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$2 = function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$g.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$g.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (utils$g.isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }
      utils$g.forEach(val, function parseValue(v) {
        if (utils$g.isDate(v)) {
          v = v.toISOString();
        } else if (utils$g.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + "=" + encode(v));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
var utils$f = utils$h;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled,
    rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn) {
  utils$f.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;
var utils$e = utils$h;
var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$e.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
var utils$d = utils$h;
function AxiosError$5(message, code, config, request2, response) {
  Error.call(this);
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request2 && (this.request = request2);
  response && (this.response = response);
}
utils$d.inherits(AxiosError$5, Error, {
  toJSON: function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var prototype = AxiosError$5.prototype;
var descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED"
].forEach(function(code) {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$5, descriptors);
Object.defineProperty(prototype, "isAxiosError", { value: true });
AxiosError$5.from = function(error, code, config, request2, response, customProps) {
  var axiosError = Object.create(prototype);
  utils$d.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });
  AxiosError$5.call(axiosError, error.message, code, config, request2, response);
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_1 = AxiosError$5;
var transitional = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
var utils$c = utils$h;
function toFormData$1(obj, formData) {
  formData = formData || new FormData();
  var stack = [];
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils$c.isDate(value)) {
      return value.toISOString();
    }
    if (utils$c.isArrayBuffer(value) || utils$c.isTypedArray(value)) {
      return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function build(data2, parentKey) {
    if (utils$c.isPlainObject(data2) || utils$c.isArray(data2)) {
      if (stack.indexOf(data2) !== -1) {
        throw Error("Circular reference detected in " + parentKey);
      }
      stack.push(data2);
      utils$c.forEach(data2, function each(value, key) {
        if (utils$c.isUndefined(value))
          return;
        var fullKey = parentKey ? parentKey + "." + key : key;
        var arr;
        if (value && !parentKey && typeof value === "object") {
          if (utils$c.endsWith(key, "{}")) {
            value = JSON.stringify(value);
          } else if (utils$c.endsWith(key, "[]") && (arr = utils$c.toArray(value))) {
            arr.forEach(function(el) {
              !utils$c.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }
        build(value, fullKey);
      });
      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data2));
    }
  }
  build(obj);
  return formData;
}
var toFormData_1 = toFormData$1;
var AxiosError$4 = AxiosError_1;
var settle$1 = function settle(resolve, reject, response) {
  var validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$4(
      "Request failed with status code " + response.status,
      [AxiosError$4.ERR_BAD_REQUEST, AxiosError$4.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
};
var utils$b = utils$h;
var cookies$1 = utils$b.isStandardBrowserEnv() ? function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + "=" + encodeURIComponent(value));
      if (utils$b.isNumber(expires)) {
        cookie.push("expires=" + new Date(expires).toGMTString());
      }
      if (utils$b.isString(path)) {
        cookie.push("path=" + path);
      }
      if (utils$b.isString(domain)) {
        cookie.push("domain=" + domain);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      document.cookie = cookie.join("; ");
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  };
}() : function nonStandardBrowserEnv() {
  return {
    write: function write() {
    },
    read: function read() {
      return null;
    },
    remove: function remove() {
    }
  };
}();
var isAbsoluteURL$1 = function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};
var isAbsoluteURL2 = isAbsoluteURL$1;
var combineURLs2 = combineURLs$1;
var buildFullPath$2 = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL2(requestedURL)) {
    return combineURLs2(baseURL, requestedURL);
  }
  return requestedURL;
};
var utils$a = utils$h;
var ignoreDuplicateOf = [
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
];
var parseHeaders$1 = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;
  if (!headers) {
    return parsed;
  }
  utils$a.forEach(headers.split("\n"), function parser(line) {
    i = line.indexOf(":");
    key = utils$a.trim(line.substr(0, i)).toLowerCase();
    val = utils$a.trim(line.substr(i + 1));
    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === "set-cookie") {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    }
  });
  return parsed;
};
var utils$9 = utils$h;
var isURLSameOrigin$1 = utils$9.isStandardBrowserEnv() ? function standardBrowserEnv2() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement("a");
  var originURL;
  function resolveURL(url) {
    var href = url;
    if (msie) {
      urlParsingNode.setAttribute("href", href);
      href = urlParsingNode.href;
    }
    urlParsingNode.setAttribute("href", href);
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
    };
  }
  originURL = resolveURL(window.location.href);
  return function isURLSameOrigin2(requestURL) {
    var parsed = utils$9.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : function nonStandardBrowserEnv2() {
  return function isURLSameOrigin2() {
    return true;
  };
}();
var AxiosError$3 = AxiosError_1;
var utils$8 = utils$h;
function CanceledError$3(message) {
  AxiosError$3.call(this, message == null ? "canceled" : message, AxiosError$3.ERR_CANCELED);
  this.name = "CanceledError";
}
utils$8.inherits(CanceledError$3, AxiosError$3, {
  __CANCEL__: true
});
var CanceledError_1 = CanceledError$3;
var parseProtocol$1 = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
};
var utils$7 = utils$h;
var settle2 = settle$1;
var cookies = cookies$1;
var buildURL$1 = buildURL$2;
var buildFullPath$1 = buildFullPath$2;
var parseHeaders2 = parseHeaders$1;
var isURLSameOrigin = isURLSameOrigin$1;
var transitionalDefaults$1 = transitional;
var AxiosError$2 = AxiosError_1;
var CanceledError$2 = CanceledError_1;
var parseProtocol2 = parseProtocol$1;
var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }
      if (config.signal) {
        config.signal.removeEventListener("abort", onCanceled);
      }
    }
    if (utils$7.isFormData(requestData) && utils$7.isStandardBrowserEnv()) {
      delete requestHeaders["Content-Type"];
    }
    var request2 = new XMLHttpRequest();
    if (config.auth) {
      var username = config.auth.username || "";
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
      requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
    }
    var fullPath = buildFullPath$1(config.baseURL, config.url);
    request2.open(config.method.toUpperCase(), buildURL$1(fullPath, config.params, config.paramsSerializer), true);
    request2.timeout = config.timeout;
    function onloadend() {
      if (!request2) {
        return;
      }
      var responseHeaders = "getAllResponseHeaders" in request2 ? parseHeaders2(request2.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
      var response = {
        data: responseData,
        status: request2.status,
        statusText: request2.statusText,
        headers: responseHeaders,
        config,
        request: request2
      };
      settle2(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request2 = null;
    }
    if ("onloadend" in request2) {
      request2.onloadend = onloadend;
    } else {
      request2.onreadystatechange = function handleLoad() {
        if (!request2 || request2.readyState !== 4) {
          return;
        }
        if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request2.onabort = function handleAbort() {
      if (!request2) {
        return;
      }
      reject(new AxiosError$2("Request aborted", AxiosError$2.ECONNABORTED, config, request2));
      request2 = null;
    };
    request2.onerror = function handleError() {
      reject(new AxiosError$2("Network Error", AxiosError$2.ERR_NETWORK, config, request2, request2));
      request2 = null;
    };
    request2.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
      var transitional3 = config.transitional || transitionalDefaults$1;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError$2(
        timeoutErrorMessage,
        transitional3.clarifyTimeoutError ? AxiosError$2.ETIMEDOUT : AxiosError$2.ECONNABORTED,
        config,
        request2
      ));
      request2 = null;
    };
    if (utils$7.isStandardBrowserEnv()) {
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }
    if ("setRequestHeader" in request2) {
      utils$7.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
          delete requestHeaders[key];
        } else {
          request2.setRequestHeader(key, val);
        }
      });
    }
    if (!utils$7.isUndefined(config.withCredentials)) {
      request2.withCredentials = !!config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request2.responseType = config.responseType;
    }
    if (typeof config.onDownloadProgress === "function") {
      request2.addEventListener("progress", config.onDownloadProgress);
    }
    if (typeof config.onUploadProgress === "function" && request2.upload) {
      request2.upload.addEventListener("progress", config.onUploadProgress);
    }
    if (config.cancelToken || config.signal) {
      onCanceled = function(cancel) {
        if (!request2) {
          return;
        }
        reject(!cancel || cancel && cancel.type ? new CanceledError$2() : cancel);
        request2.abort();
        request2 = null;
      };
      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
      }
    }
    if (!requestData) {
      requestData = null;
    }
    var protocol = parseProtocol2(fullPath);
    if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
      reject(new AxiosError$2("Unsupported protocol " + protocol + ":", AxiosError$2.ERR_BAD_REQUEST, config));
      return;
    }
    request2.send(requestData);
  });
};
var _null = null;
var utils$6 = utils$h;
var normalizeHeaderName2 = normalizeHeaderName$1;
var AxiosError$1 = AxiosError_1;
var transitionalDefaults = transitional;
var toFormData = toFormData_1;
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$6.isUndefined(headers) && utils$6.isUndefined(headers["Content-Type"])) {
    headers["Content-Type"] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = xhr;
  } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    adapter = xhr;
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$6.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$6.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults$3 = {
  transitional: transitionalDefaults,
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data2, headers) {
    normalizeHeaderName2(headers, "Accept");
    normalizeHeaderName2(headers, "Content-Type");
    if (utils$6.isFormData(data2) || utils$6.isArrayBuffer(data2) || utils$6.isBuffer(data2) || utils$6.isStream(data2) || utils$6.isFile(data2) || utils$6.isBlob(data2)) {
      return data2;
    }
    if (utils$6.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$6.isURLSearchParams(data2)) {
      setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
      return data2.toString();
    }
    var isObjectPayload = utils$6.isObject(data2);
    var contentType = headers && headers["Content-Type"];
    var isFileList2;
    if ((isFileList2 = utils$6.isFileList(data2)) || isObjectPayload && contentType === "multipart/form-data") {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList2 ? { "files[]": data2 } : data2, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === "application/json") {
      setContentTypeIfUnset(headers, "application/json");
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    var transitional3 = this.transitional || defaults$3.transitional;
    var silentJSONParsing = transitional3 && transitional3.silentJSONParsing;
    var forcedJSONParsing = transitional3 && transitional3.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
    if (strictJSONParsing || forcedJSONParsing && utils$6.isString(data2) && data2.length) {
      try {
        return JSON.parse(data2);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data2;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: _null
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*"
    }
  }
};
utils$6.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults$3.headers[method] = {};
});
utils$6.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults$3.headers[method] = utils$6.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$3;
var utils$5 = utils$h;
var defaults$2 = defaults_1;
var transformData$1 = function transformData(data2, headers, fns) {
  var context = this || defaults$2;
  utils$5.forEach(fns, function transform(fn) {
    data2 = fn.call(context, data2, headers);
  });
  return data2;
};
var isCancel$1 = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};
var utils$4 = utils$h;
var transformData2 = transformData$1;
var isCancel2 = isCancel$1;
var defaults$1 = defaults_1;
var CanceledError$1 = CanceledError_1;
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1();
  }
}
var dispatchRequest$1 = function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = config.headers || {};
  config.data = transformData2.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );
  config.headers = utils$4.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );
  utils$4.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );
  var adapter = config.adapter || defaults$1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData2.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel2(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData2.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }
    return Promise.reject(reason);
  });
};
var utils$3 = utils$h;
var mergeConfig$2 = function mergeConfig(config1, config2) {
  config2 = config2 || {};
  var config = {};
  function getMergedValue(target, source2) {
    if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source2)) {
      return utils$3.merge(target, source2);
    } else if (utils$3.isPlainObject(source2)) {
      return utils$3.merge({}, source2);
    } else if (utils$3.isArray(source2)) {
      return source2.slice();
    }
    return source2;
  }
  function mergeDeepProperties(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function valueFromConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    }
  }
  function defaultToConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  var mergeMap = {
    "url": valueFromConfig2,
    "method": valueFromConfig2,
    "data": valueFromConfig2,
    "baseURL": defaultToConfig2,
    "transformRequest": defaultToConfig2,
    "transformResponse": defaultToConfig2,
    "paramsSerializer": defaultToConfig2,
    "timeout": defaultToConfig2,
    "timeoutMessage": defaultToConfig2,
    "withCredentials": defaultToConfig2,
    "adapter": defaultToConfig2,
    "responseType": defaultToConfig2,
    "xsrfCookieName": defaultToConfig2,
    "xsrfHeaderName": defaultToConfig2,
    "onUploadProgress": defaultToConfig2,
    "onDownloadProgress": defaultToConfig2,
    "decompress": defaultToConfig2,
    "maxContentLength": defaultToConfig2,
    "maxBodyLength": defaultToConfig2,
    "beforeRedirect": defaultToConfig2,
    "transport": defaultToConfig2,
    "httpAgent": defaultToConfig2,
    "httpsAgent": defaultToConfig2,
    "cancelToken": defaultToConfig2,
    "socketPath": defaultToConfig2,
    "responseEncoding": defaultToConfig2,
    "validateStatus": mergeDirectKeys
  };
  utils$3.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge2 = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge2(prop);
    utils$3.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
};
var data = {
  "version": "0.27.2"
};
var VERSION = data.version;
var AxiosError = AxiosError_1;
var validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators$1.transitional = function transitional2(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return function(value, opt, opts) {
    if (validator2 === false) {
      throw new AxiosError(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator2 = schema[opt];
    if (validator2) {
      var value = options[opt];
      var result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
var validator$1 = {
  assertOptions,
  validators: validators$1
};
var utils$2 = utils$h;
var buildURL2 = buildURL$2;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest2 = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var buildFullPath2 = buildFullPath$2;
var validator = validator$1;
var validators = validator.validators;
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios$1.prototype.request = function request(configOrUrl, config) {
  if (typeof configOrUrl === "string") {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }
  config = mergeConfig$1(this.defaults, config);
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }
  var transitional3 = config.transitional;
  if (transitional3 !== void 0) {
    validator.assertOptions(transitional3, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest2, void 0];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }
  try {
    promise = dispatchRequest2(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$1.prototype.getUri = function getUri(config) {
  config = mergeConfig$1(this.defaults, config);
  var fullPath = buildFullPath2(config.baseURL, config.url);
  return buildURL2(fullPath, config.params, config.paramsSerializer);
};
utils$2.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$2.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data2, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data: data2
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_1 = Axios$1;
var CanceledError = CanceledError_1;
function CancelToken(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("executor must be a function.");
  }
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  this.promise.then(function(cancel) {
    if (!token._listeners)
      return;
    var i;
    var l = token._listeners.length;
    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });
  this.promise.then = function(onfulfilled) {
    var _resolve;
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);
    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };
    return promise;
  };
  executor(function cancel(message) {
    if (token.reason) {
      return;
    }
    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }
  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};
CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token,
    cancel
  };
};
var CancelToken_1 = CancelToken;
var spread = function spread2(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};
var utils$1 = utils$h;
var isAxiosError = function isAxiosError2(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
};
var utils = utils$h;
var bind2 = bind$2;
var Axios = Axios_1;
var mergeConfig2 = mergeConfig$2;
var defaults = defaults_1;
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind2(Axios.prototype.request, context);
  utils.extend(instance, Axios.prototype, context);
  utils.extend(instance, context);
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig2(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios$1 = createInstance(defaults);
axios$1.Axios = Axios;
axios$1.CanceledError = CanceledError_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel$1;
axios$1.VERSION = data.version;
axios$1.toFormData = toFormData_1;
axios$1.AxiosError = AxiosError_1;
axios$1.Cancel = axios$1.CanceledError;
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread;
axios$1.isAxiosError = isAxiosError;
axios$2.exports = axios$1;
axios$2.exports.default = axios$1;
var axios = axios$2.exports;
var app = boot(async ({ app: app2, store }) => {
  console.core(`Loading ${"Qaravel"} services`);
  app2.config.globalProperties.$core = core;
  app2.config.globalProperties.$api = Api;
  app2.config.globalProperties.$colors = colors;
  axios.defaults.baseURL = "https://api.qaravel.coderstm.com/";
  axios.defaults.withCredentials = true;
  core.$axios = axios;
  core.$store = store;
  console.core("Mode: Development");
  await core.init();
});
export { app as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLjE1MDUzNWI0LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9jb2xvcnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvRm9ybURhdGEuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9udWxsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9lbnYvZGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy92YWxpZGF0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIi4uLy4uLy4uL3NyYy9ib290L2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByZVJHQkEgPSAvXnJnYihhKT9cXCgoXFxkezEsM30pLChcXGR7MSwzfSksKFxcZHsxLDN9KSw/KFswMV0/XFwuP1xcZCo/KT9cXCkkL1xuXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9IZXggKHsgciwgZywgYiwgYSB9KSB7XG4gIGNvbnN0IGFscGhhID0gYSAhPT0gdm9pZCAwXG5cbiAgciA9IE1hdGgucm91bmQocilcbiAgZyA9IE1hdGgucm91bmQoZylcbiAgYiA9IE1hdGgucm91bmQoYilcblxuICBpZiAoXG4gICAgciA+IDI1NVxuICAgIHx8IGcgPiAyNTVcbiAgICB8fCBiID4gMjU1XG4gICAgfHwgKGFscGhhICYmIGEgPiAxMDApXG4gICkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIDMgbnVtYmVycyBiZWxvdyAyNTYgKGFuZCBvcHRpb25hbGx5IG9uZSBiZWxvdyAxMDApJylcbiAgfVxuXG4gIGEgPSBhbHBoYVxuICAgID8gKE1hdGgucm91bmQoMjU1ICogYSAvIDEwMCkgfCAxIDw8IDgpLnRvU3RyaW5nKDE2KS5zbGljZSgxKVxuICAgIDogJydcblxuICByZXR1cm4gJyMnICsgKChiIHwgZyA8PCA4IHwgciA8PCAxNikgfCAxIDw8IDI0KS50b1N0cmluZygxNikuc2xpY2UoMSkgKyBhXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2JUb1N0cmluZyAoeyByLCBnLCBiLCBhIH0pIHtcbiAgcmV0dXJuIGByZ2IkeyBhICE9PSB2b2lkIDAgPyAnYScgOiAnJyB9KCR7IHIgfSwkeyBnIH0sJHsgYiB9JHsgYSAhPT0gdm9pZCAwID8gJywnICsgKGEgLyAxMDApIDogJycgfSlgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb1JnYiAoaGV4KSB7XG4gIGlmICh0eXBlb2YgaGV4ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJylcbiAgfVxuXG4gIGhleCA9IGhleC5yZXBsYWNlKC9eIy8sICcnKVxuXG4gIGlmIChoZXgubGVuZ3RoID09PSAzKSB7XG4gICAgaGV4ID0gaGV4WyAwIF0gKyBoZXhbIDAgXSArIGhleFsgMSBdICsgaGV4WyAxIF0gKyBoZXhbIDIgXSArIGhleFsgMiBdXG4gIH1cbiAgZWxzZSBpZiAoaGV4Lmxlbmd0aCA9PT0gNCkge1xuICAgIGhleCA9IGhleFsgMCBdICsgaGV4WyAwIF0gKyBoZXhbIDEgXSArIGhleFsgMSBdICsgaGV4WyAyIF0gKyBoZXhbIDIgXSArIGhleFsgMyBdICsgaGV4WyAzIF1cbiAgfVxuXG4gIGNvbnN0IG51bSA9IHBhcnNlSW50KGhleCwgMTYpXG5cbiAgcmV0dXJuIGhleC5sZW5ndGggPiA2XG4gICAgPyB7IHI6IG51bSA+PiAyNCAmIDI1NSwgZzogbnVtID4+IDE2ICYgMjU1LCBiOiBudW0gPj4gOCAmIDI1NSwgYTogTWF0aC5yb3VuZCgobnVtICYgMjU1KSAvIDIuNTUpIH1cbiAgICA6IHsgcjogbnVtID4+IDE2LCBnOiBudW0gPj4gOCAmIDI1NSwgYjogbnVtICYgMjU1IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhzdlRvUmdiICh7IGgsIHMsIHYsIGEgfSkge1xuICBsZXQgciwgZywgYlxuICBzID0gcyAvIDEwMFxuICB2ID0gdiAvIDEwMFxuXG4gIGggPSBoIC8gMzYwXG4gIGNvbnN0XG4gICAgaSA9IE1hdGguZmxvb3IoaCAqIDYpLFxuICAgIGYgPSBoICogNiAtIGksXG4gICAgcCA9IHYgKiAoMSAtIHMpLFxuICAgIHEgPSB2ICogKDEgLSBmICogcyksXG4gICAgdCA9IHYgKiAoMSAtICgxIC0gZikgKiBzKVxuXG4gIHN3aXRjaCAoaSAlIDYpIHtcbiAgICBjYXNlIDA6XG4gICAgICByID0gdlxuICAgICAgZyA9IHRcbiAgICAgIGIgPSBwXG4gICAgICBicmVha1xuICAgIGNhc2UgMTpcbiAgICAgIHIgPSBxXG4gICAgICBnID0gdlxuICAgICAgYiA9IHBcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAyOlxuICAgICAgciA9IHBcbiAgICAgIGcgPSB2XG4gICAgICBiID0gdFxuICAgICAgYnJlYWtcbiAgICBjYXNlIDM6XG4gICAgICByID0gcFxuICAgICAgZyA9IHFcbiAgICAgIGIgPSB2XG4gICAgICBicmVha1xuICAgIGNhc2UgNDpcbiAgICAgIHIgPSB0XG4gICAgICBnID0gcFxuICAgICAgYiA9IHZcbiAgICAgIGJyZWFrXG4gICAgY2FzZSA1OlxuICAgICAgciA9IHZcbiAgICAgIGcgPSBwXG4gICAgICBiID0gcVxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcjogTWF0aC5yb3VuZChyICogMjU1KSxcbiAgICBnOiBNYXRoLnJvdW5kKGcgKiAyNTUpLFxuICAgIGI6IE1hdGgucm91bmQoYiAqIDI1NSksXG4gICAgYVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2JUb0hzdiAoeyByLCBnLCBiLCBhIH0pIHtcbiAgY29uc3RcbiAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICBkID0gbWF4IC0gbWluLFxuICAgIHMgPSAobWF4ID09PSAwID8gMCA6IGQgLyBtYXgpLFxuICAgIHYgPSBtYXggLyAyNTVcbiAgbGV0IGhcblxuICBzd2l0Y2ggKG1heCkge1xuICAgIGNhc2UgbWluOlxuICAgICAgaCA9IDBcbiAgICAgIGJyZWFrXG4gICAgY2FzZSByOlxuICAgICAgaCA9IChnIC0gYikgKyBkICogKGcgPCBiID8gNiA6IDApXG4gICAgICBoIC89IDYgKiBkXG4gICAgICBicmVha1xuICAgIGNhc2UgZzpcbiAgICAgIGggPSAoYiAtIHIpICsgZCAqIDJcbiAgICAgIGggLz0gNiAqIGRcbiAgICAgIGJyZWFrXG4gICAgY2FzZSBiOlxuICAgICAgaCA9IChyIC0gZykgKyBkICogNFxuICAgICAgaCAvPSA2ICogZFxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaDogTWF0aC5yb3VuZChoICogMzYwKSxcbiAgICBzOiBNYXRoLnJvdW5kKHMgKiAxMDApLFxuICAgIHY6IE1hdGgucm91bmQodiAqIDEwMCksXG4gICAgYVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0VG9SZ2IgKHN0cikge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpXG4gIH1cblxuICBjb25zdCBjb2xvciA9IHN0ci5yZXBsYWNlKC8gL2csICcnKVxuXG4gIGNvbnN0IG0gPSByZVJHQkEuZXhlYyhjb2xvcilcblxuICBpZiAobSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBoZXhUb1JnYihjb2xvcilcbiAgfVxuXG4gIGNvbnN0IHJnYiA9IHtcbiAgICByOiBNYXRoLm1pbigyNTUsIHBhcnNlSW50KG1bIDIgXSwgMTApKSxcbiAgICBnOiBNYXRoLm1pbigyNTUsIHBhcnNlSW50KG1bIDMgXSwgMTApKSxcbiAgICBiOiBNYXRoLm1pbigyNTUsIHBhcnNlSW50KG1bIDQgXSwgMTApKVxuICB9XG5cbiAgaWYgKG1bIDEgXSkge1xuICAgIGNvbnN0IGFscGhhID0gcGFyc2VGbG9hdChtWyA1IF0pXG4gICAgcmdiLmEgPSBNYXRoLm1pbigxLCBpc05hTihhbHBoYSkgPT09IHRydWUgPyAxIDogYWxwaGEpICogMTAwXG4gIH1cblxuICByZXR1cm4gcmdiXG59XG5cbi8qIHdvcmtzIGFzIGRhcmtlbiBpZiBwZXJjZW50IDwgMCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZ2h0ZW4gKGNvbG9yLCBwZXJjZW50KSB7XG4gIGlmICh0eXBlb2YgY29sb3IgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcgYXMgY29sb3InKVxuICB9XG4gIGlmICh0eXBlb2YgcGVyY2VudCAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIG51bWVyaWMgcGVyY2VudCcpXG4gIH1cblxuICBjb25zdCByZ2IgPSB0ZXh0VG9SZ2IoY29sb3IpLFxuICAgIHQgPSBwZXJjZW50IDwgMCA/IDAgOiAyNTUsXG4gICAgcCA9IE1hdGguYWJzKHBlcmNlbnQpIC8gMTAwLFxuICAgIFIgPSByZ2IucixcbiAgICBHID0gcmdiLmcsXG4gICAgQiA9IHJnYi5iXG5cbiAgcmV0dXJuICcjJyArIChcbiAgICAweDEwMDAwMDAgKyAoTWF0aC5yb3VuZCgodCAtIFIpICogcCkgKyBSKSAqIDB4MTAwMDBcbiAgICArIChNYXRoLnJvdW5kKCh0IC0gRykgKiBwKSArIEcpICogMHgxMDBcbiAgICArIChNYXRoLnJvdW5kKCh0IC0gQikgKiBwKSArIEIpXG4gICkudG9TdHJpbmcoMTYpLnNsaWNlKDEpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsdW1pbm9zaXR5IChjb2xvcikge1xuICBpZiAodHlwZW9mIGNvbG9yICE9PSAnc3RyaW5nJyAmJiAoIWNvbG9yIHx8IGNvbG9yLnIgPT09IHZvaWQgMCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZyBvciBhIHtyLCBnLCBifSBvYmplY3QgYXMgY29sb3InKVxuICB9XG5cbiAgY29uc3RcbiAgICByZ2IgPSB0eXBlb2YgY29sb3IgPT09ICdzdHJpbmcnID8gdGV4dFRvUmdiKGNvbG9yKSA6IGNvbG9yLFxuICAgIHIgPSByZ2IuciAvIDI1NSxcbiAgICBnID0gcmdiLmcgLyAyNTUsXG4gICAgYiA9IHJnYi5iIC8gMjU1LFxuICAgIFIgPSByIDw9IDAuMDM5MjggPyByIC8gMTIuOTIgOiBNYXRoLnBvdygociArIDAuMDU1KSAvIDEuMDU1LCAyLjQpLFxuICAgIEcgPSBnIDw9IDAuMDM5MjggPyBnIC8gMTIuOTIgOiBNYXRoLnBvdygoZyArIDAuMDU1KSAvIDEuMDU1LCAyLjQpLFxuICAgIEIgPSBiIDw9IDAuMDM5MjggPyBiIC8gMTIuOTIgOiBNYXRoLnBvdygoYiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG4gIHJldHVybiAwLjIxMjYgKiBSICsgMC43MTUyICogRyArIDAuMDcyMiAqIEJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyaWdodG5lc3MgKGNvbG9yKSB7XG4gIGlmICh0eXBlb2YgY29sb3IgIT09ICdzdHJpbmcnICYmICghY29sb3IgfHwgY29sb3IuciA9PT0gdm9pZCAwKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGEge3IsIGcsIGJ9IG9iamVjdCBhcyBjb2xvcicpXG4gIH1cblxuICBjb25zdCByZ2IgPSB0eXBlb2YgY29sb3IgPT09ICdzdHJpbmcnXG4gICAgPyB0ZXh0VG9SZ2IoY29sb3IpXG4gICAgOiBjb2xvclxuXG4gIHJldHVybiAocmdiLnIgKiAyOTkgKyByZ2IuZyAqIDU4NyArIHJnYi5iICogMTE0KSAvIDEwMDBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsZW5kIChmZ0NvbG9yLCBiZ0NvbG9yKSB7XG4gIGlmICh0eXBlb2YgZmdDb2xvciAhPT0gJ3N0cmluZycgJiYgKCFmZ0NvbG9yIHx8IGZnQ29sb3IuciA9PT0gdm9pZCAwKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGEge3IsIGcsIGJbLCBhXX0gb2JqZWN0IGFzIGZnQ29sb3InKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBiZ0NvbG9yICE9PSAnc3RyaW5nJyAmJiAoIWJnQ29sb3IgfHwgYmdDb2xvci5yID09PSB2b2lkIDApKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYSB7ciwgZywgYlssIGFdfSBvYmplY3QgYXMgYmdDb2xvcicpXG4gIH1cblxuICBjb25zdFxuICAgIHJnYjEgPSB0eXBlb2YgZmdDb2xvciA9PT0gJ3N0cmluZycgPyB0ZXh0VG9SZ2IoZmdDb2xvcikgOiBmZ0NvbG9yLFxuICAgIHIxID0gcmdiMS5yIC8gMjU1LFxuICAgIGcxID0gcmdiMS5nIC8gMjU1LFxuICAgIGIxID0gcmdiMS5iIC8gMjU1LFxuICAgIGExID0gcmdiMS5hICE9PSB2b2lkIDAgPyByZ2IxLmEgLyAxMDAgOiAxLFxuICAgIHJnYjIgPSB0eXBlb2YgYmdDb2xvciA9PT0gJ3N0cmluZycgPyB0ZXh0VG9SZ2IoYmdDb2xvcikgOiBiZ0NvbG9yLFxuICAgIHIyID0gcmdiMi5yIC8gMjU1LFxuICAgIGcyID0gcmdiMi5nIC8gMjU1LFxuICAgIGIyID0gcmdiMi5iIC8gMjU1LFxuICAgIGEyID0gcmdiMi5hICE9PSB2b2lkIDAgPyByZ2IyLmEgLyAxMDAgOiAxLFxuICAgIGEgPSBhMSArIGEyICogKDEgLSBhMSksXG4gICAgciA9IE1hdGgucm91bmQoKChyMSAqIGExICsgcjIgKiBhMiAqICgxIC0gYTEpKSAvIGEpICogMjU1KSxcbiAgICBnID0gTWF0aC5yb3VuZCgoKGcxICogYTEgKyBnMiAqIGEyICogKDEgLSBhMSkpIC8gYSkgKiAyNTUpLFxuICAgIGIgPSBNYXRoLnJvdW5kKCgoYjEgKiBhMSArIGIyICogYTIgKiAoMSAtIGExKSkgLyBhKSAqIDI1NSlcblxuICBjb25zdCByZXQgPSB7IHIsIGcsIGIsIGE6IE1hdGgucm91bmQoYSAqIDEwMCkgfVxuICByZXR1cm4gdHlwZW9mIGZnQ29sb3IgPT09ICdzdHJpbmcnXG4gICAgPyByZ2JUb0hleChyZXQpXG4gICAgOiByZXRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZUFscGhhIChjb2xvciwgb2Zmc2V0KSB7XG4gIGlmICh0eXBlb2YgY29sb3IgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcgYXMgY29sb3InKVxuICB9XG5cbiAgaWYgKG9mZnNldCA9PT0gdm9pZCAwIHx8IG9mZnNldCA8IC0xIHx8IG9mZnNldCA+IDEpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBvZmZzZXQgdG8gYmUgYmV0d2VlbiAtMSBhbmQgMScpXG4gIH1cblxuICBjb25zdCB7IHIsIGcsIGIsIGEgfSA9IHRleHRUb1JnYihjb2xvcilcbiAgY29uc3QgYWxwaGEgPSBhICE9PSB2b2lkIDAgPyBhIC8gMTAwIDogMFxuXG4gIHJldHVybiByZ2JUb0hleCh7XG4gICAgciwgZywgYiwgYTogTWF0aC5yb3VuZChNYXRoLm1pbigxLCBNYXRoLm1heCgwLCBhbHBoYSArIG9mZnNldCkpICogMTAwKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFsZXR0ZUNvbG9yIChjb2xvck5hbWUpIHtcbiAgaWYgKHR5cGVvZiBjb2xvck5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcgYXMgY29sb3InKVxuICB9XG5cbiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIGVsLmNsYXNzTmFtZSA9IGB0ZXh0LSR7IGNvbG9yTmFtZSB9IGludmlzaWJsZSBmaXhlZCBuby1wb2ludGVyLWV2ZW50c2BcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbClcblxuICBjb25zdCByZXN1bHQgPSBnZXRDb21wdXRlZFN0eWxlKGVsKS5nZXRQcm9wZXJ0eVZhbHVlKCdjb2xvcicpXG5cbiAgZWwucmVtb3ZlKClcblxuICByZXR1cm4gcmdiVG9IZXgodGV4dFRvUmdiKHJlc3VsdCkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmdiVG9IZXgsXG4gIGhleFRvUmdiLFxuICBoc3ZUb1JnYixcbiAgcmdiVG9Ic3YsXG4gIHRleHRUb1JnYixcbiAgbGlnaHRlbixcbiAgbHVtaW5vc2l0eSxcbiAgYnJpZ2h0bmVzcyxcbiAgYmxlbmQsXG4gIGNoYW5nZUFscGhhLFxuICBnZXRQYWxldHRlQ29sb3Jcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xudmFyIGtpbmRPZiA9IChmdW5jdGlvbihjYWNoZSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odGhpbmcpIHtcbiAgICB2YXIgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xuICB9O1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmZ1bmN0aW9uIGtpbmRPZlRlc3QodHlwZSkge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gZnVuY3Rpb24gaXNLaW5kT2YodGhpbmcpIHtcbiAgICByZXR1cm4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZTtcbiAgfTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbCkge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHRoaW5nKSB7XG4gIHZhciBwYXR0ZXJuID0gJ1tvYmplY3QgRm9ybURhdGFdJztcbiAgcmV0dXJuIHRoaW5nICYmIChcbiAgICAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGEpIHx8XG4gICAgdG9TdHJpbmcuY2FsbCh0aGluZykgPT09IHBhdHRlcm4gfHxcbiAgICAoaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gcGF0dGVybilcbiAgKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci50cmltID8gc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICogQHJldHVybiB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmZ1bmN0aW9uIHN0cmlwQk9NKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKi9cblxuZnVuY3Rpb24gaW5oZXJpdHMoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZmlsdGVyXVxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiB0b0ZsYXRPYmplY3Qoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIpIHtcbiAgdmFyIHByb3BzO1xuICB2YXIgaTtcbiAgdmFyIHByb3A7XG4gIHZhciBtZXJnZWQgPSB7fTtcblxuICBkZXN0T2JqID0gZGVzdE9iaiB8fCB7fTtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICghbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59XG5cbi8qXG4gKiBkZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBjaGFyYWN0ZXJzIG9mIGEgc3BlY2lmaWVkIHN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICB2YXIgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0XG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gdG9BcnJheSh0aGluZykge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgdmFyIGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmIChpc1VuZGVmaW5lZChpKSkgcmV0dXJuIG51bGw7XG4gIHZhciBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbnZhciBpc1R5cGVkQXJyYXkgPSAoZnVuY3Rpb24oVHlwZWRBcnJheSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odGhpbmcpIHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW0sXG4gIHN0cmlwQk9NOiBzdHJpcEJPTSxcbiAgaW5oZXJpdHM6IGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3Q6IHRvRmxhdE9iamVjdCxcbiAga2luZE9mOiBraW5kT2YsXG4gIGtpbmRPZlRlc3Q6IGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoOiBlbmRzV2l0aCxcbiAgdG9BcnJheTogdG9BcnJheSxcbiAgaXNUeXBlZEFycmF5OiBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3Q6IGlzRmlsZUxpc3Rcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCwgb3B0aW9ucykge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZCxcbiAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQXhpb3NFcnJvcihtZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIEVycm9yLmNhbGwodGhpcyk7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gIGNvbmZpZyAmJiAodGhpcy5jb25maWcgPSBjb25maWcpO1xuICByZXF1ZXN0ICYmICh0aGlzLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgcmVzcG9uc2UgJiYgKHRoaXMucmVzcG9uc2UgPSByZXNwb25zZSk7XG59XG5cbnV0aWxzLmluaGVyaXRzKEF4aW9zRXJyb3IsIEVycm9yLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgc3RhdHVzOiB0aGlzLnJlc3BvbnNlICYmIHRoaXMucmVzcG9uc2Uuc3RhdHVzID8gdGhpcy5yZXNwb25zZS5zdGF0dXMgOiBudWxsXG4gICAgfTtcbiAgfVxufSk7XG5cbnZhciBwcm90b3R5cGUgPSBBeGlvc0Vycm9yLnByb3RvdHlwZTtcbnZhciBkZXNjcmlwdG9ycyA9IHt9O1xuXG5bXG4gICdFUlJfQkFEX09QVElPTl9WQUxVRScsXG4gICdFUlJfQkFEX09QVElPTicsXG4gICdFQ09OTkFCT1JURUQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VSUl9ORVRXT1JLJyxcbiAgJ0VSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMnLFxuICAnRVJSX0RFUFJFQ0FURUQnLFxuICAnRVJSX0JBRF9SRVNQT05TRScsXG4gICdFUlJfQkFEX1JFUVVFU1QnLFxuICAnRVJSX0NBTkNFTEVEJ1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbl0uZm9yRWFjaChmdW5jdGlvbihjb2RlKSB7XG4gIGRlc2NyaXB0b3JzW2NvZGVdID0ge3ZhbHVlOiBjb2RlfTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCAnaXNBeGlvc0Vycm9yJywge3ZhbHVlOiB0cnVlfSk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5BeGlvc0Vycm9yLmZyb20gPSBmdW5jdGlvbihlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpIHtcbiAgdmFyIGF4aW9zRXJyb3IgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG5cbiAgdXRpbHMudG9GbGF0T2JqZWN0KGVycm9yLCBheGlvc0Vycm9yLCBmdW5jdGlvbiBmaWx0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gRXJyb3IucHJvdG90eXBlO1xuICB9KTtcblxuICBBeGlvc0Vycm9yLmNhbGwoYXhpb3NFcnJvciwgZXJyb3IubWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XG5cbiAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcblxuICByZXR1cm4gYXhpb3NFcnJvcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3NFcnJvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNpbGVudEpTT05QYXJzaW5nOiB0cnVlLFxuICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcbiAgY2xhcmlmeVRpbWVvdXRFcnJvcjogZmFsc2Vcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgRm9ybURhdGEoKTtcblxuICB2YXIgc3RhY2sgPSBbXTtcblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMuaXNUeXBlZEFycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGQoZGF0YSwgcGFyZW50S2V5KSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoZGF0YSkgfHwgdXRpbHMuaXNBcnJheShkYXRhKSkge1xuICAgICAgaWYgKHN0YWNrLmluZGV4T2YoZGF0YSkgIT09IC0xKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhcmVudEtleSk7XG4gICAgICB9XG5cbiAgICAgIHN0YWNrLnB1c2goZGF0YSk7XG5cbiAgICAgIHV0aWxzLmZvckVhY2goZGF0YSwgZnVuY3Rpb24gZWFjaCh2YWx1ZSwga2V5KSB7XG4gICAgICAgIGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcbiAgICAgICAgdmFyIGZ1bGxLZXkgPSBwYXJlbnRLZXkgPyBwYXJlbnRLZXkgKyAnLicgKyBrZXkgOiBrZXk7XG4gICAgICAgIHZhciBhcnI7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmICFwYXJlbnRLZXkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgIXV0aWxzLmlzVW5kZWZpbmVkKGVsKSAmJiBmb3JtRGF0YS5hcHBlbmQoZnVsbEtleSwgY29udmVydFZhbHVlKGVsKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBidWlsZCh2YWx1ZSwgZnVsbEtleSk7XG4gICAgICB9KTtcblxuICAgICAgc3RhY2sucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChwYXJlbnRLZXksIGNvbnZlcnRWYWx1ZShkYXRhKSk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Gb3JtRGF0YTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEF4aW9zRXJyb3IgPSByZXF1aXJlKCcuL0F4aW9zRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIFtBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFXVtNYXRoLmZsb29yKHJlc3BvbnNlLnN0YXR1cyAvIDEwMCkgLSA0XSxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZCtcXC0uXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgdmFyIG9yaWdpblVSTDtcblxuICAgICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICAgIH1cblxuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvQXhpb3NFcnJvcicpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGVkRXJyb3IobWVzc2FnZSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgQXhpb3NFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UgPT0gbnVsbCA/ICdjYW5jZWxlZCcgOiBtZXNzYWdlLCBBeGlvc0Vycm9yLkVSUl9DQU5DRUxFRCk7XG4gIHRoaXMubmFtZSA9ICdDYW5jZWxlZEVycm9yJztcbn1cblxudXRpbHMuaW5oZXJpdHMoQ2FuY2VsZWRFcnJvciwgQXhpb3NFcnJvciwge1xuICBfX0NBTkNFTF9fOiB0cnVlXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxlZEVycm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIHZhciBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pKDo/XFwvXFwvfDopLy5leGVjKHVybCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi4vY29yZS9idWlsZEZ1bGxQYXRoJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciB0cmFuc2l0aW9uYWxEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzL3RyYW5zaXRpb25hbCcpO1xudmFyIEF4aW9zRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL0F4aW9zRXJyb3InKTtcbnZhciBDYW5jZWxlZEVycm9yID0gcmVxdWlyZSgnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3InKTtcbnZhciBwYXJzZVByb3RvY29sID0gcmVxdWlyZSgnLi4vaGVscGVycy9wYXJzZVByb3RvY29sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcbiAgICB2YXIgcmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICB2YXIgb25DYW5jZWxlZDtcbiAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgICBjb25maWcuY2FuY2VsVG9rZW4udW5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25maWcuc2lnbmFsKSB7XG4gICAgICAgIGNvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkgJiYgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgOiAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICBmdW5jdGlvbiBvbmxvYWRlbmQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhcmVzcG9uc2VUeXBlIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnIHx8ICByZXNwb25zZVR5cGUgPT09ICdqc29uJyA/XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShmdW5jdGlvbiBfcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgIC8vIFVzZSBvbmxvYWRlbmQgaWYgYXZhaWxhYmxlXG4gICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZSB0byBlbXVsYXRlIG9ubG9hZGVuZFxuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlYWR5c3RhdGUgaGFuZGxlciBpcyBjYWxsaW5nIGJlZm9yZSBvbmVycm9yIG9yIG9udGltZW91dCBoYW5kbGVycyxcbiAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGNhbGwgb25sb2FkZW5kIG9uIHRoZSBuZXh0ICd0aWNrJ1xuICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICB2YXIgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0ID8gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgICAgIHZhciB0cmFuc2l0aW9uYWwgPSBjb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSxcbiAgICAgICAgdHJhbnNpdGlvbmFsLmNsYXJpZnlUaW1lb3V0RXJyb3IgPyBBeGlvc0Vycm9yLkVUSU1FRE9VVCA6IEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihmdWxsUGF0aCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFjb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAocmVzcG9uc2VUeXBlICYmIHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbiB8fCBjb25maWcuc2lnbmFsKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgb25DYW5jZWxlZCA9IGZ1bmN0aW9uKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVqZWN0KCFjYW5jZWwgfHwgKGNhbmNlbCAmJiBjYW5jZWwudHlwZSkgPyBuZXcgQ2FuY2VsZWRFcnJvcigpIDogY2FuY2VsKTtcbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbiAmJiBjb25maWcuY2FuY2VsVG9rZW4uc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgaWYgKGNvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgY29uZmlnLnNpZ25hbC5hYm9ydGVkID8gb25DYW5jZWxlZCgpIDogY29uZmlnLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghcmVxdWVzdERhdGEpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKGZ1bGxQYXRoKTtcblxuICAgIGlmIChwcm90b2NvbCAmJiBbICdodHRwJywgJ2h0dHBzJywgJ2ZpbGUnIF0uaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JywgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIGNvbmZpZykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBzdHJpY3Rcbm1vZHVsZS5leHBvcnRzID0gbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvQXhpb3NFcnJvcicpO1xudmFyIHRyYW5zaXRpb25hbERlZmF1bHRzID0gcmVxdWlyZSgnLi90cmFuc2l0aW9uYWwnKTtcbnZhciB0b0Zvcm1EYXRhID0gcmVxdWlyZSgnLi4vaGVscGVycy90b0Zvcm1EYXRhJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4uL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlTYWZlbHkocmF3VmFsdWUsIHBhcnNlciwgZW5jb2Rlcikge1xuICBpZiAodXRpbHMuaXNTdHJpbmcocmF3VmFsdWUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIChwYXJzZXIgfHwgSlNPTi5wYXJzZSkocmF3VmFsdWUpO1xuICAgICAgcmV0dXJuIHV0aWxzLnRyaW0ocmF3VmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLm5hbWUgIT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gKGVuY29kZXIgfHwgSlNPTi5zdHJpbmdpZnkpKHJhd1ZhbHVlKTtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuXG4gIHRyYW5zaXRpb25hbDogdHJhbnNpdGlvbmFsRGVmYXVsdHMsXG5cbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgdmFyIGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzLmlzT2JqZWN0KGRhdGEpO1xuICAgIHZhciBjb250ZW50VHlwZSA9IGhlYWRlcnMgJiYgaGVhZGVyc1snQ29udGVudC1UeXBlJ107XG5cbiAgICB2YXIgaXNGaWxlTGlzdDtcblxuICAgIGlmICgoaXNGaWxlTGlzdCA9IHV0aWxzLmlzRmlsZUxpc3QoZGF0YSkpIHx8IChpc09iamVjdFBheWxvYWQgJiYgY29udGVudFR5cGUgPT09ICdtdWx0aXBhcnQvZm9ybS1kYXRhJykpIHtcbiAgICAgIHZhciBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcbiAgICAgIHJldHVybiB0b0Zvcm1EYXRhKGlzRmlsZUxpc3QgPyB7J2ZpbGVzW10nOiBkYXRhfSA6IGRhdGEsIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCkpO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3RQYXlsb2FkIHx8IGNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgcmV0dXJuIHN0cmluZ2lmeVNhZmVseShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgdmFyIHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICB2YXIgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgIHZhciBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgdmFyIHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcgfHwgKGZvcmNlZEpTT05QYXJzaW5nICYmIHV0aWxzLmlzU3RyaW5nKGRhdGEpICYmIGRhdGEubGVuZ3RoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChzdHJpY3RKU09OUGFyc2luZykge1xuICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsIHRoaXMsIG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICBlbnY6IHtcbiAgICBGb3JtRGF0YTogcmVxdWlyZSgnLi9lbnYvRm9ybURhdGEnKVxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgdmFyIGNvbnRleHQgPSB0aGlzIHx8IGRlZmF1bHRzO1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbnRleHQsIGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBDYW5jZWxlZEVycm9yID0gcmVxdWlyZSgnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3InKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcigpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNcbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgIGNvbmZpZyxcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEaXJlY3RLZXlzKHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBtZXJnZU1hcCA9IHtcbiAgICAndXJsJzogdmFsdWVGcm9tQ29uZmlnMixcbiAgICAnbWV0aG9kJzogdmFsdWVGcm9tQ29uZmlnMixcbiAgICAnZGF0YSc6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgJ2Jhc2VVUkwnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd0cmFuc2Zvcm1SZXF1ZXN0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndHJhbnNmb3JtUmVzcG9uc2UnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdwYXJhbXNTZXJpYWxpemVyJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndGltZW91dCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RpbWVvdXRNZXNzYWdlJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnd2l0aENyZWRlbnRpYWxzJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnYWRhcHRlcic6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3Jlc3BvbnNlVHlwZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3hzcmZDb29raWVOYW1lJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAneHNyZkhlYWRlck5hbWUnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdvblVwbG9hZFByb2dyZXNzJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnb25Eb3dubG9hZFByb2dyZXNzJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnZGVjb21wcmVzcyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ21heENvbnRlbnRMZW5ndGgnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdtYXhCb2R5TGVuZ3RoJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnYmVmb3JlUmVkaXJlY3QnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd0cmFuc3BvcnQnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdodHRwQWdlbnQnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdodHRwc0FnZW50JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnY2FuY2VsVG9rZW4nOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdzb2NrZXRQYXRoJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAncmVzcG9uc2VFbmNvZGluZyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3ZhbGlkYXRlU3RhdHVzJzogbWVyZ2VEaXJlY3RLZXlzXG4gIH07XG5cbiAgdXRpbHMuZm9yRWFjaChPYmplY3Qua2V5cyhjb25maWcxKS5jb25jYXQoT2JqZWN0LmtleXMoY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIHZhciBtZXJnZSA9IG1lcmdlTWFwW3Byb3BdIHx8IG1lcmdlRGVlcFByb3BlcnRpZXM7XG4gICAgdmFyIGNvbmZpZ1ZhbHVlID0gbWVyZ2UocHJvcCk7XG4gICAgKHV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZ1ZhbHVlKSAmJiBtZXJnZSAhPT0gbWVyZ2VEaXJlY3RLZXlzKSB8fCAoY29uZmlnW3Byb3BdID0gY29uZmlnVmFsdWUpO1xuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcInZlcnNpb25cIjogXCIwLjI3LjJcIlxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBWRVJTSU9OID0gcmVxdWlyZSgnLi4vZW52L2RhdGEnKS52ZXJzaW9uO1xudmFyIEF4aW9zRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL0F4aW9zRXJyb3InKTtcblxudmFyIHZhbGlkYXRvcnMgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblsnb2JqZWN0JywgJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2Z1bmN0aW9uJywgJ3N0cmluZycsICdzeW1ib2wnXS5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUsIGkpIHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbnZhciBkZXByZWNhdGVkV2FybmluZ3MgPSB7fTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uYWwgb3B0aW9uIHZhbGlkYXRvclxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMudHJhbnNpdGlvbmFsID0gZnVuY3Rpb24gdHJhbnNpdGlvbmFsKHZhbGlkYXRvciwgdmVyc2lvbiwgbWVzc2FnZSkge1xuICBmdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG9wdCwgZGVzYykge1xuICAgIHJldHVybiAnW0F4aW9zIHYnICsgVkVSU0lPTiArICddIFRyYW5zaXRpb25hbCBvcHRpb24gXFwnJyArIG9wdCArICdcXCcnICsgZGVzYyArIChtZXNzYWdlID8gJy4gJyArIG1lc3NhZ2UgOiAnJyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG9wdCwgb3B0cykge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgdmFyIG9wdCA9IGtleXNbaV07XG4gICAgdmFyIHZhbGlkYXRvciA9IHNjaGVtYVtvcHRdO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIHZhciB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIHZhciByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFzc2VydE9wdGlvbnM6IGFzc2VydE9wdGlvbnMsXG4gIHZhbGlkYXRvcnM6IHZhbGlkYXRvcnNcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4vYnVpbGRGdWxsUGF0aCcpO1xudmFyIHZhbGlkYXRvciA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvdmFsaWRhdG9yJyk7XG5cbnZhciB2YWxpZGF0b3JzID0gdmFsaWRhdG9yLnZhbGlkYXRvcnM7XG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnT3JVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWdPclVybCB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgaWYgKGNvbmZpZy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IHRoaXMuZGVmYXVsdHMubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnLm1ldGhvZCA9ICdnZXQnO1xuICB9XG5cbiAgdmFyIHRyYW5zaXRpb25hbCA9IGNvbmZpZy50cmFuc2l0aW9uYWw7XG5cbiAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnModHJhbnNpdGlvbmFsLCB7XG4gICAgICBzaWxlbnRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgIGZvcmNlZEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgY2xhcmlmeVRpbWVvdXRFcnJvcjogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKVxuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgdmFyIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluID0gW107XG4gIHZhciBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBpZiAodHlwZW9mIGludGVyY2VwdG9yLnJ1bldoZW4gPT09ICdmdW5jdGlvbicgJiYgaW50ZXJjZXB0b3IucnVuV2hlbihjb25maWcpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyAmJiBpbnRlcmNlcHRvci5zeW5jaHJvbm91cztcblxuICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHZhciByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdmFyIHByb21pc2U7XG5cbiAgaWYgKCFzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMpIHtcbiAgICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuXG4gICAgQXJyYXkucHJvdG90eXBlLnVuc2hpZnQuYXBwbHkoY2hhaW4sIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICBjaGFpbiA9IGNoYWluLmNvbmNhdChyZXNwb25zZUludGVyY2VwdG9yQ2hhaW4pO1xuXG4gICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuICAgIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuXG4gIHZhciBuZXdDb25maWcgPSBjb25maWc7XG4gIHdoaWxlIChyZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5sZW5ndGgpIHtcbiAgICB2YXIgb25GdWxmaWxsZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5zaGlmdCgpO1xuICAgIHZhciBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4uc2hpZnQoKTtcbiAgICB0cnkge1xuICAgICAgbmV3Q29uZmlnID0gb25GdWxmaWxsZWQobmV3Q29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgb25SZWplY3RlZChlcnJvcik7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB0cnkge1xuICAgIHByb21pc2UgPSBkaXNwYXRjaFJlcXVlc3QobmV3Q29uZmlnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICB9XG5cbiAgd2hpbGUgKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5zaGlmdCgpLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICByZXR1cm4gYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cblxuICBmdW5jdGlvbiBnZW5lcmF0ZUhUVFBNZXRob2QoaXNGb3JtKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGh0dHBNZXRob2QodXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBpc0Zvcm0gPyB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xuICAgICAgICB9IDoge30sXG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KSk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZCArICdGb3JtJ10gPSBnZW5lcmF0ZUhUVFBNZXRob2QodHJ1ZSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbGVkRXJyb3IgPSByZXF1aXJlKCcuL0NhbmNlbGVkRXJyb3InKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuXG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHRoaXMucHJvbWlzZS50aGVuKGZ1bmN0aW9uKGNhbmNlbCkge1xuICAgIGlmICghdG9rZW4uX2xpc3RlbmVycykgcmV0dXJuO1xuXG4gICAgdmFyIGk7XG4gICAgdmFyIGwgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRva2VuLl9saXN0ZW5lcnNbaV0oY2FuY2VsKTtcbiAgICB9XG4gICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gIH0pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHRoaXMucHJvbWlzZS50aGVuID0gZnVuY3Rpb24ob25mdWxmaWxsZWQpIHtcbiAgICB2YXIgX3Jlc29sdmU7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgIHRva2VuLnN1YnNjcmliZShyZXNvbHZlKTtcbiAgICAgIF9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcblxuICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gcmVqZWN0KCkge1xuICAgICAgdG9rZW4udW5zdWJzY3JpYmUoX3Jlc29sdmUpO1xuICAgIH07XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfTtcblxuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWxlZEVycm9yKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFN1YnNjcmliZSB0byB0aGUgY2FuY2VsIHNpZ25hbFxuICovXG5cbkNhbmNlbFRva2VuLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgbGlzdGVuZXIodGhpcy5yZWFzb24pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gW2xpc3RlbmVyXTtcbiAgfVxufTtcblxuLyoqXG4gKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBjYW5jZWwgc2lnbmFsXG4gKi9cblxuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdW5zdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuIHV0aWxzLmlzT2JqZWN0KHBheWxvYWQpICYmIChwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbGVkRXJyb3IgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxlZEVycm9yJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5heGlvcy5WRVJTSU9OID0gcmVxdWlyZSgnLi9lbnYvZGF0YScpLnZlcnNpb247XG5heGlvcy50b0Zvcm1EYXRhID0gcmVxdWlyZSgnLi9oZWxwZXJzL3RvRm9ybURhdGEnKTtcblxuLy8gRXhwb3NlIEF4aW9zRXJyb3IgY2xhc3NcbmF4aW9zLkF4aW9zRXJyb3IgPSByZXF1aXJlKCcuLi9saWIvY29yZS9BeGlvc0Vycm9yJyk7XG5cbi8vIGFsaWFzIGZvciBDYW5jZWxlZEVycm9yIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5heGlvcy5DYW5jZWwgPSBheGlvcy5DYW5jZWxlZEVycm9yO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSByZXF1aXJlKCcuL2hlbHBlcnMvaXNBeGlvc0Vycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsImltcG9ydCB7IGJvb3QgfSBmcm9tIFwicXVhc2FyL3dyYXBwZXJzXCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgY29yZSBmcm9tIFwiLi4vc2VydmljZXMvY29yZVwiO1xuaW1wb3J0IGFwaSBmcm9tIFwiLi4vc2VydmljZXMvYXBpXCI7XG5pbXBvcnQgeyBjb2xvcnMgfSBmcm9tIFwicXVhc2FyXCI7XG5cbi8vIFwiYXN5bmNcIiBpcyBvcHRpb25hbDtcbi8vIG1vcmUgaW5mbyBvbiBwYXJhbXM6IGh0dHBzOi8vdjIucXVhc2FyLmRldi9xdWFzYXItY2xpL2Jvb3QtZmlsZXNcbmV4cG9ydCBkZWZhdWx0IGJvb3QoYXN5bmMgKHsgYXBwLCBzdG9yZSB9KSA9PiB7XG4gIGNvbnNvbGUuY29yZShgTG9hZGluZyAke3Byb2Nlc3MuZW52LkFQUF9OQU1FfSBzZXJ2aWNlc2ApO1xuXG4gIC8vICAgIGFwcCBwcm90b3R5cGVzIHNldHVwICAgIC8vXG4gIGFwcC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4kY29yZSA9IGNvcmU7XG4gIGFwcC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4kYXBpID0gYXBpO1xuICBhcHAuY29uZmlnLmdsb2JhbFByb3BlcnRpZXMuJGNvbG9ycyA9IGNvbG9ycztcblxuICAvLyAgICBheGlvcyBzZXR1cCAgICAvL1xuICBheGlvcy5kZWZhdWx0cy5iYXNlVVJMID0gcHJvY2Vzcy5lbnYuQVBJX1VSTDtcbiAgYXhpb3MuZGVmYXVsdHMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblxuICAvLyAgICBjb3JlIHByb3RvdHlwZXMgc2V0dXAgICAgLy9cbiAgY29yZS4kYXhpb3MgPSBheGlvcztcbiAgY29yZS4kc3RvcmUgPSBzdG9yZTtcblxuICBjb25zb2xlLmNvcmUoXCJNb2RlOiBcIiArIHByb2Nlc3MuZW52LkFQUF9FTlYgfHwgXCJEZXZlbG9wbWVudFwiKTtcblxuICAvLyAgICBjYWxsIGFuZCB3YWl0IGZvciBpbml0aWFsIHNldHVwICAgIC8vXG4gIGF3YWl0IGNvcmUuaW5pdCgpO1xufSk7XG4iXSwibmFtZXMiOlsiYmluZCIsInJlcXVpcmUkJDAiLCJwcm90b3R5cGUiLCJkZXNjcmlwdG9ycyIsInV0aWxzIiwiYnVpbGRVUkwiLCJJbnRlcmNlcHRvck1hbmFnZXIiLCJmb3JFYWNoIiwibm9ybWFsaXplSGVhZGVyTmFtZSIsIkF4aW9zRXJyb3IiLCJyZXF1ZXN0IiwidG9Gb3JtRGF0YSIsImRhdGEiLCJzZXR0bGUiLCJ2YWxpZGF0ZVN0YXR1cyIsImNvb2tpZXMiLCJpc0Fic29sdXRlVVJMIiwiY29tYmluZVVSTHMiLCJyZXF1aXJlJCQxIiwiYnVpbGRGdWxsUGF0aCIsInBhcnNlSGVhZGVycyIsImlzVVJMU2FtZU9yaWdpbiIsInN0YW5kYXJkQnJvd3NlckVudiIsIm5vblN0YW5kYXJkQnJvd3NlckVudiIsIkNhbmNlbGVkRXJyb3IiLCJwYXJzZVByb3RvY29sIiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJyZXF1aXJlJCQ0IiwicmVxdWlyZSQkNSIsInJlcXVpcmUkJDYiLCJ0cmFuc2l0aW9uYWxEZWZhdWx0cyIsInJlcXVpcmUkJDciLCJyZXF1aXJlJCQ4IiwicmVxdWlyZSQkOSIsInJlcXVpcmUkJDEwIiwidHJhbnNpdGlvbmFsIiwiZGVmYXVsdHMiLCJpc0ZpbGVMaXN0IiwidHJhbnNmb3JtRGF0YSIsImlzQ2FuY2VsIiwiZGlzcGF0Y2hSZXF1ZXN0IiwibWVyZ2VDb25maWciLCJzb3VyY2UiLCJtZXJnZSIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0b3IiLCJBeGlvcyIsImZvckVhY2hNZXRob2ROb0RhdGEiLCJmb3JFYWNoTWV0aG9kV2l0aERhdGEiLCJzcHJlYWQiLCJpc0F4aW9zRXJyb3IiLCJheGlvcyIsInJlcXVpcmUkJDExIiwicmVxdWlyZSQkMTIiLCJheGlvc01vZHVsZSIsImF4aW9zXzEiLCJhcHAiLCJhcGkiXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sU0FBUztBQUVSLFNBQVMsU0FBVSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUMsR0FBSTtBQUN4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
