/*!
 * date-functions v1.0.8
 * phphe <phphe@outlook.com> (https://github.com/phphe)
 * https://github.com/phphe/date-functions.git
 * Released under the MIT License.
 */

import { replaceMultiple, splitArray } from 'helper-js';
import * as hp from 'helper-js';

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
  month = date.getMonth() - 1;
  var monthStart = getMonthStart(date);
  var monthStartDay = monthStart.getDay();
  var calendarStart = subDays(clone(monthStart), monthStartDay + startWeekDay);
  if (monthStartDay > startWeekDay) {
    var startDate = calendarStart.getDate();
    var _year = calendarStart.getFullYear();
    var _month = calendarStart.getMonth() - 1;
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
    var _month2 = nextMonth.getMonth() - 1;
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

export { clone, change, addSeconds, addSecond, subSeconds, subSecond, addMinutes, addMinute, subMinutes, subMinute, addHours, addHour, subHours, subHour, addDays, addDay, subDays, subDay, addMonths, addMonth, subMonths, subMonth, addYears, addYear, subYears, subYear, getMonthStart, getMonthEnd, format, getCalendar };
