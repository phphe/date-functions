/*!
 * date-functions v1.0.10
 * phphe <phphe@outlook.com> (https://github.com/phphe)
 * https://github.com/phphe/date-functions.git
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.dateFunctions = global.dateFunctions || {})));
}(this, (function (exports) { 'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * helper-js v1.3.0
 * (c) 2018-present phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return _get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

// local store
var store = {}; // get global

function glb() {
  if (store.glb) {
    return store.glb;
  } else {
    // resolve global
    var t;

    try {
      t = global;
    } catch (e) {
      t = window;
    }

    store.glb = t;
    return t;
  }
} // is 各种判断

function isset(v) {
  return typeof v !== 'undefined';
}
function isArray(v) {
  return Object.prototype.toString.call(v) === '[object Array]';
}
function isNumeric(v) {
  return isFinite(v);
}
function isString(v) {
  return Object.prototype.toString.call(v) === '[object String]';
}
function isObject(v) {
  return Object.prototype.toString.call(v) === '[object Object]';
}
function isFunction(v) {
  return typeof v === 'function';
}
function numRand(min, max) {
  if (arguments.length === 1) {
    max = min;
    min = 0;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}
function max(n, max) {
  return n < max ? n : max;
} // str 字符

function studlyCase(str) {
  return str && str[0].toUpperCase() + str.substr(1);
}
function strRand() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var r = '';
  var seeds = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < len; i++) {
    r += seeds[numRand(seeds.length - 1)];
  }

  return prefix + r;
}
function replaceMultiple(mapObj, str) {
  var reg = new RegExp(Object.keys(mapObj).join('|'), 'g');
  return str.replace(reg, function (matchedKey) {
    return mapObj[matchedKey];
  });
} // array

function arrayLast(arr) {
  return arr[arr.length - 1];
}
function toArrayIfNot(arrOrNot) {
  return isArray(arrOrNot) ? arrOrNot : [arrOrNot];
} // n can be getter(number of times)
// n可以是方法, 参数1是第几次分块

function splitArray(arr, n) {
  var r = [];

  if (isFunction(n)) {
    var getChunkLength = n;
    var times = 1;
    var i = 0;

    while (i < arr.length) {
      var _n = getChunkLength(times);

      var end = i + _n;
      r.push(arr.slice(i, end));
      i = end;
      times++;
    }
  } else {
    var _i = 0;

    while (_i < arr.length) {
      var _end = _i + n;

      r.push(arr.slice(_i, _end));
      _i = _end;
    }
  }

  return r;
}
function objectGet(obj, path, throwError) {
  var paths = isArray(path) ? path : path.split('.');
  var current = obj;

  try {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = paths[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var key = _step2.value;
        current = current[key];
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  } catch (e) {
    if (throwError) {
      throw "Path does not exist";
    }
  }

  return current;
}
function cloneObj(obj, exclude) {
  var type = _typeof(obj);

  switch (type) {
    case 'undefined':
    case 'boolean':
    case 'nuber':
    case 'string':
    case 'function':
      return obj;
      break;

    case 'object':
      if (obj === null) {
        // null is object
        return obj;
      }

      var r;

      if (isArray(obj)) {
        r = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = obj[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var item = _step3.value;
            r.push(cloneObj(item, exclude));
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      } else {
        r = {};

        var _arr2 = Object.keys(obj);

        for (var _i7 = 0; _i7 < _arr2.length; _i7++) {
          var key = _arr2[_i7];

          if (!exclude || isArray(exclude) && !exclude.includes(key) || !exclude(key, obj[key], obj)) {
            r[key] = cloneObj(obj[key], exclude);
          }
        }
      }

      return r;
      break;

    default:
      return obj;
      break;
  }
}
function mapObjects(arr, idKey) {
  var r = {};
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    var item = arr[i];
    var id = isFunction(idKey) ? idKey(item, i) : item[idKey];
    r[id] = item;
  }

  return r;
} //

/* eslint-enable */
// dom

function uniqueId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id_';
  var id = prefix + strRand();
  if (!store.uniqueId) store.uniqueId = {};
  var generatedIds = store.uniqueId;

  if (document.getElementById(id) || generatedIds[id]) {
    return uniqueId(prefix);
  } else {
    generatedIds[id] = true;
    return id;
  }
}
function getOffsetParent(el) {
  var offsetParent = el.offsetParent;

  if (!offsetParent || offsetParent === document.body && getComputedStyle(document.body).position === 'static') {
    offsetParent = document.body.parentElement;
  }

  return offsetParent;
} // get el current position. like jQuery.position
function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
} // source: http://youmightnotneedjquery.com/

function onDOM(el, name, handler) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key6 = 3; _key6 < _len5; _key6++) {
    args[_key6 - 3] = arguments[_key6];
  }

  if (el.addEventListener) {
    // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.addEventListener.apply(el, [name, handler].concat(args));
  } else if (el.attachEvent) {
    // IE 8 及更早 IE 版本
    el.attachEvent.apply(el, ["on".concat(name), handler].concat(args));
  }
}
// binarySearch 二分查找

function binarySearch(arr, callback, start, end, returnNearestIfNoHit) {
  var max = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1000;
  var midNum;
  var mid;

  if (start == null) {
    start = 0;
    end = arr.length - 1;
  }

  var i = 0;
  var r;

  while (start >= 0 && start <= end) {
    if (i >= max) {
      throw Error("binarySearch: loop times is over ".concat(max, ", you can increase the limit."));
    }

    midNum = Math.floor((end - start) / 2 + start);
    mid = arr[midNum];
    r = callback(mid, i);

    if (r > 0) {
      end = midNum - 1;
    } else if (r < 0) {
      start = midNum + 1;
    } else {
      return {
        index: midNum,
        value: mid,
        count: i + 1,
        hit: true
      };
    }

    i++;
  }

  return returnNearestIfNoHit ? {
    index: midNum,
    value: mid,
    count: i + 1,
    hit: false,
    bigger: r > 0
  } : null;
} //

function retry(func) {
  var limitTimes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  if (!store.retry) store.retry = {};
  var counters = retry;
  var name = generateName();
  counters[name] = 0;
  return doFunc;

  function doFunc(arg1, arg2, arg3) {
    return func(arg1, arg2, arg3).then(function (data) {
      delete counters[name];
      return data;
    }).catch(function (e) {
      counters[name]++;

      if (counters[name] >= limitTimes) {
        delete counters[name];
        return Promise.reject(e);
      } else {
        return doFunc(arg1, arg2, arg3);
      }
    });
  }

  function generateName() {
    var name = Math.random() + '';

    if (counters[name]) {
      return generateName();
    } else {
      return name;
    }
  }
} // 复制文字到剪贴板

var URLHelper =
/*#__PURE__*/
function () {
  // protocol, hostname, port, pastname
  function URLHelper(baseUrl) {
    var _this2 = this;

    _classCallCheck(this, URLHelper);

    Object.defineProperty(this, "baseUrl", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: ''
    });
    Object.defineProperty(this, "search", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {}
    });
    var t = decodeURI(baseUrl).split('?');
    this.baseUrl = t[0];

    if (t[1]) {
      t[1].split('&').forEach(function (v) {
        var t2 = v.split('=');
        _this2.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
      });
    }
  }

  _createClass(URLHelper, [{
    key: "getHref",
    value: function getHref() {
      var _this3 = this;

      var t = [this.baseUrl];
      var searchStr = Object.keys(this.search).map(function (k) {
        return "".concat(k, "=").concat(encodeURIComponent(_this3.search[k]));
      }).join('&');

      if (searchStr) {
        t.push(searchStr);
      }

      return t.join('?');
    }
  }]);

  return URLHelper;
}(); // 解析函数参数, 帮助重载
function makeStorageHelper(storage) {
  return {
    storage: storage,
    set: function set(name, value, minutes) {
      if (value == null) {
        this.storage.removeItem(name);
      } else {
        this.storage.setItem(name, JSON.stringify({
          value: value,
          expired_at: minutes ? new Date().getTime() + minutes * 60 * 1000 : null
        }));
      }
    },
    get: function get$$1(name) {
      var t = this.storage.getItem(name);

      if (t) {
        t = JSON.parse(t);

        if (!t.expired_at || t.expired_at > new Date().getTime()) {
          return t.value;
        } else {
          this.storage.removeItem(name);
        }
      }

      return null;
    },
    clear: function clear() {
      this.storage.clear();
    }
  };
}
var EventProcessor =
/*#__PURE__*/
function () {
  function EventProcessor() {
    _classCallCheck(this, EventProcessor);

    Object.defineProperty(this, "eventStore", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: []
    });
  }

  _createClass(EventProcessor, [{
    key: "on",
    value: function on(name, handler) {
      this.eventStore.push({
        name: name,
        handler: handler
      });
    }
  }, {
    key: "once",
    value: function once(name, handler) {
      var _this4 = this;

      var off = function off() {
        _this4.off(name, wrappedHandler);
      };

      var wrappedHandler = function wrappedHandler() {
        handler();
        off();
      };

      this.on(name, wrappedHandler);
      return off;
    }
  }, {
    key: "off",
    value: function off(name, handler) {
      var indexes = []; // to remove indexes; reverse; 倒序的

      var len = this.eventStore.length;

      for (var i = 0; i < len; i++) {
        var item = this.eventStore[i];

        if (item.name === name && item.handler === handler) {
          indexes.unshift(i);
        }
      }

      for (var _i8 = 0; _i8 < indexes.length; _i8++) {
        var index = indexes[_i8];
        this.eventStore.splice(index, 1);
      }
    }
  }, {
    key: "emit",
    value: function emit(name) {
      // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
      var items = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.eventStore[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var item = _step5.value;

          if (item.name === name) {
            items.push(item);
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key8 = 1; _key8 < _len7; _key8++) {
        args[_key8 - 1] = arguments[_key8];
      }

      for (var _i9 = 0; _i9 < items.length; _i9++) {
        var _item = items[_i9];

        _item.handler.apply(_item, args);
      }
    }
  }]);

  return EventProcessor;
}();
var CrossWindow =
/*#__PURE__*/
function (_EventProcessor) {
  _inherits(CrossWindow, _EventProcessor);

  function CrossWindow() {
    var _this5;

    _classCallCheck(this, CrossWindow);

    _this5 = _possibleConstructorReturn(this, (CrossWindow.__proto__ || Object.getPrototypeOf(CrossWindow)).call(this));
    Object.defineProperty(_assertThisInitialized(_this5), "storageName", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: '_crossWindow'
    });
    var cls = CrossWindow;

    if (!cls._listen) {
      cls._listen = true;
      onDOM(window, 'storage', function (ev) {
        if (ev.key === _this5.storageName) {
          var _get2;

          var event = JSON.parse(ev.newValue);

          (_get2 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", _assertThisInitialized(_this5))).call.apply(_get2, [_this5, event.name].concat(_toConsumableArray(event.args)));
        }
      });
    }

    return _this5;
  }

  _createClass(CrossWindow, [{
    key: "emit",
    value: function emit(name) {
      var _get3;

      for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key9 = 1; _key9 < _len8; _key9++) {
        args[_key9 - 1] = arguments[_key9];
      }

      (_get3 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", this)).call.apply(_get3, [this, name].concat(args));

      glb().localStorage.setItem(this.storageName, JSON.stringify({
        name: name,
        args: args,
        // use random make storage event triggered every time
        // 加入随机保证触发storage事件
        random: Math.random()
      }));
    }
  }]);

  return CrossWindow;
}(EventProcessor);

// Most of the methods will affect the original object
// 大部分方法将影响原对象
//
function clone(dateObj) {
  return new Date(dateObj.getTime());
}
function change(dateObj, type, n) {
  var setFuncName = 'set' + type;
  var getFuncName = 'get' + type;
  dateObj[setFuncName](dateObj[getFuncName]() + n);
  return dateObj;
}

function addSeconds(dateObj, n) {
  return change(dateObj, 'Seconds', n);
}
function addSecond(dateObj) {
  return addSeconds(dateObj, 1);
}
function subSeconds(dateObj, n) {
  return addSeconds(dateObj, -n);
}
function subSecond(dateObj) {
  return addSeconds(dateObj, -1);
}

function addMinutes(dateObj, n) {
  return change(dateObj, 'Minutes', n);
}
function addMinute(dateObj) {
  return addMinutes(dateObj, 1);
}
function subMinutes(dateObj, n) {
  return addMinutes(dateObj, -n);
}
function subMinute(dateObj) {
  return addMinutes(dateObj, -1);
}

function addHours(dateObj, n) {
  return change(dateObj, 'Hours', n);
}
function addHour(dateObj) {
  return addHours(dateObj, 1);
}
function subHours(dateObj, n) {
  return addHours(dateObj, -n);
}
function subHour(dateObj) {
  return addHours(dateObj, -1);
}

function addDays(dateObj, n) {
  return change(dateObj, 'Date', n);
}
function addDay(dateObj) {
  return addDays(dateObj, 1);
}
function subDays(dateObj, n) {
  return addDays(dateObj, -n);
}
function subDay(dateObj) {
  return addDays(dateObj, -1);
}
function addMonths(dateObj, n) {
  return change(dateObj, 'Month', n);
}
function addMonth(dateObj) {
  return addMonths(dateObj, 1);
}
function subMonths(dateObj, n) {
  return addMonths(dateObj, -n);
}
function subMonth(dateObj) {
  return addMonths(dateObj, -1);
}
function addYears(dateObj, n) {
  return change(dateObj, 'FullYear', n);
}
function addYear(dateObj) {
  return addYears(dateObj, 1);
}
function subYears(dateObj, n) {
  return addYears(dateObj, -n);
}
function subYear(dateObj) {
  return addYears(dateObj, -1);
}
function getMonthStart(dateObj) {
  var clonedObj = clone(dateObj);
  clonedObj.setDate(1);
  return clonedObj;
}
function getMonthEnd(dateObj) {
  var r = clone(dateObj);
  addMonth(r);
  r.setDate(0);
  return r;
}
// 对Date的扩展，将 Date 转化为指定格式的String
// from: http://blog.csdn.net/vbangle/article/details/5643091/
function format(dateObj) {
  var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd HH:mm:ss';

  var d = dateObj;

  var zeroize = function zeroize(value, length) {
    if (!length) length = 2;

    value = String(value);

    for (var i = 0, zeros = ''; i < length - value.length; i++) {
      zeros += '0';
    }

    return zeros + value;
  };
  var replaceObj = {
    'dddd': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()],
    'ddd': ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()],
    'dd': zeroize(d.getDate()),
    'd': d.getDate(),
    //
    'MMMM': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()],
    'MMM': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()],
    'MM': zeroize(d.getMonth() + 1),
    'M': d.getMonth() + 1,
    //
    'yyyy': d.getFullYear(),
    'yy': String(d.getFullYear()).substr(2),
    //
    'hh': zeroize(d.getHours() % 12 || 12),
    'h': d.getHours() % 12 || 12,
    //
    'HH': zeroize(d.getHours()),
    'H': d.getHours(),
    //
    'mm': zeroize(d.getMinutes()),
    'm': d.getMinutes(),
    //
    'ss': zeroize(d.getSeconds()),
    's': d.getSeconds(),
    'l': zeroize(d.getMilliseconds(), 3),
    'L': function () {
      var m = d.getMilliseconds();
      if (m > 99) m = Math.round(m / 10);
      return zeroize(m);
    }(),
    'tt': d.getSeconds() < 12 ? 'am' : 'pm',
    'TT': d.getSeconds() < 12 ? 'AM' : 'PM',
    'Z': d.toUTCString().match(/[A-Z]+$/)
  };
  return replaceMultiple(replaceObj, mask);
}
/**
 * [getCalendar description]
 * @param  {[type]} year         [description]
 * @param  {[type]} month        [description]
 * @param  {Number} [startWeekDay=0] [0 is sunday]
 * @return {[type]}              [description]
 */
function getCalendar(year, month) {
  var startWeekDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var results = [];
  var date = new Date(year, month - 1);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  var monthStart = getMonthStart(date);
  var monthStartDay = monthStart.getDay();
  var calendarStart = subDays(clone(monthStart), monthStartDay + startWeekDay);
  if (monthStartDay > startWeekDay) {
    var startDate = calendarStart.getDate();
    var _year = calendarStart.getFullYear();
    var _month = calendarStart.getMonth() + 1;
    for (var i = startWeekDay; i < monthStartDay; i++) {
      var _date = startDate + i;
      results.push({
        year: _year,
        month: _month,
        date: _date,
        text: _date,
        prevMonth: true
      });
    }
  }
  //
  var monthEnd = getMonthEnd(date);
  var monthEndtDate = monthEnd.getDate();
  for (var _i = 1; _i <= monthEndtDate; _i++) {
    var _date2 = _i;
    results.push({
      year: year,
      month: month,
      date: _date2,
      text: _date2,
      currentMonth: true
    });
  }
  //
  var monthEndDay = monthEnd.getDay();
  var endWeekDay = 6 - startWeekDay;
  if (monthEndDay < endWeekDay) {
    var nextMonth = addMonth(clone(date));
    var _year2 = nextMonth.getFullYear();
    var _month2 = nextMonth.getMonth() + 1;
    for (var _i2 = monthEndDay + 1, _date3 = 1; _i2 <= endWeekDay; _i2++, _date3++) {
      results.push({
        year: _year2,
        month: _month2,
        date: _date3,
        text: _date3,
        nextMonth: true
      });
    }
  }
  //
  return splitArray(results, 7);
}

exports.clone = clone;
exports.change = change;
exports.addSeconds = addSeconds;
exports.addSecond = addSecond;
exports.subSeconds = subSeconds;
exports.subSecond = subSecond;
exports.addMinutes = addMinutes;
exports.addMinute = addMinute;
exports.subMinutes = subMinutes;
exports.subMinute = subMinute;
exports.addHours = addHours;
exports.addHour = addHour;
exports.subHours = subHours;
exports.subHour = subHour;
exports.addDays = addDays;
exports.addDay = addDay;
exports.subDays = subDays;
exports.subDay = subDay;
exports.addMonths = addMonths;
exports.addMonth = addMonth;
exports.subMonths = subMonths;
exports.subMonth = subMonth;
exports.addYears = addYears;
exports.addYear = addYear;
exports.subYears = subYears;
exports.subYear = subYear;
exports.getMonthStart = getMonthStart;
exports.getMonthEnd = getMonthEnd;
exports.format = format;
exports.getCalendar = getCalendar;

Object.defineProperty(exports, '__esModule', { value: true });

})));
