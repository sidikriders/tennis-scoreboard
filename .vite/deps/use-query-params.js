import {
  require_react
} from "./chunk-3VDXVL42.js";
import {
  __toESM
} from "./chunk-5WRI5ZAA.js";

// node_modules/serialize-query-params/dist/withDefault.js
function withDefault(param, defaultValue, includeNull = true) {
  const decodeWithDefault = (...args) => {
    const decodedValue = param.decode(...args);
    if (decodedValue === void 0) {
      return defaultValue;
    }
    if (includeNull) {
      if (decodedValue === null) {
        return defaultValue;
      } else {
        return decodedValue;
      }
    }
    return decodedValue;
  };
  return { ...param, default: defaultValue, decode: decodeWithDefault };
}

// node_modules/serialize-query-params/dist/serialize.js
function getEncodedValue(input, allowEmptyString) {
  if (input == null) {
    return input;
  }
  if (input.length === 0 && (!allowEmptyString || allowEmptyString && input !== "")) {
    return null;
  }
  const str = input instanceof Array ? input[0] : input;
  if (str == null) {
    return str;
  }
  if (!allowEmptyString && str === "") {
    return null;
  }
  return str;
}
function getEncodedValueArray(input) {
  if (input == null) {
    return input;
  }
  return input instanceof Array ? input : input === "" ? [] : [input];
}
function encodeDate(date) {
  if (date == null) {
    return date;
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}
function decodeDate(input) {
  const dateString = getEncodedValue(input);
  if (dateString == null)
    return dateString;
  const parts = dateString.split("-");
  if (parts[1] != null) {
    parts[1] -= 1;
  } else {
    parts[1] = 0;
    parts[2] = 1;
  }
  const decoded = new Date(...parts);
  if (isNaN(decoded.getTime())) {
    return null;
  }
  return decoded;
}
function encodeDateTime(date) {
  if (date == null) {
    return date;
  }
  return date.toISOString();
}
function decodeDateTime(input) {
  const dateString = getEncodedValue(input);
  if (dateString == null)
    return dateString;
  const decoded = new Date(dateString);
  if (isNaN(decoded.getTime())) {
    return null;
  }
  return decoded;
}
function encodeBoolean(bool) {
  if (bool == null) {
    return bool;
  }
  return bool ? "1" : "0";
}
function decodeBoolean(input) {
  const boolStr = getEncodedValue(input);
  if (boolStr == null)
    return boolStr;
  if (boolStr === "1") {
    return true;
  } else if (boolStr === "0") {
    return false;
  }
  return null;
}
function encodeNumber(num) {
  if (num == null) {
    return num;
  }
  return String(num);
}
function decodeNumber(input) {
  const numStr = getEncodedValue(input);
  if (numStr == null)
    return numStr;
  if (numStr === "")
    return null;
  const result = +numStr;
  return result;
}
function encodeString(str) {
  if (str == null) {
    return str;
  }
  return String(str);
}
function decodeString(input) {
  const str = getEncodedValue(input, true);
  if (str == null)
    return str;
  return String(str);
}
function decodeEnum(input, enumValues) {
  const str = decodeString(input);
  if (str == null)
    return str;
  return enumValues.includes(str) ? str : void 0;
}
function decodeArrayEnum(input, enumValues) {
  const arr = decodeArray(input);
  if (arr == null)
    return arr;
  if (!arr.length)
    return void 0;
  return arr.every((str) => str != null && enumValues.includes(str)) ? arr : void 0;
}
function decodeDelimitedArrayEnum(input, enumValues, entrySeparator = "_") {
  if (input != null && Array.isArray(input) && !input.length)
    return void 0;
  const arr = decodeDelimitedArray(input, entrySeparator);
  return decodeArrayEnum(arr, enumValues);
}
function encodeJson(any) {
  if (any == null) {
    return any;
  }
  return JSON.stringify(any);
}
function decodeJson(input) {
  const jsonStr = getEncodedValue(input);
  if (jsonStr == null)
    return jsonStr;
  let result = null;
  try {
    result = JSON.parse(jsonStr);
  } catch (e) {
  }
  return result;
}
function encodeArray(array) {
  if (array == null) {
    return array;
  }
  return array;
}
function decodeArray(input) {
  const arr = getEncodedValueArray(input);
  if (arr == null)
    return arr;
  return arr;
}
function encodeNumericArray(array) {
  if (array == null) {
    return array;
  }
  return array.map(String);
}
function decodeNumericArray(input) {
  const arr = decodeArray(input);
  if (arr == null)
    return arr;
  return arr.map((d) => d === "" || d == null ? null : +d);
}
function encodeDelimitedArray(array, entrySeparator = "_") {
  if (array == null) {
    return array;
  }
  return array.join(entrySeparator);
}
function decodeDelimitedArray(input, entrySeparator = "_") {
  const arrayStr = getEncodedValue(input, true);
  if (arrayStr == null)
    return arrayStr;
  if (arrayStr === "")
    return [];
  return arrayStr.split(entrySeparator);
}
var encodeDelimitedNumericArray = encodeDelimitedArray;
function decodeDelimitedNumericArray(arrayStr, entrySeparator = "_") {
  const decoded = decodeDelimitedArray(arrayStr, entrySeparator);
  if (decoded == null)
    return decoded;
  return decoded.map((d) => d === "" || d == null ? null : +d);
}
function encodeObject(obj, keyValSeparator = "-", entrySeparator = "_") {
  if (obj == null)
    return obj;
  if (!Object.keys(obj).length)
    return "";
  return Object.keys(obj).map((key) => `${key}${keyValSeparator}${obj[key]}`).join(entrySeparator);
}
function decodeObject(input, keyValSeparator = "-", entrySeparator = "_") {
  const objStr = getEncodedValue(input, true);
  if (objStr == null)
    return objStr;
  if (objStr === "")
    return {};
  const obj = {};
  const keyValSeparatorRegExp = new RegExp(`${keyValSeparator}(.*)`);
  objStr.split(entrySeparator).forEach((entryStr) => {
    const [key, value] = entryStr.split(keyValSeparatorRegExp);
    obj[key] = value;
  });
  return obj;
}
var encodeNumericObject = encodeObject;
function decodeNumericObject(input, keyValSeparator = "-", entrySeparator = "_") {
  const decoded = decodeObject(
    input,
    keyValSeparator,
    entrySeparator
  );
  if (decoded == null)
    return decoded;
  const decodedNumberObj = {};
  for (const key of Object.keys(decoded)) {
    decodedNumberObj[key] = decodeNumber(decoded[key]);
  }
  return decodedNumberObj;
}

// node_modules/serialize-query-params/dist/params.js
var StringParam = {
  encode: encodeString,
  decode: decodeString
};
var createEnumParam = (enumValues) => ({
  encode: encodeString,
  decode: (input) => decodeEnum(input, enumValues)
});
var createEnumArrayParam = (enumValues) => ({
  encode: (text) => encodeArray(text == null || Array.isArray(text) ? text : [text]),
  decode: (input) => decodeArrayEnum(input, enumValues)
});
var createEnumDelimitedArrayParam = (enumValues, entrySeparator = "_") => ({
  encode: (text) => encodeDelimitedArray(
    text == null || Array.isArray(text) ? text : [text],
    entrySeparator
  ),
  decode: (input) => decodeDelimitedArrayEnum(input, enumValues, entrySeparator)
});
var NumberParam = {
  encode: encodeNumber,
  decode: decodeNumber
};
var ObjectParam = {
  encode: encodeObject,
  decode: decodeObject
};
var ArrayParam = {
  encode: encodeArray,
  decode: decodeArray
};
var NumericArrayParam = {
  encode: encodeNumericArray,
  decode: decodeNumericArray
};
var JsonParam = {
  encode: encodeJson,
  decode: decodeJson
};
var DateParam = {
  encode: encodeDate,
  decode: decodeDate,
  equals: (valueA, valueB) => {
    if (valueA === valueB)
      return true;
    if (valueA == null || valueB == null)
      return valueA === valueB;
    return valueA.getFullYear() === valueB.getFullYear() && valueA.getMonth() === valueB.getMonth() && valueA.getDate() === valueB.getDate();
  }
};
var DateTimeParam = {
  encode: encodeDateTime,
  decode: decodeDateTime,
  equals: (valueA, valueB) => {
    if (valueA === valueB)
      return true;
    if (valueA == null || valueB == null)
      return valueA === valueB;
    return valueA.valueOf() === valueB.valueOf();
  }
};
var BooleanParam = {
  encode: encodeBoolean,
  decode: decodeBoolean
};
var NumericObjectParam = {
  encode: encodeNumericObject,
  decode: decodeNumericObject
};
var DelimitedArrayParam = {
  encode: encodeDelimitedArray,
  decode: decodeDelimitedArray
};
var DelimitedNumericArrayParam = {
  encode: encodeDelimitedNumericArray,
  decode: decodeDelimitedNumericArray
};

// node_modules/serialize-query-params/dist/objectToSearchString.js
function objectToSearchString(encodedParams) {
  const params = new URLSearchParams();
  const entries = Object.entries(encodedParams);
  for (const [key, value] of entries) {
    if (value === void 0)
      continue;
    if (value === null)
      continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, item != null ? item : "");
      }
    } else {
      params.append(key, value);
    }
  }
  return params.toString();
}

// node_modules/serialize-query-params/dist/updateLocation.js
var JSON_SAFE_CHARS = `{}[],":`.split("").map((d) => [d, encodeURIComponent(d)]);
function getHrefFromLocation(location, search) {
  let href = search;
  if (location.href) {
    try {
      const url = new URL(location.href);
      href = `${url.origin}${url.pathname}${search}`;
    } catch (e) {
      href = "";
    }
  }
  return href;
}
function transformSearchStringJsonSafe(searchString) {
  let str = searchString;
  for (let [char, code] of JSON_SAFE_CHARS) {
    str = str.replace(new RegExp("\\" + code, "g"), char);
  }
  return str;
}
function updateLocation(encodedQuery, location, objectToSearchStringFn = objectToSearchString) {
  let encodedSearchString = objectToSearchStringFn(encodedQuery);
  const search = encodedSearchString.length ? `?${encodedSearchString}` : "";
  const newLocation = {
    ...location,
    key: `${Date.now()}`,
    href: getHrefFromLocation(location, search),
    search,
    query: encodedQuery
  };
  return newLocation;
}
function updateInLocation(encodedQueryReplacements, location, objectToSearchStringFn = objectToSearchString, searchStringToObjectFn = searchStringToObject) {
  const currQuery = searchStringToObjectFn(location.search);
  const newQuery = {
    ...currQuery,
    ...encodedQueryReplacements
  };
  return updateLocation(newQuery, location, objectToSearchStringFn);
}

// node_modules/serialize-query-params/dist/encodeQueryParams.js
function encodeQueryParams(paramConfigMap, query) {
  const encodedQuery = {};
  const paramNames = Object.keys(query);
  for (const paramName of paramNames) {
    const decodedValue = query[paramName];
    if (!paramConfigMap[paramName]) {
      encodedQuery[paramName] = decodedValue == null ? decodedValue : String(decodedValue);
    } else {
      encodedQuery[paramName] = paramConfigMap[paramName].encode(query[paramName]);
    }
  }
  return encodedQuery;
}

// node_modules/serialize-query-params/dist/decodeQueryParams.js
function decodeQueryParams(paramConfigMap, encodedQuery) {
  const decodedQuery = {};
  const paramNames = Object.keys(paramConfigMap);
  for (const encodedKey of Object.keys(encodedQuery)) {
    if (paramConfigMap[encodedKey] == null) {
      paramNames.push(encodedKey);
    }
  }
  for (const paramName of paramNames) {
    const encodedValue = encodedQuery[paramName];
    if (!paramConfigMap[paramName]) {
      if (true) {
        console.warn(
          `Passing through parameter ${paramName} during decoding since it was not configured.`
        );
      }
      decodedQuery[paramName] = encodedValue;
    } else {
      decodedQuery[paramName] = paramConfigMap[paramName].decode(encodedValue);
    }
  }
  return decodedQuery;
}

// node_modules/serialize-query-params/dist/searchStringToObject.js
function searchStringToObject(searchString) {
  const params = new URLSearchParams(searchString);
  const parsed = {};
  for (let [key, value] of params) {
    if (Object.prototype.hasOwnProperty.call(parsed, key)) {
      if (Array.isArray(parsed[key])) {
        parsed[key].push(value);
      } else {
        parsed[key] = [parsed[key], value];
      }
    } else {
      parsed[key] = value;
    }
  }
  return parsed;
}

// node_modules/use-query-params/dist/useQueryParam.js
var import_react2 = __toESM(require_react());

// node_modules/use-query-params/dist/useQueryParams.js
var import_react = __toESM(require_react());

// node_modules/use-query-params/dist/decodedParamCache.js
var DecodedParamCache = class {
  constructor() {
    this.paramsMap = /* @__PURE__ */ new Map();
    this.registeredParams = /* @__PURE__ */ new Map();
  }
  set(param, stringifiedValue, decodedValue, decode) {
    this.paramsMap.set(param, {
      stringified: stringifiedValue,
      decoded: decodedValue,
      decode
    });
  }
  has(param, stringifiedValue, decode) {
    if (!this.paramsMap.has(param))
      return false;
    const cachedParam = this.paramsMap.get(param);
    if (!cachedParam)
      return false;
    return cachedParam.stringified === stringifiedValue && (decode == null || cachedParam.decode === decode);
  }
  get(param) {
    var _a;
    if (this.paramsMap.has(param))
      return (_a = this.paramsMap.get(param)) == null ? void 0 : _a.decoded;
    return void 0;
  }
  registerParams(paramNames) {
    for (const param of paramNames) {
      const currValue = this.registeredParams.get(param) || 0;
      this.registeredParams.set(param, currValue + 1);
    }
  }
  unregisterParams(paramNames) {
    for (const param of paramNames) {
      const value = (this.registeredParams.get(param) || 0) - 1;
      if (value <= 0) {
        this.registeredParams.delete(param);
        if (this.paramsMap.has(param)) {
          this.paramsMap.delete(param);
        }
      } else {
        this.registeredParams.set(param, value);
      }
    }
  }
  clear() {
    this.paramsMap.clear();
    this.registeredParams.clear();
  }
};
var decodedParamCache = new DecodedParamCache();

// node_modules/use-query-params/dist/inheritedParams.js
function convertInheritedParamStringsToParams(paramConfigMapWithInherit, options) {
  var _a, _b, _c;
  const paramConfigMap = {};
  let hasInherit = false;
  const hookKeys = Object.keys(paramConfigMapWithInherit);
  let paramKeys = hookKeys;
  const includeKnownParams = options.includeKnownParams || options.includeKnownParams !== false && hookKeys.length === 0;
  if (includeKnownParams) {
    const knownKeys = Object.keys((_a = options.params) != null ? _a : {});
    paramKeys.push(...knownKeys);
  }
  for (const key of paramKeys) {
    const param = paramConfigMapWithInherit[key];
    if (param != null && typeof param === "object") {
      paramConfigMap[key] = param;
      continue;
    }
    hasInherit = true;
    paramConfigMap[key] = (_c = (_b = options.params) == null ? void 0 : _b[key]) != null ? _c : StringParam;
  }
  if (!hasInherit)
    return paramConfigMapWithInherit;
  return paramConfigMap;
}
function extendParamConfigForKeys(baseParamConfigMap, paramKeys, inheritedParams, defaultParam) {
  var _a;
  if (!inheritedParams || !paramKeys.length)
    return baseParamConfigMap;
  let paramConfigMap = { ...baseParamConfigMap };
  let hasInherit = false;
  for (const paramKey of paramKeys) {
    if (!Object.prototype.hasOwnProperty.call(paramConfigMap, paramKey)) {
      paramConfigMap[paramKey] = (_a = inheritedParams[paramKey]) != null ? _a : defaultParam;
      hasInherit = true;
    }
  }
  if (!hasInherit)
    return baseParamConfigMap;
  return paramConfigMap;
}

// node_modules/use-query-params/dist/shallowEqual.js
var hasOwnProperty = Object.prototype.hasOwnProperty;
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function shallowEqual(objA, objB, equalMap) {
  var _a, _b;
  if (is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    const isEqual = (_b = (_a = equalMap == null ? void 0 : equalMap[keysA[i]]) == null ? void 0 : _a.equals) != null ? _b : is;
    if (!hasOwnProperty.call(objB, keysA[i]) || !isEqual(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}

// node_modules/use-query-params/dist/latestValues.js
function getLatestDecodedValues(parsedParams, paramConfigMap, decodedParamCache2) {
  const decodedValues = {};
  const paramNames = Object.keys(paramConfigMap);
  for (const paramName of paramNames) {
    const paramConfig = paramConfigMap[paramName];
    const encodedValue = parsedParams[paramName];
    let decodedValue;
    if (decodedParamCache2.has(paramName, encodedValue, paramConfig.decode)) {
      decodedValue = decodedParamCache2.get(paramName);
    } else {
      decodedValue = paramConfig.decode(encodedValue);
      if (paramConfig.equals && decodedParamCache2.has(paramName, encodedValue)) {
        const oldDecodedValue = decodedParamCache2.get(paramName);
        if (paramConfig.equals(decodedValue, oldDecodedValue)) {
          decodedValue = oldDecodedValue;
        }
      }
      if (decodedValue !== void 0) {
        decodedParamCache2.set(
          paramName,
          encodedValue,
          decodedValue,
          paramConfig.decode
        );
      }
    }
    if (decodedValue === void 0 && paramConfig.default !== void 0) {
      decodedValue = paramConfig.default;
    }
    decodedValues[paramName] = decodedValue;
  }
  return decodedValues;
}
function makeStableGetLatestDecodedValues() {
  let prevDecodedValues;
  function stableGetLatest(parsedParams, paramConfigMap, decodedParamCache2) {
    const decodedValues = getLatestDecodedValues(
      parsedParams,
      paramConfigMap,
      decodedParamCache2
    );
    if (prevDecodedValues != null && shallowEqual(prevDecodedValues, decodedValues)) {
      return prevDecodedValues;
    }
    prevDecodedValues = decodedValues;
    return decodedValues;
  }
  return stableGetLatest;
}

// node_modules/use-query-params/dist/urlName.js
function serializeUrlNameMap(paramConfigMap) {
  let urlNameMapParts;
  for (const paramName in paramConfigMap) {
    if (paramConfigMap[paramName].urlName) {
      const urlName = paramConfigMap[paramName].urlName;
      const part = `${urlName}\0${paramName}`;
      if (!urlNameMapParts)
        urlNameMapParts = [part];
      else
        urlNameMapParts.push(part);
    }
  }
  return urlNameMapParts ? urlNameMapParts.join("\n") : void 0;
}
function deserializeUrlNameMap(urlNameMapStr) {
  if (!urlNameMapStr)
    return void 0;
  return Object.fromEntries(
    urlNameMapStr.split("\n").map((part) => part.split("\0"))
  );
}
function applyUrlNames(encodedValues, paramConfigMap) {
  var _a;
  let newEncodedValues = {};
  for (const paramName in encodedValues) {
    if (((_a = paramConfigMap[paramName]) == null ? void 0 : _a.urlName) != null) {
      newEncodedValues[paramConfigMap[paramName].urlName] = encodedValues[paramName];
    } else {
      newEncodedValues[paramName] = encodedValues[paramName];
    }
  }
  return newEncodedValues;
}

// node_modules/use-query-params/dist/memoSearchStringToObject.js
var cachedSearchString;
var cachedUrlNameMapString;
var cachedSearchStringToObjectFn;
var cachedParsedQuery = {};
var memoSearchStringToObject = (searchStringToObject2, searchString, urlNameMapStr) => {
  if (cachedSearchString === searchString && cachedSearchStringToObjectFn === searchStringToObject2 && cachedUrlNameMapString === urlNameMapStr) {
    return cachedParsedQuery;
  }
  cachedSearchString = searchString;
  cachedSearchStringToObjectFn = searchStringToObject2;
  const newParsedQuery = searchStringToObject2(searchString != null ? searchString : "");
  cachedUrlNameMapString = urlNameMapStr;
  const urlNameMap = deserializeUrlNameMap(urlNameMapStr);
  for (let [key, value] of Object.entries(newParsedQuery)) {
    if (urlNameMap == null ? void 0 : urlNameMap[key]) {
      delete newParsedQuery[key];
      key = urlNameMap[key];
      newParsedQuery[key] = value;
    }
    const oldValue = cachedParsedQuery[key];
    if (shallowEqual(value, oldValue)) {
      newParsedQuery[key] = oldValue;
    }
  }
  cachedParsedQuery = newParsedQuery;
  return newParsedQuery;
};

// node_modules/use-query-params/dist/options.js
var defaultOptions = {
  searchStringToObject,
  objectToSearchString,
  updateType: "pushIn",
  includeKnownParams: void 0,
  includeAllParams: false,
  removeDefaultsFromUrl: false,
  enableBatching: false,
  skipUpdateWhenNoChange: true
};
function mergeOptions(parentOptions, currOptions) {
  if (currOptions == null) {
    currOptions = {};
  }
  const merged = { ...parentOptions, ...currOptions };
  if (currOptions.params && parentOptions.params) {
    merged.params = { ...parentOptions.params, ...currOptions.params };
  }
  return merged;
}

// node_modules/use-query-params/dist/QueryParamProvider.js
var React = __toESM(require_react());
var providerlessContextValue = {
  adapter: {},
  options: defaultOptions
};
var QueryParamContext = React.createContext(
  providerlessContextValue
);
function useQueryParamContext() {
  const value = React.useContext(QueryParamContext);
  if (value === void 0 || value === providerlessContextValue) {
    throw new Error("useQueryParams must be used within a QueryParamProvider");
  }
  return value;
}
function QueryParamProviderInner({
  children,
  adapter,
  options
}) {
  const { adapter: parentAdapter, options: parentOptions } = React.useContext(QueryParamContext);
  const value = React.useMemo(() => {
    return {
      adapter: adapter != null ? adapter : parentAdapter,
      options: mergeOptions(
        parentOptions,
        options
      )
    };
  }, [adapter, options, parentAdapter, parentOptions]);
  return React.createElement(QueryParamContext.Provider, {
    value
  }, children);
}
function QueryParamProvider({
  children,
  adapter,
  options
}) {
  const Adapter = adapter;
  return Adapter ? React.createElement(Adapter, null, (adapter2) => React.createElement(QueryParamProviderInner, {
    adapter: adapter2,
    options
  }, children)) : React.createElement(QueryParamProviderInner, {
    options
  }, children);
}

// node_modules/use-query-params/dist/removeDefaults.js
function removeDefaults(encodedValues, paramConfigMap) {
  var _a;
  for (const paramName in encodedValues) {
    if (((_a = paramConfigMap[paramName]) == null ? void 0 : _a.default) !== void 0 && encodedValues[paramName] !== void 0) {
      const encodedDefault = paramConfigMap[paramName].encode(
        paramConfigMap[paramName].default
      );
      if (encodedDefault === encodedValues[paramName]) {
        encodedValues[paramName] = void 0;
      }
    }
  }
}

// node_modules/use-query-params/dist/updateSearchString.js
function getUpdatedSearchString({
  changes,
  updateType,
  currentSearchString,
  paramConfigMap: baseParamConfigMap,
  options
}) {
  const { searchStringToObject: searchStringToObject2, objectToSearchString: objectToSearchString2 } = options;
  if (updateType == null)
    updateType = options.updateType;
  let encodedChanges;
  const parsedParams = memoSearchStringToObject(
    searchStringToObject2,
    currentSearchString
  );
  const paramConfigMap = extendParamConfigForKeys(
    baseParamConfigMap,
    Object.keys(changes),
    options.params
  );
  let changesToUse;
  if (typeof changes === "function") {
    const latestValues = getLatestDecodedValues(
      parsedParams,
      paramConfigMap,
      decodedParamCache
    );
    changesToUse = changes(latestValues);
  } else {
    changesToUse = changes;
  }
  encodedChanges = encodeQueryParams(paramConfigMap, changesToUse);
  if (options.removeDefaultsFromUrl) {
    removeDefaults(encodedChanges, paramConfigMap);
  }
  encodedChanges = applyUrlNames(encodedChanges, paramConfigMap);
  let newSearchString;
  if (updateType === "push" || updateType === "replace") {
    newSearchString = objectToSearchString2(encodedChanges);
  } else {
    newSearchString = objectToSearchString2({
      ...parsedParams,
      ...encodedChanges
    });
  }
  if ((newSearchString == null ? void 0 : newSearchString.length) && newSearchString[0] !== "?") {
    newSearchString = `?${newSearchString}`;
  }
  return newSearchString != null ? newSearchString : "";
}
function updateSearchString({
  searchString,
  adapter,
  navigate,
  updateType
}) {
  const currentLocation = adapter.location;
  const newLocation = {
    ...currentLocation,
    search: searchString
  };
  if (navigate) {
    if (typeof updateType === "string" && updateType.startsWith("replace")) {
      adapter.replace(newLocation);
    } else {
      adapter.push(newLocation);
    }
  }
}
var immediateTask = (task) => task();
var timeoutTask = (task) => setTimeout(() => task(), 0);
var updateQueue = [];
function enqueueUpdate(args, { immediate } = {}) {
  updateQueue.push(args);
  let scheduleTask = immediate ? immediateTask : timeoutTask;
  if (updateQueue.length === 1) {
    scheduleTask(() => {
      const updates = updateQueue.slice();
      updateQueue.length = 0;
      const initialSearchString = updates[0].currentSearchString;
      let searchString;
      for (let i = 0; i < updates.length; ++i) {
        const modifiedUpdate = i === 0 ? updates[i] : { ...updates[i], currentSearchString: searchString };
        searchString = getUpdatedSearchString(modifiedUpdate);
      }
      if (args.options.skipUpdateWhenNoChange && searchString === initialSearchString) {
        return;
      }
      updateSearchString({
        searchString: searchString != null ? searchString : "",
        adapter: updates[updates.length - 1].adapter,
        navigate: true,
        updateType: updates[updates.length - 1].updateType
      });
    });
  }
}

// node_modules/use-query-params/dist/useQueryParams.js
function useQueryParams(arg1, arg2) {
  const { adapter, options: contextOptions } = useQueryParamContext();
  const [stableGetLatest] = (0, import_react.useState)(makeStableGetLatestDecodedValues);
  const { paramConfigMap: paramConfigMapWithInherit, options } = parseArguments(
    arg1,
    arg2
  );
  const mergedOptions = (0, import_react.useMemo)(() => {
    return mergeOptions(contextOptions, options);
  }, [contextOptions, options]);
  let paramConfigMap = convertInheritedParamStringsToParams(
    paramConfigMapWithInherit,
    mergedOptions
  );
  const parsedParams = memoSearchStringToObject(
    mergedOptions.searchStringToObject,
    adapter.location.search,
    serializeUrlNameMap(paramConfigMap)
  );
  if (mergedOptions.includeAllParams) {
    paramConfigMap = extendParamConfigForKeys(
      paramConfigMap,
      Object.keys(parsedParams),
      mergedOptions.params,
      StringParam
    );
  }
  const decodedValues = stableGetLatest(
    parsedParams,
    paramConfigMap,
    decodedParamCache
  );
  const paramKeyString = Object.keys(paramConfigMap).join("\0");
  (0, import_react.useEffect)(() => {
    const paramNames = paramKeyString.split("\0");
    decodedParamCache.registerParams(paramNames);
    return () => {
      decodedParamCache.unregisterParams(paramNames);
    };
  }, [paramKeyString]);
  const callbackDependencies = {
    adapter,
    paramConfigMap,
    options: mergedOptions
  };
  const callbackDependenciesRef = (0, import_react.useRef)(callbackDependencies);
  if (callbackDependenciesRef.current == null) {
    callbackDependenciesRef.current = callbackDependencies;
  }
  (0, import_react.useEffect)(() => {
    callbackDependenciesRef.current.adapter = adapter;
    callbackDependenciesRef.current.paramConfigMap = paramConfigMap;
    callbackDependenciesRef.current.options = mergedOptions;
  }, [adapter, paramConfigMap, mergedOptions]);
  const [setQuery] = (0, import_react.useState)(() => {
    const setQuery2 = (changes, updateType) => {
      const { adapter: adapter2, paramConfigMap: paramConfigMap2, options: options2 } = callbackDependenciesRef.current;
      if (updateType == null)
        updateType = options2.updateType;
      enqueueUpdate(
        {
          changes,
          updateType,
          currentSearchString: adapter2.location.search,
          paramConfigMap: paramConfigMap2,
          options: options2,
          adapter: adapter2
        },
        { immediate: !options2.enableBatching }
      );
    };
    return setQuery2;
  });
  return [decodedValues, setQuery];
}
var useQueryParams_default = useQueryParams;
function parseArguments(arg1, arg2) {
  let paramConfigMap;
  let options;
  if (arg1 === void 0) {
    paramConfigMap = {};
    options = arg2;
  } else if (Array.isArray(arg1)) {
    paramConfigMap = Object.fromEntries(
      arg1.map((key) => [key, "inherit"])
    );
    options = arg2;
  } else {
    paramConfigMap = arg1;
    options = arg2;
  }
  return { paramConfigMap, options };
}

// node_modules/use-query-params/dist/useQueryParam.js
var useQueryParam = (name, paramConfig, options) => {
  const paramConfigMap = (0, import_react2.useMemo)(
    () => ({ [name]: paramConfig != null ? paramConfig : "inherit" }),
    [name, paramConfig]
  );
  const [query, setQuery] = useQueryParams_default(paramConfigMap, options);
  const decodedValue = query[name];
  const setValue = (0, import_react2.useCallback)(
    (newValue, updateType) => {
      if (typeof newValue === "function") {
        return setQuery((latestValues) => {
          const newValueFromLatest = newValue(latestValues[name]);
          return { [name]: newValueFromLatest };
        }, updateType);
      }
      return setQuery({ [name]: newValue }, updateType);
    },
    [name, setQuery]
  );
  return [decodedValue, setValue];
};

// node_modules/use-query-params/dist/withQueryParams.js
var React2 = __toESM(require_react());
function withQueryParams(paramConfigMap, WrappedComponent) {
  const Component = (props) => {
    const [query, setQuery] = useQueryParams_default(paramConfigMap);
    return React2.createElement(WrappedComponent, {
      query,
      setQuery,
      ...props
    });
  };
  Component.displayName = `withQueryParams(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return Component;
}
function withQueryParamsMapped(paramConfigMap, mapToProps, WrappedComponent) {
  const Component = (props) => {
    const [query, setQuery] = useQueryParams_default(paramConfigMap);
    const propsToAdd = mapToProps(query, setQuery, props);
    return React2.createElement(WrappedComponent, {
      ...propsToAdd,
      ...props
    });
  };
  Component.displayName = `withQueryParams(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return Component;
}

// node_modules/use-query-params/dist/QueryParams.js
var QueryParams = ({
  config,
  children
}) => {
  const [query, setQuery] = useQueryParams_default(config);
  return children({ query, setQuery });
};
export {
  ArrayParam,
  BooleanParam,
  DateParam,
  DateTimeParam,
  DelimitedArrayParam,
  DelimitedNumericArrayParam,
  JsonParam,
  NumberParam,
  NumericArrayParam,
  NumericObjectParam,
  ObjectParam,
  QueryParamProvider,
  QueryParams,
  StringParam,
  createEnumArrayParam,
  createEnumDelimitedArrayParam,
  createEnumParam,
  decodeArray,
  decodeArrayEnum,
  decodeBoolean,
  decodeDate,
  decodeDelimitedArray,
  decodeDelimitedArrayEnum,
  decodeDelimitedNumericArray,
  decodeEnum,
  decodeJson,
  decodeNumber,
  decodeNumericArray,
  decodeNumericObject,
  decodeObject,
  decodeQueryParams,
  decodeString,
  encodeArray,
  encodeBoolean,
  encodeDate,
  encodeDelimitedArray,
  encodeDelimitedNumericArray,
  encodeJson,
  encodeNumber,
  encodeNumericArray,
  encodeNumericObject,
  encodeObject,
  encodeQueryParams,
  encodeString,
  objectToSearchString,
  searchStringToObject,
  transformSearchStringJsonSafe,
  updateInLocation,
  updateLocation,
  useQueryParam,
  useQueryParams,
  withDefault,
  withQueryParams,
  withQueryParamsMapped
};
//# sourceMappingURL=use-query-params.js.map
