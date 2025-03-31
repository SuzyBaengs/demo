/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-06-10 17:20:45
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2021-09-23 17:19:16
 */
// 日期格式化 yyyy-MM-dd hh:mm:ss
export function dateFormat (date, format = 'yyyy-MM-dd hh:mm:ss') {
  if (!date) {
    return ''
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
    w: '日一二三四五六'.charAt(date.getDay())
  }
  format = format.replace(/y{4}/, date.getFullYear())
    .replace(/y{2}/, date.getFullYear().toString().substring(2))
  for (const k in o) {
    const reg = new RegExp(k)
    format = format.replace(reg, function (m) {
      return m.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
    })
  }

  return format
}

export const isArray = o => {
  return Array.isArray(o)
}
export const isObject = o => {
  return Object.prototype.toString.call(o) === '[object Object]'
}
export const isString = o => {
  return typeof o === 'string'
}
export const isNumber = o => {
  return typeof o === 'number' && !isNaN(o)
}

/**
 * 判断是否为合法的日期对象
 * @param {Date} date
 * @return {Boolean}
 */
export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date.getTime())
}
/**
 * 根据日期对象获取年月日时分秒
 * @param {Date} date
 * @return {Array}
 */
export const getMetaDate = (date) => {
  if (!isValidDate(date)) {
    throw new Error(date + ' is not a valid param')
  }
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.substr(-2)
  const day = `0${date.getDate()}`.substr(-2)
  const hour = `0${date.getHours()}`.substr(-2)
  const min = `0${date.getMinutes()}`.substr(-2)
  const sec = `0${date.getSeconds()}`.substr(-2)
  return [year, month, day, hour, min, sec]
}
/**
 * 计算n天前的日期
 * @param {Date} date
 * @return {Date}
 */
export const getDateBefore = (n, date = new Date()) => {
  if (!isValidDate(date)) {
    throw new Error(date + ' is not a valid param')
  }
  return new Date(date.getTime() - n * 24 * 60 * 60 * 1000)
}
/**
 * 根据后台返回的时间数据，转换成“年-月-日 时:分”的形式
 * @param {Number / Date} time
 * @param {String} formatStr
 * @return {String}
 */
export const formatTime = (time, formatStr = 'YYYY-MM-DD HH:mm:ss') => {
  const t = typeof time === 'number' ? new Date(time) : time
  if (!isValidDate(t)) {
    throw new Error(t + ' is not a valid param')
  }
  const metaDate = getMetaDate(t)
  return formatStr.replace(/Y{2,4}|M{2}|D{2}|H{2}|m{2}|s{2}/g, (match) => {
    switch (match) {
      case 'YY':
        return String(metaDate[0]).slice(-2)
      case 'YYY':
      case 'YYYY':
        return String(metaDate[0])
      case 'MM':
        return String(metaDate[1])
      case 'DD':
        return String(metaDate[2])
      case 'HH':
        return String(metaDate[3])
      case 'mm':
        return String(metaDate[4])
      case 'ss':
        return String(metaDate[5])
    }
  })
}

/**
 * 生成最近n个月的时间列表
 * defineTimeList(3) => ["2019-12-13", "2019-11-13", "2019-10-13"]
 * defineTimeList(3, 'YYYY年MM月DD日') => ["2019年12月13日", "2019年11月13日", "2019年10月13日"]
 * defineTimeList([1,2,3,6,12], 'YYYY年MM月DD日') => ["2019年11月13日", "2019年10月13日", "2019年9月13日"...]
 * defineTimeList([1,2,3,6,12], {date:'YYYY-MM-DD', date_desc: 'YYYY年MM月DD日'}) => [{date:"2019-12-13", date_desc:"2019年11月13日"},...]
 * @param {Number || Array} n
 * @param {String || Object} reg
 * @return {Array}
 */
export const newDefineTimeList = (n = 3, reg) => {
  const d = new Date()
  let dateList = []
  let returnList = []
  if (isNumber(n)) {
    dateList = Array.from({ length: n }).map((item, i) => {
      const m = new Date(d)
      m.setMonth(d.getMonth() - i)
      return m
    })
  } else if (isArray(n)) {
    dateList = n.map((item, i) => {
      const m = new Date(d)
      m.setMonth(d.getMonth() - item)
      return m
    })
  } else {
    throw new Error(n + ' is not a valid param')
  }

  if (!reg) reg = 'YYYY-MM-DD'
  if (isString(reg)) {
    returnList = dateList.map((item, i) => {
      return formatTime(item, reg)
    })
  } else if (isObject(reg)) {
    const keys = Object.keys(reg)
    returnList = dateList.map(date => {
      const o = {}
      keys.forEach(key => {
        o[key] = formatTime(date, reg[key])
      })
      return o
    })
  } else {
    throw new Error(reg + ' is not a valid param')
  }
  return returnList
}
/**
 * 计算两日期间隔时间是否在范围内
 * @param {Date, String} startDate
 * @param {Date, String} endDate
 * @param {Number} dayLen
 */
export const inDateRange = (startDate = new Date(), endDate, dayLen) => {
  const stDate = new Date(startDate)
  const edDate = new Date(endDate)
  if (!isValidDate(stDate) || !isValidDate(edDate)) {
    throw new Error('startDate or endDate is not a valid param')
  }
  const range = dayLen * 24 * 60 * 60 * 1000
  const stTime = stDate.getTime()
  const edTime = edDate.getTime()
  return Math.abs(edTime - stTime) <= Math.abs(range)
}

/**
 * 日期返回格式 YY年MM月
 * @param {Date, String} v // 时间选择器选中时间
 * @param {Boolean} isShowYear // 是否展示年
 * @param {Boolean} isFormatMonth // 是否将当前月展示为本月
 */
export const formatterMonth = (v, isShowYear = true, isFormatMonth = true) => {
  if (!v) {
    return ''
  }
  const dt = new Date(v)
  const td = new Date()
  const dobj = {
    y: dt.getFullYear(),
    m: dt.getMonth() + 1
  }
  const tobj = {
    y: td.getFullYear(),
    m: td.getMonth() + 1
  }
  if (dobj.y === tobj.y && dobj.m === tobj.m && isFormatMonth) {
    return '本月'
  }
  return isShowYear ? `${dobj.y}年${dobj.m}月` : `${dobj.m}月`
}

// 获取时间的年月日时分秒对象
export const getDateObj = (date = new Date()) => {
  if (!isValidDate(date)) {
    throw new Error(date + ' is not a valid param')
  }
  const dObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    min: date.getMinutes(),
    s: date.getSeconds()
  }
  return dObj
}

/**
 * 常规日期格式转换(时间戳、YYYY-MM-DD HH:mm:ss、YYYY/MM/DD HH:mm:ss、Date) => 任意格式(YY年MM月、HH:mm、MM-DD HH等)
 * @param {Number / Date / String} time
 * @param {String} formatStr
 * @return {String}
 */
export const normalDateFormat = (time = '', formatStr = 'YYYY-MM-DD HH:mm:ss') => {
  if (typeof time === 'string') {
    // 时间类型string
    const dateTimeRegex = /^(?:(?:20)?\d{2}[-/]\d{2}[-/]\d{2} \d{2}:\d{2}:\d{2})|(?:(?:20)?\d{2}[-/]\d{1,2}[-/]\d{1,2} \d{1,2}:\d{2}:\d{2})$/

    // 检查字符串是否时间格式
    if (!dateTimeRegex.test(time)) {
      throw new Error(time + ' is not a valid param')
    }
    const metaDate = time.split(/[-/ :]/)
    return formatStr.replace(/Y{2,4}|M{2}|D{2}|H{2}|m{2}|s{2}/g, (match) => {
      switch (match) {
        case 'YY':
          return String(metaDate[0]).slice(-2)
        case 'YYY':
        case 'YYYY':
          return String(metaDate[0])
        case 'MM':
          return String(metaDate[1])
        case 'DD':
          return String(metaDate[2])
        case 'HH':
          return String(metaDate[3])
        case 'mm':
          return String(metaDate[4])
        case 'ss':
          return String(metaDate[5])
      }
    })
  }
  // 时间类型date/number
  return formatTime(time, formatStr)
}

/* 导出一个统一日期格式的函数
 * @param {String} time|Date
 * @return {String} YYYY/MM/DD HH:mm:ss
*/
export const unifieDateFormat = (time = '') => {
  const now = new Date()
  // 小于2位自动补0
  const padZero = (num = '', _default = '01') => String(num)?.padStart(2, '0') || _default
  // 获取当前日期
  const { year: currentYear, month: currentMonth, day: currentDay } = (() => {
    const year = now.getFullYear()
    const month = padZero(now.getMonth() + 1)
    const day = padZero(now.getDate())
    return { year, month, day }
  })()
  // 解析日期字符串
  const parseDatePart = (datePart) => {
    const dateSegments = datePart.split(/[-/]/)
    // 年、月缺失，插入空字符串
    while (dateSegments.length < 3) {
      dateSegments.unshift('') // 在开头插入空字符串
    }
    const year = (dateSegments[0]?.length === 4 ? dateSegments[0] : `${currentYear}`.slice(0, 4 - dateSegments[0].length) + dateSegments[0]) || currentYear
    const month = padZero(dateSegments[1], currentMonth)
    const day = padZero(dateSegments[2], currentDay)

    return { year, month, day }
  }
  // 解析时间字符串
  const parseTimePart = (timePart) => {
    const timeSegments = timePart.split(':')
    const hour = padZero(timeSegments[0])
    const minute = padZero(timeSegments[1])
    const second = padZero(timeSegments[2])

    return { hour, minute, second }
  }
  if (isValidDate(time)) {
    // 输入日期格式 Date对象
    return formatTime(time, 'YYYY/MM/DD HH:mm:ss')
  } else if (typeof time === 'string') {
    // 输入日期格式 字符串
    let [datePart = '', timePart = ''] = time.replace(/[a-zA-Z]/g, '').trim().split(/\s+/)
    // 判断是否为只有时间格式
    if (datePart.includes(':')) {
      timePart = datePart
      datePart = ''
    }
    // 获取年份、月份和日期
    const { year, month, day } = parseDatePart(datePart)
    const { hour, minute, second } = parseTimePart(timePart)

    // 返回统一格式
    return `${year}/${month}/${day} ${hour}:${minute}:${second}`
  } else {
    // 输入日期格式 非 Date|String
    return formatTime(now, 'YYYY/MM/DD HH:mm:ss')
  }
}
