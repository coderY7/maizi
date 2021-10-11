(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"scan","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 12:
/*!**********************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 13));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 14));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 18));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 19));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 23));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 24));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 25));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 26));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 27));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 28));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 29));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 16));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 15));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 30));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 17));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 31));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 32));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 33));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 34));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 35));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 36);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 37));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 38));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 39));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 40));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!*********************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!***********************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/request/index.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 15));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!****************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/deepMerge.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 16:
/*!****************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/deepClone.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 17:
/*!***********************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/test.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 18:
/*!******************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/queryParams.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 19:
/*!************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/route.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"scan","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"scan","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"scan","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"scan","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 21);

/***/ }),

/***/ 21:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 22);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 22:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 224:
/*!*********************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/components/uni-popup/popup.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 225));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config };

  },
  mixins: [_message.default] };exports.default = _default;

/***/ }),

/***/ 225:
/*!***********************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/components/uni-popup/message.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  created: function created() {
    if (this.type === 'message') {
      // 不显示遮罩
      this.maskShow = false;
      // 获取子组件对象
      this.childrenMsg = null;
    }
  },
  methods: {
    customOpen: function customOpen() {
      if (this.childrenMsg) {
        this.childrenMsg.open();
      }
    },
    customClose: function customClose() {
      if (this.childrenMsg) {
        this.childrenMsg.close();
      }
    } } };exports.default = _default;

/***/ }),

/***/ 23:
/*!*****************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 24:
/*!***************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 25:
/*!********************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 26:
/*!***********************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/guid.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 27:
/*!************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/color.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 28:
/*!****************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/type2icon.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 29:
/*!******************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/randomArray.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!**************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/addUnit.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 31:
/*!*************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/random.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 32:
/*!***********************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/trim.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 33:
/*!************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/toast.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 34:
/*!****************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/getParent.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 35:
/*!**************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/$parent.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 36:
/*!**********************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/sys.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 37:
/*!***************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/debounce.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 38:
/*!***************************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/function/throttle.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 39:
/*!***********************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/config/config.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') !== -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') !== -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


var ignoreVueI18n = true;
function watchAppLocale(appVm, i18n) {
  appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
    i18n.setLocale(newLocale);
  });
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    locale =
    typeof uni !== 'undefined' && uni.getLocale && uni.getLocale() ||
    LOCALE_EN;
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var appVm = getApp().$vm;
      watchAppLocale(appVm, i18n);
      if (!appVm.$t || !appVm.$i18n || ignoreVueI18n) {
        // if (!locale) {
        //   i18n.setLocale(getDefaultLocale())
        // }
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          // 触发响应式
          appVm.$locale;
          return i18n.t(key, values);
        };
      } else
      {
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          var $i18n = appVm.$i18n;
          var silentTranslationWarn = $i18n.silentTranslationWarn;
          $i18n.silentTranslationWarn = true;
          var msg = appVm.$t(key, values);
          $i18n.silentTranslationWarn = silentTranslationWarn;
          if (msg !== key) {
            return msg;
          }
          return i18n.t(key, $i18n.locale, values);
        };
      }
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 40:
/*!***********************************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/node_modules/uview-ui/libs/config/zIndex.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 41:
/*!******************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/common/http.interceptor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
var install = function install(Vue, vm) {
  // 此为自定义配置参数，具体参数见上方说明
  Vue.prototype.$u.http.setConfig(
  {
    baseUrl: 'http://api.mzsale.cn/mzsale/web', // 请求的本域名
    // 设置为json，返回后会对数据进行一次JSON.parse()
    dataType: 'json',
    showLoading: true, // 是否显示请求中的loading
    loadingText: '请求中...', // 请求loading中的文字提示
    loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
    originalData: true, // 是否在拦截器中返回服务端的原始数据
    loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    // 配置请求头信息
    header: {
      'content-type': 'application/json;charset=UTF-8' } });




  // 请求拦截，配置Token等参数
  Vue.prototype.$u.http.interceptor.request = function (config) {
    // 引用token
    // 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
    // 见：https://uviewui.com/components/globalVariable.html
    // config.header.token = vm.token;

    // 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
    // config.header.token = vm.$store.state.token;

    // 方式三，如果token放在了globalData，通过getApp().globalData获取
    // config.header.token = getApp().globalData.username;

    // 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
    // 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
    // const token = uni.getStorageSync('token');
    // config.header.token = token;
    config.header.Token = 'AFED-F6C6-4FFB-2E71-82EC-C734-9B1D-9109';
    uni.setStorageSync('token', config.header.Token);

    // 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
    if (config.url == '/user/login') config.header.noToken = true;
    // 最后需要将config进行return
    return config;
    // 如果return一个false值，则会取消本次请求
    // if(config.url == '/user/rest') return false; // 取消某次请求
  };

  // 响应拦截，判断状态码是否通过
  Vue.prototype.$u.http.interceptor.response = function (res) {var
    data = res.data;
    if (res.statusCode == 200) {
      // res为服务端返回值，可能有code，result等字段
      // 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
      // 如果配置了originalData为true，请留意这里的返回值
      return data;
    } else if (res.statusCode == 201) {
      // 假设201为token失效，这里跳转登录
      vm.$u.toast('验证失败，请重新登录');
      setTimeout(function () {
        // 此为uView的方法，详见路由相关文档
        vm.$u.route('/pages/my/my');
      }, 1500);
      return false;
    } else {
      // 如果返回false，则会调用Promise的reject回调，
      // 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
      return false;
    }
  };
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 42:
/*!**********************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/common/http.api.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
var login = '/login';
var category = '/catering/category';
var catering = '/catering/dishes';
var dishes = '/catering/dishes/ext';
var order = '/catering/order';
var readytopay = '/catering/readytopay';
var pay = '/catering/pay';
var query = '/catering/pay/query';
var back = '/catering/pay/back';
var usercheck = '/login/usercheck';


// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
var install = function install(Vue, vm) {
  //用户合法性验证
  var userchecks = function userchecks() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(usercheck, params);};
  //用户登录
  var logins = function logins() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(login, params);};
  //菜单分类
  var categorys = function categorys() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(category, params);};
  //菜品资料
  var caterings = function caterings() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(catering, params);};
  //附加
  var dishess = function dishess() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(dishes, params);};
  //订单
  var orders = function orders() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(order, params);};
  //订单预结算
  var readytopays = function readytopays() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(readytopay, params);};
  //支付
  var pays = function pays() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(pay, params);};
  //付款结果
  var querys = function querys() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(query, params);};
  //退款
  var backs = function backs() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(back, params);};
  // 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
  vm.$u.api = { userchecks: userchecks, logins: logins, categorys: categorys, caterings: caterings, dishess: dishess, orders: orders, readytopays: readytopays, pays: pays, querys: querys, backs: backs };
};var _default =

{
  install: install };exports.default = _default;

/***/ }),

/***/ 5:
/*!**************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/pages.json ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 57:
/*!************************************************************************!*\
  !*** /Users/coderyh/Downloads/codeY/mzscan/maizi/common/categories.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [
{
  "id": 20,
  "name": "喜茶食验室",
  "sort": 1,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/f77f2e333a34410384c21da48e138599.jpg",
  "products": [
  {
    "id": 932,
    "name": "芝芝莓莓 ®",
    "no": "2002285591289050",
    "description": "冷670ml 热500ml 人气Top3 选用定製士多啤梨配搭清幽绿妍茶底新鲜现打，莓香满溢。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 150527,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/fbcdfbd39c6548b185c1d0eef790808d.jpg" },

    {
      "id": 117035,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/66a64d27c2504838851ce69f2a901326.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/e75452c0d57443be87fdbe9b1dd61da5.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "0糖低卡甜菊糖",
      "values": [
      {
        "id": 1289,
        "name": "0糖低卡糖（不含糖分）",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "加料",
      "values": [
      {
        "id": 1323,
        "name": "芝士分装",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "绿色喜茶",
      "values": [
      {
        "id": 409,
        "name": "常规吸管",
        "price": "0",
        "is_selected": true },

      {
        "id": 408,
        "name": "纸吸管-口感略有影响",
        "price": "0",
        "is_selected": false },

      {
        "id": 410,
        "name": "不使用吸管",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "冰量",
      "values": [
      {
        "id": 558,
        "name": "正常(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 29,
        "name": "少冰",
        "price": "0",
        "is_selected": false },

      {
        "id": 33,
        "name": "少少冰",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "甜度",
      "values": [
      {
        "id": 67,
        "name": "标准(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 93,
        "name": "少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 96,
        "name": "少少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 51,
        "name": "不另外加糖",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "茶底",
      "values": [
      {
        "id": 205,
        "name": "绿妍(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 413,
        "name": "去茶底",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "口味",
      "values": [
      {
        "id": 186,
        "name": "芝士(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 145,
        "name": "去芝士",
        "price": "0",
        "is_selected": false },

      {
        "id": 1203,
        "name": "换芝芝雪糕(顶部)",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19 },

  {
    "id": 1061,
    "name": "未来肉芝士堡",
    "no": "2005095380168625",
    "description": "选用星期零植物基未来肉打造，每100克未来肉含17.1克蛋白质与5.5克膳食纤维，热量仅为真牛肉的51%，叠加干酪片与青节瓜，突破食界，品尝未来。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 153382,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/24/5ba38e1966334ff9af2ee27e1a803497.jpg" },

    {
      "id": 147238,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/11/88d10a251f5841a185101aaccfa7952e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 16,
      "name": "含小麦、大豆",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 22,
      "name": "含乳制品、蛋",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 22.12 },

  {
    "id": 1036,
    "name": "混坚果",
    "no": "2004238677566283",
    "description": "喜茶首款混合坚果，1盒内含3种口味：日式芥末、酥脆海苔、麻辣火锅。精选越南大颗腰果、美国加州巴旦木仁与土耳其榛子仁，独特喷淋技术，保证颗颗够味。自然慢焙烘烤，零人工添加色素与防腐剂。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 141992,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/01/7bf2447422bf4acb95b1a82366eeba34.jpg" },

    {
      "id": 139423,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/26/c2bf42835baf453d8987afa54e796f0e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2349,
      "name": "混坚果",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 80,
      "name": "含坚果、大豆及乳制品",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 81,
      "name": "含小麦制品、虾制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "30",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 28.30 },

  {
    "id": 1033,
    "name": "夹心小方(咸蛋黄味)",
    "no": "2004204939030796",
    "description": "10片/盒，每片均为独立小包装。2.0新升级，甜度更低。咸蛋黄饼皮搭配浓郁原味夹心，一口吃下奶香和咸蛋黄相互交织，甜而不腻。精选美国进口巴旦木粉，健康食材，吃得放心。购买2盒/3盒夹心小方，默认搭配二合一/三合一的组合装腰封。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 145005,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/b796c7a8edd44e7e968745cb63eae3a2.jpg" },

    {
      "id": 137571,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/882651cb064e4326b4b73c57cadbf8b8.jpg" },

    {
      "id": 137572,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/401a0054f6d040709b316d2c23c7b3c2.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2336,
      "name": "夹心小方(咸蛋黄味)",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 46,
      "name": "含小麦、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 92,
      "name": "乳及坚果制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "45",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 42.45 },

  {
    "id": 1031,
    "name": "夹心小方(芝士味)",
    "no": "2004208719981465",
    "description": "10片/盒，每片均为独立小包装。全新口味登场，喜茶经典芝士化身浓郁芝香夹心，每一口都是浓浓芝士味。精选丹麦深加工芝士与美国进口巴旦木粉，健康食材，吃得放心。购买2盒/3盒夹心小方，默认搭配二合一/三合一的组合装腰封。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 145004,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/9d1f23859ef0495aade6cbe0d46c492b.jpg" },

    {
      "id": 137566,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/43b09ca3b38a4c08a0b6ad142d1ad2ed.jpg" },

    {
      "id": 137567,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/8c4264b660714a70bda5f13e92c04377.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2334,
      "name": "夹心小方(芝士味)",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 46,
      "name": "含小麦、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 92,
      "name": "乳及坚果制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "45",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 42.45 },

  {
    "id": 1032,
    "name": "夹心小方(金凤味)",
    "no": "2004202778423181",
    "description": "10片/盒，每片均为独立小包装。2.0新升级，甜度更低。金凤茶叶原叶研磨成焙香茶粉，融入饼皮和夹心，炭焙乌龙口感清新。精选美国进口巴旦木粉，健康食材，吃得放心。购买2盒/3盒夹心小方，默认搭配二合一/三合一的组合装腰封。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 145006,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/cf932ed0413a42b9a4a59aac686db19b.jpg" },

    {
      "id": 137569,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/9c35d5aa21d44791bbd2b7bad308f256.jpg" },

    {
      "id": 137570,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/6a6b02329cd64ddfa1c2ab87dfb0d209.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2335,
      "name": "夹心小方(金凤味)",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 46,
      "name": "含小麦、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 92,
      "name": "乳及坚果制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "45",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 42.45 },

  {
    "id": 985,
    "name": "黑糖波波希腊酸奶",
    "no": "2003226159266660",
    "description": "黑糖脆波波与希腊酸奶灵感碰撞，酸奶部分无糖。选用100%生牛乳发酵，零添加色素、明胶，每100克含7.7克优质蛋白质，且仅含1.4克脂肪。建议将定制草莓燕麦片加入酸奶后大力搅匀整杯一起食用。酸奶保质期较短，请尽快食用。",
    "label": "",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 126120,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/ecd4f6fcfdb8406ab297607c517b9790.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 93,
      "name": "含乳、燕麦、南瓜子仁",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "绿色喜茶",
      "values": [
      {
        "id": 1334,
        "name": "需要餐具",
        "price": "0",
        "is_selected": 1 },

      {
        "id": 1335,
        "name": "不需要一次性餐具",
        "price": "0",
        "is_selected": 0 }] }],




    "is_premade": "1",
    "remark": "酸奶",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 16.81 },

  {
    "id": 986,
    "name": "蓝莓希腊酸奶",
    "no": "2003234480984193",
    "description": "加拿大野生蓝莓融入希腊酸奶，酸奶部分无糖。选用100%生牛乳发酵，零添加色素和明胶，每100克含7.7克优质蛋白质，且仅含1.4克脂肪。建议将定制草莓燕麦片加入酸奶后大力搅匀整杯一起食用。酸奶保质期较短，请尽快食用。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 8,
    "images": [
    {
      "id": 126119,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/ab0773906b3646278a84fe3dfaa759e9.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 93,
      "name": "含乳、燕麦、南瓜子仁",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "绿色喜茶",
      "values": [
      {
        "id": 1334,
        "name": "需要餐具",
        "price": "0",
        "is_selected": 1 },

      {
        "id": 1335,
        "name": "不需要一次性餐具",
        "price": "0",
        "is_selected": 0 }] }],




    "is_premade": "1",
    "remark": "酸奶",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 16.81 },

  {
    "id": 967,
    "name": "芋泥咸蛋黄米面包",
    "no": "2003087530550002",
    "description": "喜茶首款“大米面包”，减油减糖低热量。以大米粉代替部分小麦粉制作为松软米面包，内馅中加入咸蛋黄和芋泥，美味与饱腹兼备。",
    "label": "",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 9,
    "images": [
    {
      "id": 119991,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/08/df694d96fb574658b11cde291aee699b.jpg" },

    {
      "id": 121237,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/50d442e74263480580861b2ba99db4b6.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 46,
      "name": "含小麦、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "13",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 11.50 },

  {
    "id": 966,
    "name": "紫米紫薯米面包",
    "no": "2003089320320200",
    "description": "喜茶首款“大米面包”，减油减糖低热量。以大米粉代替部分小麦粉制作为松软米面包，内馅中加入紫米紫薯两种杂粮，营养更均衡。",
    "label": "",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 10,
    "images": [
    {
      "id": 119992,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/08/08e8693f93db4152a16365469509c346.jpg" },

    {
      "id": 121238,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/d0674101531d4140b530fbb23bb0e458.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 99,
      "name": "含小麦、乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "13",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 11.50 },

  {
    "id": 188,
    "name": "芋泥糯米糍",
    "no": "1905258507239912",
    "description": "下单后不用等待叫号，直接出示给店员领取。糯米糍外皮Q弹软韧，绵柔的芋泥内馅中带着细密颗粒感。",
    "label": "糯米糍",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 14,
    "images": [
    {
      "id": 2958,
      "url": "https://go.cdn.heytea.com/storage/products/2018/12/07/D26Q9kO7a2ctt3ApN39vVuZNMa7OhjX6afuAScUg.jpg" },

    {
      "id": 121296,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/672cdb1e78b64cba9c7bd26192f7069c.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 818,
      "name": "芋泥糯米糍",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [
    {
      "id": 100,
      "name": "含乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 7.96 },

  {
    "id": 522,
    "name": "布蕾糯米糍",
    "no": "1908077847471771",
    "description": "下单后不用等待叫号，直接出示给店员领取。Q弹冰爽的糯米糍裹入口即化的法式布蕾，满口留香。",
    "label": "糯米糍",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 15,
    "images": [
    {
      "id": 65894,
      "url": "https://go.cdn.heytea.com/product/2019/08/08/tmp/abfbe602452f4b9c8143c732b4b99f78.jpg" },

    {
      "id": 121292,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/3105afea13424d76b54cfdd01332aec3.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1391,
      "name": "布蕾糯米糍",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [
    {
      "id": 90,
      "name": "含蛋、乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 7.96 },

  {
    "id": 444,
    "name": "芒果糯米糍",
    "no": "1906114107951144",
    "description": "下单后不用等待叫号，直接出示给店员领取。糯香外皮裹入大块芒果果肉，真材实料，芒香四溢。",
    "label": "糯米糍",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 16,
    "images": [
    {
      "id": 51963,
      "url": "https://go.cdn.heytea.com/product/2019/06/11/tmp/534fc9ec25414764b3aa479b44549a1c.jpg" },

    {
      "id": 121295,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/182cb5f3f04d41b3ac32146dbf38e1a9.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1246,
      "name": "芒果糯米糍",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [
    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "12",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 10.62 },

  {
    "id": 187,
    "name": "榴莲糯米糍",
    "no": "1905254929085716",
    "description": "下单后不用等待叫号，直接出示给店员领取。糯米糍外皮Q弹软韧，榴莲蓉内馅顺滑，浓郁中带有淡淡奶香。",
    "label": "糯米糍",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 17,
    "images": [
    {
      "id": 88395,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/12/339aab7f76e24296b1e716fab785c5bb.jpg" },

    {
      "id": 121293,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/7579079c0b0a4d7d8b464c3321e8f767.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 817,
      "name": "榴莲糯米糍",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [
    {
      "id": 100,
      "name": "含乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "18",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 15.93 },

  {
    "id": 736,
    "name": "日式海盐牛角",
    "no": "1911120202609824",
    "description": "加入黄油烘焙的牛角包更加香酥，表面撒上些许海盐提香提味。",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 18,
    "images": [
    {
      "id": 88571,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/13/f26206a42b2b48c38bef58c795d30e3a.jpg" },

    {
      "id": 121234,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/f09ec6f23c3543619731b1c37c9e790c.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 99,
      "name": "含小麦、乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 7.96 },

  {
    "id": 161,
    "name": "流沙牛角",
    "no": "1812135249995598",
    "description": "下单后不用等待叫号，直接出示给店员领取。在酥脆的牛角中注入咸蛋黄流沙，黄油甜香中带有粗颗粒的微咸，层次丰富，满口留香。",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 19,
    "images": [
    {
      "id": 88364,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/12/5ad4996d0fdd4f3a85a25b8fe95a4db8.jpg" },

    {
      "id": 121233,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/78ad5460e80d4587a8f07abc4baf76e9.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 87,
      "name": "含麦制品、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "温度",
    "is_enable": 1,
    "price": "10",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8.85 },

  {
    "id": 735,
    "name": "芋泥牛角",
    "no": "1911125473384653",
    "description": "软绵绵的芋泥填入松脆牛角包，带来双重满足口感。",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 20,
    "images": [
    {
      "id": 88568,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/13/e479684b39db4cfea36e31c6e434ccd7.jpg" },

    {
      "id": 121241,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/979ca41d0238481ea7c3a7cb73335bd1.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 87,
      "name": "含麦制品、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "12",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 10.62 },

  {
    "id": 534,
    "name": "法式布蕾牛角",
    "no": "1908125985893028",
    "description": "烤至酥脆的牛角中注入酸甜芝士布蕾，满口留香。（芝士奶酸味属正常口感）",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 21,
    "images": [
    {
      "id": 66925,
      "url": "https://go.cdn.heytea.com/product/2019/08/12/tmp/b297da7e150e46cc98c2138a290c9fb4.jpg" },

    {
      "id": 121231,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/1e1a115b801d439281790230bcfaeb0c.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 91,
      "name": "含麦、蛋、坚果",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "10",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8.85 },

  {
    "id": 535,
    "name": "海苔肉酥牛角",
    "no": "1908128591156037",
    "description": "酥脆的海苔肉酥铺满整只牛角包，芝士奶油醇香柔滑。",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 22,
    "images": [
    {
      "id": 66934,
      "url": "https://go.cdn.heytea.com/product/2019/08/12/tmp/d5ebe688cd0b4f8d922505aac18a6fcb.jpg" },

    {
      "id": 121232,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/a16f9bf3635e4875be1507a598d10ecc.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 87,
      "name": "含麦制品、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "12",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 10.62 },

  {
    "id": 316,
    "name": "咸蛋黄千层吐司",
    "no": "1903059853995257",
    "description": "下单后不用等待叫号，直接出示给店员领取。咸香蛋黄与奶香吐司层层交织，带来极度细腻的口感体验。",
    "label": "吐司",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 23,
    "images": [
    {
      "id": 23974,
      "url": "https://go.cdn.heytea.com/storage/products/2019/03/07/VJeeKv4CvYLoPhgFedawCrao1BfjTF2nNZ46ucKA.jpg" },

    {
      "id": 121290,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/f6acd196783c4d4c8cc6e41eaed3062a.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1039,
      "name": "咸蛋黄千层吐司",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [
    {
      "id": 87,
      "name": "含麦制品、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "24",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 21.24 },

  {
    "id": 159,
    "name": "小芋头条",
    "no": "1812139850535155",
    "description": "下单后不用等待叫号，直接出示给店员领取。来自喜茶热麦颇受欢迎的芋头条，现调整为适合一人食的分量，依然内馅饱满，与软韧的面包体默契相融。",
    "label": "小芋头条",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 24,
    "images": [
    {
      "id": 88366,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/12/2bed4fc9c2fe4d61a1ffd7d7835594b7.jpg" },

    {
      "id": 121240,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/25ea4c4d3db44e0bae3b080a18f24a69.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 99,
      "name": "含小麦、乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "温度",
    "is_enable": 1,
    "price": "15",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 13.27 },

  {
    "id": 1064,
    "name": "太妃焦糖爆米花",
    "no": "2005127848825331",
    "description": "精选爆裂玉米与新西兰进口黄油炒制，每一条缝隙都填满太妃焦糖甜香，不含反式脂肪酸，0防腐剂。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 150037,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/6def2c810a5c4d1a80912ffad47f3162.jpg" },

    {
      "id": 150038,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/99f43d68f57c4278b62e5354510223c3.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2406,
      "name": "太妃焦糖爆米花",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 102,
      "name": "含大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 0,
    "price": "12",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 11.32 },

  {
    "id": 836,
    "name": "火腿蛋可颂脆堡",
    "no": "1912251537314614",
    "description": "可颂面包夹入大块烟熏火腿与原味蛋饼，车打芝士更添浓郁奶香。",
    "label": "可颂",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 11,
    "images": [
    {
      "id": 110948,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/12/41041a1dba3243c1859bfba0615d3797.jpg" },

    {
      "id": 121298,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/48db64dea6fa4c4b99ae3a005be469c9.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 94,
      "name": "含小麦、燕麦、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "鲜食",
    "is_enable": 0,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 16.81 },

  {
    "id": 838,
    "name": "熏鸡芝士蛋三明治",
    "no": "1912253512109898",
    "description": "烟熏鸡肉混搭鸡蛋色拉与车打芝士，每一口都十足有料。",
    "label": "可颂",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 12,
    "images": [
    {
      "id": 110950,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/12/9b8969a8830a485c945b2e5e353f20dc.jpg" },

    {
      "id": 121299,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/127cadc6fe59432390db87caf2fa2b68.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 96,
      "name": "含小麦、蛋、乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "鲜食",
    "is_enable": 0,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 16.81 },

  {
    "id": 837,
    "name": "芝芝火腿可颂",
    "no": "1912257503138775",
    "description": "烘烤至酥脆的酥香可颂，内夹烟熏火腿和车打芝士，满口留香。",
    "label": "可颂",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 13,
    "images": [
    {
      "id": 110949,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/12/9b90d1cb46ed434d836352e1bdd9245e.jpg" },

    {
      "id": 121300,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/7f8cca1df210430fa3375f650209a91d.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 97,
      "name": "含小麦、乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "鲜食",
    "is_enable": 0,
    "price": "18",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 15.93 },

  {
    "id": 617,
    "name": "冷萃桂花绿",
    "no": "1909306163749525",
    "description": "冷萃茶不用等待叫号，可直接向店员出示后领取。细嫩茶芽与桂花一同于冷露中舒展沐浴八小时，制得茶汤清黄透亮，滋味鲜爽。",
    "label": "冷萃",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 25,
    "images": [
    {
      "id": 79221,
      "url": "https://go.cdn.heytea.com/product/2019/10/01/tmp/9d41fd6573ab49ab8eeb71b2746c0ba4.jpg" },

    {
      "id": 116975,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/7dcb32e0d8f047678447e7c30064c030.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1515,
      "name": "冷萃桂花绿",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "国内-喜茶实验室",
    "is_enable": 0,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 8.49 }],


  "categoryAds": [] },

{
  "id": 12,
  "name": "当季限定",
  "sort": 2,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/05/02/c9d862a735af48d280ab8b21a2315514.jpg",
  "products": [
  {
    "id": 421,
    "name": "芝芝桃桃",
    "no": "1906061363116531",
    "description": "冷670ml 热500ml 精选当季水蜜桃+NFC桃汁（100%非浓缩还原桃汁）搭配金玉茶底制作而成，不使用任何香精等添加剂，不使用任何罐头水果。粉色为火龙果天然调色。若有小黑点，是火龙果籽，可放心食用。",
    "label": "",
    "category_id": 12,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 147227,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/11/f00875e937244d3188f462e43c21170a.jpg" },

    {
      "id": 139431,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/26/c846a8fc574146ccad2f9a7581a692ef.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "0糖低卡甜菊糖",
      "values": [
      {
        "id": 1289,
        "name": "0糖低卡糖（不含糖分）",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "加料",
      "values": [
      {
        "id": 1323,
        "name": "芝士分装",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "绿色喜茶",
      "values": [
      {
        "id": 409,
        "name": "常规吸管",
        "price": "0",
        "is_selected": true },

      {
        "id": 408,
        "name": "纸吸管-口感略有影响",
        "price": "0",
        "is_selected": false },

      {
        "id": 410,
        "name": "不使用吸管",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "冰量",
      "values": [
      {
        "id": 558,
        "name": "正常(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 29,
        "name": "少冰",
        "price": "0",
        "is_selected": false },

      {
        "id": 33,
        "name": "少少冰",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "甜度",
      "values": [
      {
        "id": 67,
        "name": "标准(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 93,
        "name": "少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 96,
        "name": "少少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 51,
        "name": "不另外加糖",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "茶底",
      "values": [
      {
        "id": 205,
        "name": "绿妍(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 413,
        "name": "去茶底",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "口味",
      "values": [
      {
        "id": 186,
        "name": "芝士(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 145,
        "name": "去芝士",
        "price": "0",
        "is_selected": false },

      {
        "id": 1203,
        "name": "换芝芝雪糕(顶部)",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "0",
    "remark": "大陆普通",
    "is_enable": 1,
    "price": "30",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 28.30 },

  {
    "id": 1037,
    "name": "多肉杨梅",
    "no": "2004238175994068",
    "description": "冷670ml 精选当季云南鲜杨梅，颗颗手剥去核。搭配来自优质茶园的绿妍原茶及喜茶经典芝士，冰凉消暑。",
    "label": "",
    "category_id": 12,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 147226,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/11/b95776a518d144ce8039a149c8ecf415.jpg" },

    {
      "id": 139334,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/26/d9cdb5e74f93439ebe30fdaa4928b5bd.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "0糖低卡甜菊糖",
      "values": [
      {
        "id": 1289,
        "name": "0糖低卡糖（不含糖分）",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "加料",
      "values": [
      {
        "id": 1323,
        "name": "芝士分装",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "绿色喜茶",
      "values": [
      {
        "id": 409,
        "name": "常规吸管",
        "price": "0",
        "is_selected": true },

      {
        "id": 408,
        "name": "纸吸管-口感略有影响",
        "price": "0",
        "is_selected": false },

      {
        "id": 410,
        "name": "不使用吸管",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "冰量",
      "values": [
      {
        "id": 558,
        "name": "正常(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 29,
        "name": "少冰",
        "price": "0",
        "is_selected": false },

      {
        "id": 33,
        "name": "少少冰",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "甜度",
      "values": [
      {
        "id": 67,
        "name": "标准(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 93,
        "name": "少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 96,
        "name": "少少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 51,
        "name": "不另外加糖",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "茶底",
      "values": [
      {
        "id": 205,
        "name": "绿妍(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 413,
        "name": "去茶底",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "口味",
      "values": [
      {
        "id": 186,
        "name": "芝士(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 145,
        "name": "去芝士",
        "price": "0",
        "is_selected": false },

      {
        "id": 1203,
        "name": "换芝芝雪糕(顶部)",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "0",
    "remark": "普通",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 1014,
    "name": "芝芝莓莓桃",
    "no": "2004104298716366",
    "description": "冷670ml 莓莓与桃桃的首次灵感混搭。莓莓沁入桃汁，搭配清雅绿妍茶底与浓醇芝士，一次喝到两款人气饮品。",
    "label": "",
    "category_id": 12,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 140872,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/28/bfbe92590fa244b09353b873a5ca98a3.jpg" },

    {
      "id": 134740,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/14/1feb8648edad4cc9a37d9b1bdead9b59.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "31",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 29.25 }],


  "categoryAds": [] },

{
  "id": 67,
  "name": "人气必喝榜",
  "sort": 3,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/3b52e3d18fae4290b0a668a776b21645.jpg",
  "products": [
  {
    "id": 944,
    "name": "满杯红柚",
    "no": "2002289831003882",
    "description": "冷670ml  热500ml 人气Top7 精选饱满红柚果粒入茶，清幽绿妍茶底洋溢茉莉花香。冰沙减弱了红柚的微苦，更凸显茶味。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 72,
    "images": [
    {
      "id": 135796,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/16/334021739fee4274989793ce343156fd.jpg" },

    {
      "id": 117022,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/07dae739032e4b5f9034c82cfad32aa4.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/b6041bf0a93046039123851d0250101f.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58 },

  {
    "id": 931,
    "name": "多肉葡萄",
    "no": "2002282994907759",
    "description": "冷670ml 热500ml 人气Top1 精选爽脆夏黑葡萄入茶，保留果肉完整肉感。搭配清雅绿妍茶底与醇香芝士，鲜爽可口。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 143240,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/03/26c8a4213c9243e88f4e3f6cfa14c30b.jpg" },

    {
      "id": 117056,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/1d874e762358478aa3ae4385a1397819.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/b280fca74f744e6896cabdb73ae31f47.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "30",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 28.30 },

  {
    "id": 941,
    "name": "多肉芒芒甘露",
    "no": "2002288368800095",
    "description": "冷/热500ml  人气Top2 经典芒芒与杨枝甘露的灵感碰撞，精选清幽绿妍茶底，爆汁红柚粒撞上大块芒肉。热饮默认加入芋圆波波，不含脆波波。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 150526,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/40a6757ad5d34161aedda557f63bf315.jpg" },

    {
      "id": 117044,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/dab56268b0fa44499f3255e95657cf18.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/4015de8912a14300a877b19569096cda.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 932,
    "name": "芝芝莓莓 ®",
    "no": "2002285591289050",
    "description": "冷670ml 热500ml 人气Top3 选用定製士多啤梨配搭清幽绿妍茶底新鲜现打，莓香满溢。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 150527,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/fbcdfbd39c6548b185c1d0eef790808d.jpg" },

    {
      "id": 117035,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/66a64d27c2504838851ce69f2a901326.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/e75452c0d57443be87fdbe9b1dd61da5.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "0糖低卡甜菊糖",
      "values": [
      {
        "id": 1289,
        "name": "0糖低卡糖（不含糖分）",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "加料",
      "values": [
      {
        "id": 1323,
        "name": "芝士分装",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "绿色喜茶",
      "values": [
      {
        "id": 409,
        "name": "常规吸管",
        "price": "0",
        "is_selected": true },

      {
        "id": 408,
        "name": "纸吸管-口感略有影响",
        "price": "0",
        "is_selected": false },

      {
        "id": 410,
        "name": "不使用吸管",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "冰量",
      "values": [
      {
        "id": 558,
        "name": "正常(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 29,
        "name": "少冰",
        "price": "0",
        "is_selected": false },

      {
        "id": 33,
        "name": "少少冰",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "甜度",
      "values": [
      {
        "id": 67,
        "name": "标准(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 93,
        "name": "少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 96,
        "name": "少少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 51,
        "name": "不另外加糖",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "茶底",
      "values": [
      {
        "id": 205,
        "name": "绿妍(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 413,
        "name": "去茶底",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "口味",
      "values": [
      {
        "id": 186,
        "name": "芝士(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 145,
        "name": "去芝士",
        "price": "0",
        "is_selected": false },

      {
        "id": 1203,
        "name": "换芝芝雪糕(顶部)",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19 },

  {
    "id": 1070,
    "name": "芝芝莓莓桃",
    "no": "2005182670291325",
    "description": "冷670ml 人气Top4 莓莓与桃桃的首次灵感混搭。莓莓沁入桃汁，搭配清雅绿妍茶底与浓醇芝士，一次喝到两款人气饮品。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 150244,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/9faf0150339d4b9f97f15b95aa6e1eea.jpg" },

    {
      "id": 150263,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/befb6794a056416cb6d2887e8950b99e.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/05/18/a7df1a4418d14475aab48a76268cc8d1.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "31",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 29.25 },

  {
    "id": 938,
    "name": "芝芝芒芒 ®",
    "no": "2002280824114931",
    "description": "冷670ml 人气Top5 选用当季芒果搭配清幽绿妍茶底新鲜现制，清新绵密。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 150528,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/0c30e67747c04eeeb05a90b06a79c999.jpg" },

    {
      "id": 117074,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/fa956693617d4eecb733b4a7dc9dd333.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/41c6464515484d4797055629ea3ac978.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19 },

  {
    "id": 935,
    "name": "烤黑糖波波鲜奶",
    "no": "2002288501288017",
    "description": "冷480ml 热500ml  人气Top6  黑糖珍珠搭配顺滑鲜奶，波波系列奶味较为浓郁，不喜欢浓厚口感的朋友慎点。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 8,
    "images": [
    {
      "id": 143245,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/03/489faf24180c45fe974f7711b5c945b0.jpg" },

    {
      "id": 116588,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/b9a1a1446e114335b9319a3a82e5e99f.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/880caa818dd1464d99f1a3b15fc74408.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "21",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 19.81 },

  {
    "id": 933,
    "name": "豆豆波波茶",
    "no": "2002284899436338",
    "description": "冷/热500ml 人气Top8 选用浓郁阿萨姆奶茶茶底。浓厚黄豆粉、芋圆波波搭配秘制豆乳奶盖，底部藏有滑嫩豆花。饮用秘籍：1.舀起顶部小丸子和豆奶盖先尝，2.吸管一插到底，再吸豆花与奶茶。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 76,
    "images": [
    {
      "id": 150529,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/2cbf29cd972346e6afce4ae44bdbd001.jpg" },

    {
      "id": 116602,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/c1c1e721aae848ba9ec0c90642595a07.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/51dd0977ee194011b5a0c8caea5f2634.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 88,
      "name": "含乳制品、大豆、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 934,
    "name": "芋泥波波鲜奶",
    "no": "2002283784744731",
    "description": "冷/热500ml  人气Top9  默认冷饮，可做热。因芋泥容易氧化，为保持最佳体验，请务必于一小时内饮用完毕。茶底可选鲜奶/椰奶。手捣新鲜芋泥融入顺滑鲜奶，再加入颗颗Q弹的芋泥波波，绵密与润泽，尽在这一杯。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 82,
    "images": [
    {
      "id": 150530,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/8f982f2fedb049bbb42afb1ec660b157.jpg" },

    {
      "id": 116600,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/666de01e56fa40a5b57fa6b9f3fd7651.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/0c485a9ec288466186b30e1fb65449b9.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 923,
    "name": "m豆波波",
    "no": "2002263405725906",
    "description": "冷480ml  热 500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油顶是m豆们的奇妙游乐园。饮用步骤：1.先用搭配的小勺吃掉奶油和m豆；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 172,
    "images": [
    {
      "id": 114333,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/26/2c409b83237148f58ae346c44254a382.jpg" },

    {
      "id": 116572,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/f1656b78be914bc7aacfabc2dd87ad6d.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 922,
    "name": "空气巧克力波波",
    "no": "2002260260233795",
    "description": "冷480ml  热 500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油与空气巧克力交织出圣诞好味。饮用步骤：1.先用搭配的小勺吃掉奶油和空气巧克力；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 202,
    "images": [
    {
      "id": 114321,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/26/cd87394ec858482499b89db226e17626.jpg" },

    {
      "id": 116591,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/135b9a02c96b4be8af8ae7fe827613c3.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "28",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 26.42 }],


  "categoryAds": [] },

{
  "id": 17,
  "name": "喜茶制冰",
  "sort": 4,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/ef7b2a24507a4e20b50355eccc3261db.jpg",
  "products": [
  {
    "id": 865,
    "name": "锡兰奶茶脆筒",
    "no": "2001106350637687",
    "description": "由于冰淇淋易化，下单后需到冰淇淋机出示购买凭证制作领取，感谢理解。丝滑奶香与锡兰红茶交织，浓郁茶香，入口难忘。",
    "label": "",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 0,
    "sort": 1,
    "images": [
    {
      "id": 104839,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/10/a80b8ad8282c4c14b619a17e2524abc8.jpg" },

    {
      "id": 117368,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/a03b4da4d8984bb6a0d2374c73c3dc11.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 84,
      "name": "含乳、麦制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 8.49 },

  {
    "id": 482,
    "name": "芝芝脆筒",
    "no": "1907049396650773",
    "description": "由于冰淇淋易化，下单后需到冰淇淋机出示购买凭证制作领取，敬请谅解。首次将喜茶经典芝士与冰淇淋结合，芝香浓郁，乳香丝滑。",
    "label": "冰激淋",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 0,
    "sort": 2,
    "images": [
    {
      "id": 61018,
      "url": "https://go.cdn.heytea.com/product/2019/07/17/tmp/e9d83a24f39547f98369ce8bfdd781af.jpg" },

    {
      "id": 117369,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/a30e76e5abfb420db8deda04715c7aec.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 89,
      "name": "含乳、麦制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 8.49 },

  {
    "id": 716,
    "name": "豆豆雪糕杯",
    "no": "1911057652116163",
    "description": "雪山黄豆粉和吹弹可破的豆花置于芝芝冰淇淋上，缀以软糯芋圆波波。",
    "label": "冰激淋",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 86879,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/05/1d09b9bff6934df5a55c009c4c7d176c.jpg" },

    {
      "id": 117140,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/e6f339018d96413897f20e143153718b.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 60,
      "name": "含乳制品、大豆",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "15",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 14.15 },

  {
    "id": 91,
    "name": "波波雪糕杯",
    "no": "1812235098495352",
    "description": "由于冰淇淋易化，下单后需到冰淇淋机出示购买凭证制作领取，敬请谅解。浓醇乳香融入定制茶香，佐以古法黑糖熬制的Q弹波波。",
    "label": "冰激淋",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 106621,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/16/bb5441ab575d478595c2b4cf8e3f82f9.jpg" },

    {
      "id": 117133,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/7ed49e6458364d8faf04850862797f1a.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "一个口味",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09 },

  {
    "id": 518,
    "name": "爆芋泥雪糕杯",
    "no": "1908020946066711",
    "description": "由于冰淇淋易化，下单后需到冰淇淋机出示购买凭证制作领取，敬请谅解。醇香芝士雪糕搭配满满手捣鲜芋泥、大粒芋头丁及香糯芋圆波波。",
    "label": "冰激淋",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 64564,
      "url": "https://go.cdn.heytea.com/product/2019/08/02/tmp/4e90c2391b174547b164811e4d4256ab.jpg" },

    {
      "id": 117147,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/c28d24b339d7480ea11c3f38d7fbca4d.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09 }],


  "categoryAds": [] },

{
  "id": 3,
  "name": "果茶家族",
  "sort": 5,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/ac7a2ff85b6944fe83df06a79cc19834.jpg",
  "products": [
  {
    "id": 903,
    "name": "满杯红柚",
    "no": "2002116591295747",
    "description": "冷670ml  热500ml 精选饱满红柚果粒入茶，清幽绿妍茶底洋溢茉莉花香。冰沙减弱了红柚的微苦，更凸显茶味。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 110879,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/11/cb131fdf77a240759b8b7ca88b6cf60c.jpg" },

    {
      "id": 117018,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/a680c4a889db4348ac18073afd876d16.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "精简",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58 },

  {
    "id": 987,
    "name": "多肉葡萄",
    "no": "2003233053569987",
    "description": "冷670ml 热500ml  精选爽脆夏黑葡萄入茶，保留果肉完整肉感。搭配清雅绿妍茶底与醇香芝士，鲜爽可口。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 125859,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/a8cc4a72b43b434488f7be0a83b0ff10.jpg" },

    {
      "id": 125860,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/befbd052ffd14a109af3512d762ef7b3.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "精简菜单",
    "is_enable": 0,
    "price": "30",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 28.30 },

  {
    "id": 988,
    "name": "芝芝莓莓 ®",
    "no": "2003236541062275",
    "description": "冷670ml 热500ml 选用定制草莓搭配清幽绿妍茶底新鲜现制，莓香满溢。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 125863,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/6e368d7fa41d423eb08ea7f9824aed49.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "国内-精简",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19 },

  {
    "id": 901,
    "name": "多肉芒芒甘露",
    "no": "2002112553238348",
    "description": "冷/热500ml  经典芒芒与杨枝甘露的灵感碰撞，精选清幽绿妍茶底，爆汁红柚粒撞上大块芒肉。热饮默认加入芋圆波波，不含脆波波。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 135047,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/15/44ed201701ef406087100b0c1690daad.jpg" },

    {
      "id": 117036,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/de106edd904148f185f6273835be0baf.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "精简菜单",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 1027,
    "name": "多肉芒芒甘露MAX",
    "no": "2004177218841779",
    "description": "冷670ml 多肉芒芒甘露升级大杯，果肉更多。经典芒芒与杨枝甘露的灵感碰撞，爆汁红柚粒撞上大块芒肉，精选清幽绿妍茶底，好喝不腻口。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 145003,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/811f5f21b97b494baa7dd860e73ea3d2.jpg" },

    {
      "id": 136964,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/19/16acc3dcfc944f65a031192183ed79fa.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-精选",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19 },

  {
    "id": 1025,
    "name": "莓莓芒芒甘露",
    "no": "2004173099743868",
    "description": "冷500ml 莓莓和芒芒甘露的首次灵感混搭。当季草莓搭配椰香芒果和红柚果粒，精选清新绿妍茶底，一次尝鲜两款人气饮品。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 145000,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/f59e648a91b646a0a240f57e8504a63a.jpg" },

    {
      "id": 136961,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/19/35254a5c17104f14b867118cbf5e22bc.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "当季-普通",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 902,
    "name": "芝芝芒芒",
    "no": "2002117627568550",
    "description": "冷670ml 选用当季芒果搭配清幽绿妍茶底新鲜现制，清新绵密。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 110878,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/11/bcfb2519560e422e87d5d6e42311ab33.jpg" },

    {
      "id": 117061,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/eb615f19fc7b4597b2bf2e7d72ecc49b.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "精选菜单",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19 }],


  "categoryAds": [] },

{
  "id": 1,
  "name": "芝芝茗茶",
  "sort": 6,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/3de570175dbb4c74a6291e1b6df4eb6a.jpg",
  "products": [
  {
    "id": 723,
    "name": "芝芝绿妍",
    "no": "1911069353676862",
    "description": "冷/热500ml 芝士分装无法选择烤黑糖。喜茶定制绿茶，较普通绿茶，少了几分涩气，口感清澈，茉莉香气馥郁怡人。",
    "label": "",
    "category_id": 1,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 86967,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/06/426b9ffb61b54d109c5e0a2fb17e6dd2.jpg" },

    {
      "id": 116966,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/e15fc76af0d5474db3fd7ea6f7c3038e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "有豆豆奶盖",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 17.92 },

  {
    "id": 726,
    "name": "芝芝金玉",
    "no": "1911062610264848",
    "description": "冷/热500ml 芝士分装无法选择烤黑糖。喜茶定制乌龙，清新茶香中带有桂花香和淡淡的乳香，馥郁迷人。",
    "label": "",
    "category_id": 1,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 86975,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/06/71fc31a5917849148bc363187ade15dc.jpg" },

    {
      "id": 117003,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/9b2cde9273b34263a4de537e6c7fcdae.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "有豆豆奶盖",
    "is_enable": 1,
    "price": "22",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 20.75 },

  {
    "id": 728,
    "name": "芝芝金凤茶王",
    "no": "1911063020240079",
    "description": "冷/热500ml 芝士分装无法选择烤黑糖。喜茶定制乌龙茶，香气炭焙浓郁，入喉回甘，茶香余韵不断。",
    "label": "",
    "category_id": 1,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 86978,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/06/8c674061195c47abab7f0ba5389a9277.jpg" },

    {
      "id": 117006,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/55ae40fc3ddb4f34b637355fb05019e0.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "有豆豆奶盖",
    "is_enable": 1,
    "price": "22",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 20.75 },

  {
    "id": 729,
    "name": "芝芝嫣红2.0",
    "no": "1911064895831191",
    "description": "冷/热 500ml 芝士分装无法选择烤黑糖。喜茶定制红茶，茶底全新升级为蜜香红茶，汤色红艳明亮，口味丰富深沉。",
    "label": "",
    "category_id": 1,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 86979,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/06/66ee47abea144200ad9545038f07f3e1.jpg" },

    {
      "id": 117365,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/9bf19da3d15e47309857ca6f0a374a0f.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "有豆豆奶盖",
    "is_enable": 1,
    "price": "22",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 20.75 }],


  "categoryAds": [] },

{
  "id": 15,
  "name": "喜茶咖啡",
  "sort": 8,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/50609654ded746f28ea60485a7e715b5.jpg",
  "products": [
  {
    "id": 990,
    "name": "雪山香草拿铁",
    "no": "2003273864428595",
    "description": "冷500ml 热360ml 因热饮鲜奶油易融，推荐选择分装，敬请谅解。香草牛奶拿铁与香草鲜奶油雪顶灵感碰撞，缀以酥脆可口的碧根果碎，散发出柔和的坚果香及奶香。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 127384,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/27/22757b7d429c49929da91462c19308ec.jpg" },

    {
      "id": 129024,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/01/627939658eff4a9cba5a848dac2d2956.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 79,
      "name": "含乳制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 989,
    "name": "雪山摩卡",
    "no": "2003271920921171",
    "description": "冷500ml 热360ml 因热饮鲜奶油易融，推荐选择分装，敬请谅解。口感浓郁的可可牛奶摩卡，以入口即化的香草鲜奶油封顶，再轻撒上可可粉，交织出更加丰富的咖啡口感。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 129039,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/01/7a7b828bf69b4ad59a46ad9500c915e6.jpg" },

    {
      "id": 129025,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/01/41e2e384cc824a63aebf2fc8285ea580.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 330,
    "name": "芝芝咖啡",
    "no": "1903209749549957",
    "description": "冷500ml  热360ml  咖啡外送可能会影响口感。意式奶咖与喜茶芝士的默契结合，带来更浓郁的奶香。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 110986,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/12/0953921c70694dd08017c3566d21bb3e.jpg" },

    {
      "id": 117366,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/9ca5660ac7584711a1e687f880c17bd9.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58 },

  {
    "id": 332,
    "name": "咖啡波波冰",
    "no": "1903204953514910",
    "description": "冷480ml  热360ml  咖啡外送可能会影响口感。现萃Espresso沁入细密冰沙，佐以Q弹黑糖波波，混搭出新格调。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 83013,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/17/3db0e2c514574207972f6760b6aec5d3.jpg" },

    {
      "id": 117130,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/b264c852833d4622ace76ae374f5d7d7.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58 },

  {
    "id": 786,
    "name": "拿铁(无糖)",
    "no": "1912139005357496",
    "description": "热360ML 冷500ML。选用优质阿拉比卡咖啡豆拼配，现萃咖啡融入蒸煮牛奶，呈现经典拿铁的香纯。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 132284,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/0347a8c6fbee4c9c9043fff1ab3a39dc.jpg" },

    {
      "id": 132393,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/9f200190cba74818b933e8c19efbf267.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 17.92 },

  {
    "id": 787,
    "name": "美式(无糖)",
    "no": "1912139775970865",
    "description": "热360ML 冷500ML。选用优质阿拉比卡咖啡豆拼配，原豆现磨，冲泡出纯粹饱满的咖啡香气。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 132285,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/baedb7f7c90343c68490f6ef3b56b39e.jpg" },

    {
      "id": 132391,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/97facddd55fd4235bc6be7a6fbe96251.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 82,
      "name": "含咖啡",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "13",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 12.26 }],


  "categoryAds": [] },

{
  "id": 7,
  "name": "热饮推荐",
  "sort": 9,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/72b2d1e753464b5a837618e24bc857c3.jpg",
  "products": [
  {
    "id": 651,
    "name": "热阿华田波波",
    "no": "1910180943088468",
    "description": "500ml 喜茶×阿华田联名款，口感较甜腻。颗颗软糯的黑糖波波坠入鲜牛奶，结合活力满满的阿华田酷脆酱、阿华田脆脆与黑糖布蕾，口口香脆。如需选购冷饮，请在波波家族点选。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 94128,
      "url": "https://go.cdn.heytea.com/storage/product/2019/12/06/47a76b8d425a41ff988b12d4c1f16e5f.jpg" },

    {
      "id": 116577,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/35198bd91dc24b02adf8c52a7381b3a3.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "28",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 26.42 },

  {
    "id": 652,
    "name": "热奶茶波波",
    "no": "1910189005370634",
    "description": "500ml  经典奶茶回归，浓郁阿萨姆红茶搭配纯鲜牛乳打制，黑糖波波与布蕾的组合让口感层次更加丰富。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 94132,
      "url": "https://go.cdn.heytea.com/storage/product/2019/12/06/72bbb1e88e644114ab4fd66575e35efb.jpg" },

    {
      "id": 116597,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/897eabd7269d4173b5bb7596eec497ad.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "国内",
    "is_enable": 1,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 1071,
    "name": "热香草拿铁",
    "no": "2005189358606057",
    "description": "热360ml。选用优质阿拉比卡咖啡豆拼配，清新香草，风味融于现萃咖啡拿铁，香气馥郁。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 150321,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/3df5323771164e91a34a9b66b5a4a93f.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 843,
    "name": "热拿铁(无糖)",
    "no": "2001020664302393",
    "description": "360ML  选用优质阿拉比卡咖啡豆拼配，现萃咖啡融入蒸煮牛奶，呈现经典拿铁的香纯。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 8,
    "images": [
    {
      "id": 132286,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/b0310c0436e142b8a137e459cba41872.jpg" },

    {
      "id": 132394,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/0d611cf4ca9a4a78996f5f6ae58cc94e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 17.92 },

  {
    "id": 175,
    "name": "热满杯红柚",
    "no": "1812195149541014",
    "description": "500ml 精选饱满红柚果粒入茶，清幽绿妍茶底洋溢茉莉花香。热气氤氲的茶汤，带出红柚的酸甜。若选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。如需选购冷饮，请在果茶家族内选购。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 9,
    "images": [
    {
      "id": 94137,
      "url": "https://go.cdn.heytea.com/storage/product/2019/12/06/53dfa505c0374a3c8c1e591ef5f62cfa.jpg" },

    {
      "id": 117024,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/02b673e5db164b0cb3f86f94f551de51.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58 },

  {
    "id": 780,
    "name": "热空气巧克力波波",
    "no": "1912127891374933",
    "description": "500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油与空气巧克力交织出圣诞好味。饮用步骤：1.先用搭配的小勺吃掉奶油和空气巧克力；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 106302,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/15/38ff7925b24e45f396a53055be81e0b0.jpg" },

    {
      "id": 116593,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/32ebc886275f4bd3b1822378c16bb880.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "28",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 26.42 },

  {
    "id": 781,
    "name": "热m豆波波",
    "no": "1912127683531223",
    "description": "500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油顶是m豆们的奇妙游乐园。饮用步骤：1.先用搭配的小勺吃掉奶油和m豆；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 106303,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/15/bf760fd398bf4ae08b1c556550e385e6.jpg" },

    {
      "id": 116574,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/7263f087592a428a8581d4e8c3f88e75.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 283,
    "name": "热芋泥波波鲜奶",
    "no": "1901144910150975",
    "description": "500ml 因芋泥容易氧化，为保持最佳体验，请务必于一小时内饮用完毕。茶底可选鲜奶/椰奶。手捣新鲜芋泥融入顺滑鲜奶，再加入颗颗Q弹的芋泥波波，绵密与润泽，尽在这一杯。如需选购冷饮，请在波波家族点选。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 106698,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/16/546e45531ff54693af2fa84cbcab8dff.jpg" },

    {
      "id": 116601,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/aaef384a606640fbaa4c5f35ad3291e1.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "通用",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 734,
    "name": "热烤黑糖波波鲜奶",
    "no": "1911118126262032",
    "description": "500ml  黑糖珍珠搭配顺滑鲜奶，波波系列奶味较为浓郁，不喜欢浓厚口感的朋友慎点。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 94130,
      "url": "https://go.cdn.heytea.com/storage/product/2019/12/06/e1f41f7109294b3b857b8bb170769ff7.jpg" },

    {
      "id": 116589,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/9712450d1eda45ea8a421dfc05e4a824.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "21",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 19.81 }],


  "categoryAds": [] },

{
  "id": 6,
  "name": "纯茶",
  "sort": 10,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/43c745f3ead64208830401107c44eef2.jpg",
  "products": [
  {
    "id": 27,
    "name": "纯绿妍",
    "no": "1902229954555253",
    "description": "冷/热500ml（纯茶系列无芝士）喜茶定制绿茶，气质淡雅芳幽，散发着清逸的茉莉香气，馥郁怡人。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 82988,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/17/a2544f719c444feb92bffb1e0c806b15.jpg" },

    {
      "id": 118894,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/07/a9633f04b796445cb7f06a3f35eacc6e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "13",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 12.26 },

  {
    "id": 281,
    "name": "纯金玉",
    "no": "1901104953102101",
    "description": "冷/热500ml（纯茶系列无芝士）喜茶定制乌龙，清新茶香中带有桂花香和淡淡的乳香，馥郁迷人。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 82989,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/17/7fc2a04e49c64d4e9bacbd927c0b7831.jpg" },

    {
      "id": 118896,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/07/0c371c50084a43e78378ae651d043cc8.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09 },

  {
    "id": 29,
    "name": "纯金凤茶王",
    "no": "1902225410210057",
    "description": "冷/热500ml（纯茶系列无芝士）喜茶定制乌龙茶，香气炭焙浓郁，入喉回甘，茶香余韵不断。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 82990,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/17/ebd9855a95c8409786028992347908ab.jpg" },

    {
      "id": 118897,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/07/d0ec2ad62d034109beded6cc0cf7e9f4.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09 },

  {
    "id": 31,
    "name": "纯嫣红2.0",
    "no": "1902229953995457",
    "description": "冷/热500ml（纯茶系列无芝士）喜茶定制红茶，茶底全新升级为蜜香红茶，汤色红艳明亮，口味丰富深沉。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 83919,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/22/72cffdd3f5e04521bbdefcbd4adb752d.jpg" },

    {
      "id": 118898,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/07/84d30cb807ac48ccb3621318eb049e8d.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09 },

  {
    "id": 1049,
    "name": "纯奶茶",
    "no": "2004304604998948",
    "description": "冷/热500ml 精选阿萨姆红茶搭配牛奶调制，茶香浓郁，口感如丝般顺滑。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 141380,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/30/87b82a1b87cc4858a8b39d53e29ed690.jpg" },

    {
      "id": 141374,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/30/c9c4430e4e55453bbdf318467867ae1d.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "22",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 20.75 },

  {
    "id": 904,
    "name": "冷萃桂花绿",
    "no": "2002116613548083",
    "description": "冷萃茶不用等待叫号，可直接向店员出示后领取。细嫩茶芽与桂花一同于冷露中舒展沐浴八小时，制得茶汤清黄透亮，滋味鲜爽。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 110880,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/11/f8adbf0d089e45ddaddc1e84547bcdf7.jpg" },

    {
      "id": 116987,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/9734c2930f964a40a098413e435d0944.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2105,
      "name": "冷萃桂花绿",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "国内-纯茶",
    "is_enable": 0,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 8.49 },

  {
    "id": 1048,
    "name": "纯可可",
    "no": "2004300946915874",
    "description": "冷/热500ml 醇香可可搭配牛奶调制，交织出经典可可风味。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 141370,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/30/e0cbafb366934472bb72dca1d9882779.jpg" },

    {
      "id": 141375,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/30/273d81568dc045eb8d3e17f9dbad52b5.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "23",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 21.70 }],


  "categoryAds": [] },

{
  "id": 9,
  "name": "加料",
  "sort": 11,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/19047118303443b09ba73f82c54e4f03.jpg",
  "products": [
  {
    "id": 48,
    "name": "芝士",
    "no": "1908069651779130",
    "description": "1.加在饮品里（请备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 60,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/22/BQiF2x5F5UHpdyrWGuomkha6cHCzajwacbSzJWrU.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "6",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 5.66 },

  {
    "id": 51,
    "name": "加料冰淇淋",
    "no": "1908066825277032",
    "description": "不是单独吃的冰淇淋，如需购买直接吃的冰淇淋请在“喜茶制冰”系列选购。温馨提示：冰淇淋运送途中易融化，请酌情加购。1.加在饮品里（请您务必备注需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "冰激淋",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 133116,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/09/c912c1ab408b4003ada51a1e827f549e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "6",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 5.66 },

  {
    "id": 95,
    "name": "脆波波",
    "no": "1908065534921229",
    "description": "脆波波无法添加在热饮里，比较适合添加在水果类饮品中。1.加在饮品里（请您务必备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 192,
      "url": "https://go.cdn.heytea.com/storage/products/2018/07/15/JUCyrE0xWBQJx2h702r36Hroj9iIvk1Sx8I4xqHU.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "3",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 2.83 },

  {
    "id": 52,
    "name": "红柚果粒",
    "no": "1908064628880923",
    "description": "1.加在饮品里（请备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 78,
      "url": "https://go.cdn.heytea.com/storage/products/2018/05/03/qOcLwgnk2Ag0yXKrlhgv4DGViu3T6xzEwho753il.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "2",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 1.89 },

  {
    "id": 89,
    "name": "黑波波",
    "no": "1908060875032077",
    "description": "黑波波因为口味不搭，无法添加在任何含水果的饮品里。由于黑波波本身自带甜度，还请酌情调整饮品甜度。1.加在饮品里（请您务必备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 163,
      "url": "https://go.cdn.heytea.com/storage/products/2018/06/12/7STwzMTlbwolNHyOeTZHoEfOWZPp7yyEUUiwLLRx.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "2",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 1.89 },

  {
    "id": 46,
    "name": "芋圆波波",
    "no": "1908063932379542",
    "description": "1.加在饮品里（请备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 816,
      "url": "https://go.cdn.heytea.com/storage/products/2018/10/08/zyRESIONRRKD93SzsK82Bd4bbCCMwmmvuLeXbMVj.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "3",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 2.83 }],


  "categoryAds": [] },

{
  "id": 59,
  "name": "共同抗疫",
  "sort": 12,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/529845ef52584ca1adca3af88ebf1c66.jpg",
  "products": [
  {
    "id": 868,
    "name": "无接触配送",
    "no": "2001147783071999",
    "description": "防疫期间，您可通过订单备注及电话告知等方式，引导骑手将外卖商品放在指定位置，例如：悬挂门把手、放置大堂桌面，避免接触，降低风险。由于茶饮均为现点现制，高峰期外送时间预计为1小时左右，建议您提前点单。如果您有任何建议或遇到配送、撒漏等问题，可拨打本店电话反馈（高峰期可能会出现忙线，还请谅解），也可前往喜茶GO-我的-联系客服，我们会尽快为您处理。",
    "label": "",
    "category_id": 59,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 106625,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/16/a70891bef83a4aa2b0f7c5b7d7ca1fd5.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2040,
      "name": "无接触配送",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 884,
    "name": "日常防疫",
    "no": "2001291964122103",
    "description": "1.尽量避免出门，出门必须戴上口罩；2.避免在无保护的情况下接触家禽家畜；3.烹制时彻底煮熟肉类和蛋类；4.咳嗽和打喷嚏时使用纸巾或弯曲手肘掩盖口鼻，立刻消毒双手；5.多喝温水，保持喉咙湿润；6.勤洗手勤消毒；7.规律作息。",
    "label": "",
    "category_id": 59,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 109315,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/29/59c79fe328ce49c98b469e5e3893bc69.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2075,
      "name": "日常防疫",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 887,
    "name": "门店防疫",
    "no": "2001290337601885",
    "description": "1.店员每日测量体温，全天佩戴口罩手套，每小时洗手消毒。2.每小时消毒店内可接触物，每四小时清洗消毒餐具。3.最大程度保持门店通风透气。4.门店现仅接受喜茶GO小程序点单，降低接触频次。5.顾客及骑手须佩戴口罩方可进店。6.骑手进店前测量体温，所有外卖订单采取无接触配送。我们希望为大家提供安全的环境，愉快喝茶。",
    "label": "",
    "category_id": 59,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 109320,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/29/fce916a50b5b46bdb31e862fe50f59b5.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2078,
      "name": "门店防疫",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 886,
    "name": "医护关怀 优先制作",
    "no": "2001296678335151",
    "description": "所有医院和防疫中心的外送订单，我们都将予以优先制作，尽微薄之力为一线医生和护士提供一些支持。愿医务人员们平安凯旋。",
    "label": "",
    "category_id": 59,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 109319,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/29/f57d3859f66b4ffe9a43e641d023fc2b.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2077,
      "name": "医护关怀 优先制作",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 }],


  "categoryAds": [] },

{
  "id": 8,
  "name": "灵感提示",
  "sort": 13,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/6d5e68f5b2bd4fa2bb50f94e6ac0a512.jpg",
  "products": [
  {
    "id": 386,
    "name": "好果",
    "no": "1905133973948690",
    "description": "选用水果或nfc(100%鲜榨非浓缩还原)鲜果汁，不添加任何色素，香精。饮品颜色（如粉色）完全使用新鲜水果调色。因鲜果具有差异性，颜色，口味有时会有细微差别，希望能理解~",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 43204,
      "url": "https://go.cdn.heytea.com/product/2019/05/13/tmp/5ff509ec0bef4d17845fc8f788240945.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1299,
      "name": "好果",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 41,
    "name": "联系我们",
    "no": "1905150527205146",
    "description": "如有配送、洒漏、口味等问题，请尽快联系我们，我们将尽快解决为您重做。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 50,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/ygQajpQgwl61yLFjiPNlKb27irYd9Wrkwf8udrZG.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1321,
      "name": "联系我们",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 42,
    "name": "星球须知",
    "no": "1905274655799328",
    "description": "1.由于鲜奶打制，配送中芝士/轻芝士饮品可能会出现芝士下沉和茶混合的现象。2.冰沙类饮品配送中可能出现融化。3.热茶饮均为500ml规格，热咖啡均为360ml规格，望周知谅解。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 51,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/ecr5boTxqal4bpRBoK4pqks8SGlBxiBwgvAVWYDG.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1322,
      "name": "星球须知",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 43,
    "name": "好茶",
    "no": "1907103183786764",
    "description": "使用原产地定制原茶茶叶，我们希望用一杯好茶激发你的一份灵感。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 52,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/XxWAOA4cykEeUwAbKZLuIHLEdXS96M4NSBLEOsEp.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1323,
      "name": "好茶",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 44,
    "name": "好奶",
    "no": "1907102611854675",
    "description": "选用高品质冷藏鲜奶，高品质淡奶油，芝士使用鲜奶打制，不使用任何脂质沫（奶精、奶盖粉）。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 53,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/qS2cxdfDrzgCmAMATXlclkaXecBXLGWGMPBkl60P.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1324,
      "name": "好奶",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 45,
    "name": "好糖",
    "no": "1907106785814826",
    "description": "使用优质糖分，可于下单时按个人口味调整添加的糖分。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 54,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/17YCgUYwldCLGHEcNDJPjM68TQ9PaEUpp6voCUTk.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1325,
      "name": "好糖",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9992",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8842.48 },

  {
    "id": 104,
    "name": "过敏原",
    "no": "1905274126391239",
    "description": "部分饮品中含有乳制品、菠萝、芒果、大麦、小麦、麦芽制品等致敏物，请酌情选择。部分饮品中含有果肉、珍珠、芋圆等大颗粒物，请勿大力吸入，老人、儿童、孕妇请谨慎饮用。所有茶类饮品皆含咖啡因，如对咖啡因过敏，请谨慎选择。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 289,
      "url": "https://go.cdn.heytea.com/storage/products/2018/08/09/sDzZBhV27AdVpth9bwpVSnY1WhreD3EN02MqE0r2.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1327,
      "name": "过敏原",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 462,
    "name": "自带杯 减2元",
    "no": "1906215019076002",
    "description": "我们更鼓励大家自带杯到店饮茶，并且每杯饮品可享受减2元优惠。减少使用饮品杯，一起为地球做好事。*自带杯指定规格：洁净可受热，杯口≥6CM，容量≥500ML。本活动仅限门店现场点单，不与其他优惠共享，感谢理解。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 8,
    "images": [
    {
      "id": 54642,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/b8d76851e21b469c98978adccec77715.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1273,
      "name": "自带杯 减2元",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 465,
    "name": "让垃圾各归各家",
    "no": "1906210816159145",
    "description": "我们现已在门店设置了分类垃圾桶，请将垃圾分好类再入桶，和茶茶一起分清标识，环保不迷路。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 9,
    "images": [
    {
      "id": 54640,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/0e79195904794fb6b23b466d00694eb8.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1276,
      "name": "让垃圾各归各家",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 884.07 },

  {
    "id": 463,
    "name": "一起使用纸吸管",
    "no": "1906210475943584",
    "description": "少取用吸管，支持环保减塑。我们现已提供环保纸吸管及常规吸管两项选择，由于纸吸管长时间浸泡强度易下降，取用纸吸管的朋友请尽快饮用噢。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 10,
    "images": [
    {
      "id": 54615,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/35794eb50dd344f488affedffa62d170.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1274,
      "name": "一起使用纸吸管",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 884.07 },

  {
    "id": 464,
    "name": "不打包 更环保",
    "no": "1906215007742339",
    "description": "一起来参与不打包行动。如需打包，请选择店内的可降解打包袋，更欢迎大家自带环保袋噢。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 11,
    "images": [
    {
      "id": 54641,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/f2523f450e9b4c4bbce58d88dd83bdf4.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1275,
      "name": "不打包 更环保",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 884.07 },

  {
    "id": 466,
    "name": "纸巾按需取用",
    "no": "1906216036305300",
    "description": "节约一张纸，守护一棵树。请按需取用店内纸巾，减少不必要的浪费。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 12,
    "images": [
    {
      "id": 54639,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/fad86c295f2840bda47d06600a8c9e02.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1277,
      "name": "纸巾按需取用",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 884.07 },

  {
    "id": 467,
    "name": "循环利用 激发灵感",
    "no": "1906212821448901",
    "description": "我们提供的外带纸袋、饮品纸杯及纸杯套都是由可回收材料制成，用灵感点亮生活的每一个瞬间，希望每一个被带走的纸袋、杯套及纸杯，都能在大家的妙手下得到二次创作使用噢。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 13,
    "images": [
    {
      "id": 54638,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/81411128480f45bf8dcd56038b5d66cb.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1278,
      "name": "循环利用 激发灵感",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "998",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 883.19 }],


  "categoryAds": [] },

{
  "id": 11,
  "name": "波波家族",
  "sort": 7,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/0dd0e6e55c4b4f119fadda81b0a7b3f8.jpg",
  "products": [
  {
    "id": 706,
    "name": "豆豆波波茶",
    "no": "1911010700649582",
    "description": "冷/热500ml 选用浓郁阿萨姆奶茶茶底。浓厚黄豆粉、芋圆波波搭配秘制豆乳奶盖，底部藏有滑嫩豆花。饮用秘籍：1.舀起顶部小丸子和豆奶盖先尝，2.吸管一插到底，再吸豆花与奶茶。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 87818,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/09/5f9e812aec954a8b88a184ca6d81e8cc.jpg" },

    {
      "id": 116603,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/34f79e5ab5e844179bc4c0263a0ad57c.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 88,
      "name": "含乳制品、大豆、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "最新",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 68,
    "name": "烤黑糖波波鲜奶",
    "no": "1812209997985397",
    "description": "冷480ml 热500ml  黑糖珍珠搭配顺滑鲜奶，波波系列奶味较为浓郁，不喜欢浓厚口感的朋友慎点。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 71356,
      "url": "https://go.cdn.heytea.com/product/2019/08/31/tmp/1258f79c91c04932bec8b09eb7eebb90.jpg" },

    {
      "id": 116584,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/1b653ccc95344896bdf1f0b0ddca5be1.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "唯一",
    "is_enable": 0,
    "price": "21",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 19.81 },

  {
    "id": 133,
    "name": "芋泥波波鲜奶",
    "no": "1812279955525098",
    "description": "冷/热500ml  默认冷饮，可做热。因芋泥容易氧化，为保持最佳体验，请务必于一小时内饮用完毕。茶底可选鲜奶/椰奶。手捣新鲜芋泥融入顺滑鲜奶，再加入颗颗Q弹的芋泥波波，绵密与润泽，尽在这一杯。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 106697,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/16/9e614ed804284ed888b1913c4459ab93.jpg" },

    {
      "id": 116599,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/fe91df89885d42ffa8e8c0c58d34c6e5.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "国内",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 770,
    "name": "m豆波波",
    "no": "1912064611771955",
    "description": "冷480ml  热 500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油顶是m豆们的奇妙游乐园。饮用步骤：1.先用搭配的小勺吃掉奶油和m豆；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 106300,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/15/c067c03758e4440ea8463743dd9f6941.jpg" },

    {
      "id": 116575,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/ffd1a8461b8141b09d8d0d466cffc82e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 771,
    "name": "空气巧克力波波",
    "no": "1912062784685912",
    "description": "冷480ml  热 500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油与空气巧克力交织出圣诞好味。饮用步骤：1.先用搭配的小勺吃掉奶油和空气巧克力；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 106299,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/15/1b193e1b37e84fb49e0fd0101b58a6a2.jpg" },

    {
      "id": 116594,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/852db33dcf4d4d17b13971a6c42dc4e2.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "28",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 26.42 },

  {
    "id": 890,
    "name": "芋泥黑糖波波",
    "no": "2002020137219017",
    "description": "冷/热500ml 因芋泥易氧化，为保持最佳口感，建议于一小时内饮用完毕。手捣新鲜芋泥融入顺滑牛奶，Q弹黑波波甜香浓郁。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 109837,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/02/b42a4e5690d742e8abab89610bd865b2.jpg" },

    {
      "id": 117358,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/e7691652c4a046bdbd6fbb7862436226.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 334,
    "name": "奶茶波波冰",
    "no": "1903205298100979",
    "description": "冷480ml 热500ml  由于冰沙外送易化，口感会略受影响，敬请谅解。经典奶茶回归，浓郁阿萨姆红茶搭配纯鲜牛乳打制细腻冰沙，黑糖波波和冰淇淋球的组合让口感层次更加丰富。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 106879,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/17/6fb20e4943944d7bb00a0034563c664a.jpg" },

    {
      "id": 116596,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/6217859b873f47be860b3f37ed5701d4.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "国内",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 }],


  "categoryAds": [] }];exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map