/*!
 * date-functions v1.0.6
 * phphe <phphe@outlook.com> (https://github.com/phphe)
 * https://github.com/phphe/date-functions.git
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.dateFunctions = global.dateFunctions || {})));
}(this, (function (exports) { 'use strict';

/*!
 * helper-js v1.0.10
 * phphe <phphe@outlook.com> (https://github.com/phphe)
 * https://github.com/phphe/helper-js.git
 * Released under the MIT License.
 */

// is 各种判断
function isset(v) {
  return typeof v !== 'undefined';
}
function isNumber(v) {
  return Object.prototype.toString.call(v) === '[object Number]';
}
function isNumeric(v) {
  var num = parseFloat(v);
  return !isNaN(num) && isNumber(num);
}
function isObject(v) {
  return Object.prototype.toString.call(v) === '[object Object]';
}
function isFunction(v) {
  return typeof v === 'function';
}
// str 字符
function studlyCase(str) {
  return str && str[0].toUpperCase() + str.substr(1);
}
function replaceMultiple(mapObj, str) {
  var reg = new RegExp(Object.keys(mapObj).join('|'), 'g');
  return str.replace(reg, function (matchedKey) {
    return mapObj[matchedKey];
  });
}
// source: http://youmightnotneedjquery.com/
function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
}

var storeOfWaitFor = {};

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
    'hh': zeroize(d.getSeconds() % 12 || 12),
    'h': d.getSeconds() % 12 || 12,
    //
    'HH': zeroize(d.getSeconds()),
    'H': d.getSeconds(),
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

Object.defineProperty(exports, '__esModule', { value: true });

})));
