/*!
 * date-functions v1.0.11
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hp = require('helper-js');

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

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
} // 对Date的扩展，将 Date 转化为指定格式的String
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
  return hp.replaceMultiple(replaceObj, mask);
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
  } //


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
  } //


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
  } //


  return hp.splitArray(results, 7);
} // datetime, add to date-functions
//
// eg: 2018-09-07T03:38:37.888Z
// timezone must be UTC

function is_ISO_UTC_format(str) {
  return str.length > 15 && str.length < 30 && str.match(/^\d{4}-\d{2}-\d{2}T.*Z$/);
} // timestamp eg: 2018-09-07T03:38:37.888Z

function parse_ISO_UTC_timestamp(timestamp) {
  var _timestamp$split = timestamp.split('T'),
      _timestamp$split2 = _slicedToArray(_timestamp$split, 2),
      datePart = _timestamp$split2[0],
      timePart = _timestamp$split2[1];

  var y,
      m,
      d,
      h = 0,
      min = 0,
      s = 0;

  var _datePart$split$map = datePart.split('-').map(function (v) {
    return parseInt(v);
  });

  var _datePart$split$map2 = _slicedToArray(_datePart$split$map, 3);

  y = _datePart$split$map2[0];
  m = _datePart$split$map2[1];
  d = _datePart$split$map2[2];
  m = m - 1;

  if (timePart) {
    var t = timePart.split('-').map(function (v) {
      return parseFloat(v);
    });
    h = t[0];

    if (t[1] != null) {
      min = t[1];
    }

    if (t[2] != null) {
      s = t[2];
    }
  }

  var dt = new Date(y, m, d, h, min, s); // the dt timezone is current, so reset hour with setUTCHours

  dt.setUTCHours(h);
  return dt;
}

exports.addDay = addDay;
exports.addDays = addDays;
exports.addHour = addHour;
exports.addHours = addHours;
exports.addMinute = addMinute;
exports.addMinutes = addMinutes;
exports.addMonth = addMonth;
exports.addMonths = addMonths;
exports.addSecond = addSecond;
exports.addSeconds = addSeconds;
exports.addYear = addYear;
exports.addYears = addYears;
exports.change = change;
exports.clone = clone;
exports.format = format;
exports.getCalendar = getCalendar;
exports.getMonthEnd = getMonthEnd;
exports.getMonthStart = getMonthStart;
exports.is_ISO_UTC_format = is_ISO_UTC_format;
exports.parse_ISO_UTC_timestamp = parse_ISO_UTC_timestamp;
exports.subDay = subDay;
exports.subDays = subDays;
exports.subHour = subHour;
exports.subHours = subHours;
exports.subMinute = subMinute;
exports.subMinutes = subMinutes;
exports.subMonth = subMonth;
exports.subMonths = subMonths;
exports.subSecond = subSecond;
exports.subSeconds = subSeconds;
exports.subYear = subYear;
exports.subYears = subYears;
