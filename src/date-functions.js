// Most of the methods will affect the original object
// 大部分方法将影响原对象
import * as hp from 'helper-js'
//
export function clone(dateObj) {
  return new Date(dateObj.getTime())
}
export function change(dateObj, type, n) {
  var setFuncName = 'set' + type
  var getFuncName = 'get' + type
  dateObj[setFuncName](dateObj[getFuncName]() + n)
  return dateObj
}

export function addSeconds(dateObj, n) {
  return change(dateObj, 'Seconds', n)
}
export function addSecond(dateObj) {
  return addSeconds(dateObj, 1)
}
export function subSeconds (dateObj, n) {
  return addSeconds(dateObj, -n)
}
export function subSecond (dateObj) {
  return addSeconds(dateObj, -1)
}

export function addMinutes(dateObj, n) {
  return change(dateObj, 'Minutes', n)
}
export function addMinute(dateObj) {
  return addMinutes(dateObj, 1)
}
export function subMinutes (dateObj, n) {
  return addMinutes(dateObj, -n)
}
export function subMinute (dateObj) {
  return addMinutes(dateObj, -1)
}

export function addHours(dateObj, n) {
  return change(dateObj, 'Hours', n)
}
export function addHour(dateObj) {
  return addHours(dateObj, 1)
}
export function subHours (dateObj, n) {
  return addHours(dateObj, -n)
}
export function subHour (dateObj) {
  return addHours(dateObj, -1)
}

export function addDays(dateObj, n) {
  return change(dateObj, 'Date', n)
}
export function addDay(dateObj) {
  return addDays(dateObj, 1)
}
export function subDays (dateObj, n) {
  return addDays(dateObj, -n)
}
export function subDay (dateObj) {
  return addDays(dateObj, -1)
}
export function addMonths (dateObj, n) {
  return change(dateObj, 'Month', n)
}
export function addMonth (dateObj) {
  return addMonths(dateObj, 1)
}
export function subMonths (dateObj, n) {
  return addMonths(dateObj, -n)
}
export function subMonth (dateObj) {
  return addMonths(dateObj, -1)
}
export function addYears (dateObj, n) {
  return change(dateObj, 'FullYear', n)
}
export function addYear (dateObj) {
  return addYears(dateObj, 1)
}
export function subYears (dateObj, n) {
  return addYears(dateObj, -n)
}
export function subYear (dateObj) {
  return addYears(dateObj, -1)
}
export function getMonthStart (dateObj) {
  const clonedObj = clone(dateObj)
  clonedObj.setDate(1)
  return clonedObj
}
export function getMonthEnd (dateObj) {
  const r = clone(dateObj)
  addMonth(r)
  r.setDate(0)
  return r
}
// 对Date的扩展，将 Date 转化为指定格式的String
// from: http://blog.csdn.net/vbangle/article/details/5643091/
export function format (dateObj, mask = 'yyyy-MM-dd HH:mm:ss') {
  var d = dateObj

  var zeroize = function (value, length) {
    if (!length) length = 2

    value = String(value)

    for (var i = 0, zeros = ''; i < (length - value.length); i++) {
      zeros += '0'
    }

    return zeros + value
  }
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
    'L': (function() {
      var m = d.getMilliseconds()
      if (m > 99) m = Math.round(m / 10)
      return zeroize(m)
    })(),
    'tt': d.getSeconds() < 12 ? 'am' : 'pm',
    'TT': d.getSeconds() < 12 ? 'AM' : 'PM',
    'Z': d.toUTCString().match(/[A-Z]+$/)
  }
  return hp.replaceMultiple(replaceObj, mask)
}
/**
 * [getCalendar description]
 * @param  {[type]} year         [description]
 * @param  {[type]} month        [description]
 * @param  {Number} [startWeekDay=0] [0 is sunday]
 * @return {[type]}              [description]
 */
export function getCalendar(year, month, startWeekDay = 0) {
  const results = []
  const date = new Date(year, month - 1)
  year = date.getFullYear()
  month = date.getMonth() - 1
  const monthStart = getMonthStart(date)
  const monthStartDay = monthStart.getDay()
  const calendarStart = subDays(clone(monthStart), monthStartDay + startWeekDay)
  if (monthStartDay > startWeekDay) {
    const startDate = calendarStart.getDate()
    const year = calendarStart.getFullYear()
    const month = calendarStart.getMonth() - 1
    for (let i = startWeekDay; i < monthStartDay; i++) {
      const date = startDate + i
      results.push({
        year,
        month,
        date: date,
        text: date,
        prevMonth: true,
      })
    }
  }
  //
  const monthEnd = getMonthEnd(date)
  const monthEndtDate = monthEnd.getDate()
  for (let i = 1; i <= monthEndtDate; i++) {
    const date = i
    results.push({
      year: year,
      month: month,
      date,
      text: date,
      currentMonth: true,
    })
  }
  //
  const monthEndDay = monthEnd.getDay()
  const endWeekDay = 6 - startWeekDay
  if (monthEndDay < endWeekDay) {
    const nextMonth = addMonth(clone(date))
    const year = nextMonth.getFullYear()
    const month = nextMonth.getMonth() - 1
    for (let i = monthEndDay + 1, date = 1; i <= endWeekDay; i++, date++) {
      results.push({
        year: year,
        month: month,
        date: date,
        text: date,
        nextMonth: true,
      })
    }
  }
  //
  return hp.splitArray(results, 7)
}
