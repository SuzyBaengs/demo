import lotus from './lotus/lotus'
import CONST from '@/assets/consts'

export function throttle (fn, interval = 300) {
  let canRun = true
  return function () {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    }, interval)
  }
}

export function debounce (func, ms = 300) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, ms)
  }
}

/**
 * html的实体字符转义成原本的字符
 * @param {String} str
 * @return {String}
 */
export const decodeHtml = (str) => {
  let s = ''
  if (!str || str.length === 0) return ''
  s = str.replace(/&amp;/g, '&')
  s = s.replace(/&lt;/g, '<')
  s = s.replace(/&gt;/g, '>')
  s = s.replace(/&nbsp;/g, ' ')
  s = s.replace(/&#39;/g, "'")
  s = s.replace(/&quot;/g, '"')
  return s
}

export const replaceProtocol = (url) => {
  return url ? url.replace(/^(http(s)?:)/, '') : ''
}

/**
 * 计算比例函数
 * @param {Number} num 分子
 * @param {Number} deno 分母
 * @param {Number} decimal 保留小数位
 * @return {String}
 */
export const calcRate = (num, deno, decimal) => {
  if (+deno === 0) {
    return ''
  }
  return `${parseFloat((+num * 100 / +deno).toFixed(decimal))}%`
}

/**
 * 获取指定名称的COOKIE的值
 * @param {string} cookieName
 * @returns cookie值
 */
export const getCookie = (cookieName) => {
  if (!cookieName) {
    return ''
  }
  const allcookies = document.cookie
  let value = ''
  let cookiePos = allcookies.indexOf(cookieName)
  if (cookiePos !== -1) {
    cookiePos = cookiePos + cookieName.length + 1
    let cookieEnd = allcookies.indexOf(';', cookiePos)
    if (cookieEnd === -1) {
      cookieEnd = allcookies.length
    }
    value = decodeURIComponent(allcookies.substring(cookiePos, cookieEnd))
  }
  return value
}

/**
 * 判断传参不为空
 * @param {any} value 传参
 * @returns 是否不为空（不是null 且 不是undefined 且 不是空字符串）
 */
export const isNotEmpty = (value) => {
  return value !== null && value !== undefined && value !== ''
}

// 通过链接下载文件
export const fileDownLoad = (fileUrl, fileName) => {
  // 创建一个虚拟的a标签
  const link = document.createElement('a')
  // 设置a标签的href为PDF文件的路径
  link.href = fileUrl
  // 设置下载属性，指定下载文件的名称
  link.download = fileName || 'document.text'
  // 兼容性处理：如果是iOS设备，则使用window.open来触发下载
  if (lotus.isIos) {
    lotus.navigator.forward({ url: fileUrl, useSysBrowser: 1 })
  } else {
    // 将虚拟a标签添加到DOM中
    document.body.appendChild(link)
    // 触发点击事件，开始下载
    link.click()
    // 下载完成后移除虚拟a标签
    document.body.removeChild(link)
  }
}

// pdf文件预览
export const pdfConvert = (url) => {
  const href = /.pdf/.test(url) ? `${CONST.PDF_VIEWER_PAGE}?file=${encodeURIComponent(url)}` : url
  return href
}

// 监听window挂载方法，重新进入页面时回调函数
export const reEnterPage = (cb) => {
  cb()
  window.FQL_JSBridge_Cb_PageStatus_OnResume = () => {
    cb()
  }
}

// 去除字符串中的空格
export const removeSpaces = (str) => {
  return str.replace(/\s+/g, '')
}

/**
 * 监听window挂载方法，App从后台切到前台时的回调函数
 * @param {Function} cb 回调函数
 */
export const onAppForeground = (cb) => {
  window.FQL_JSBridge_Cb_PageStatus_OnAppForeground = () => {
    cb()
  }
}

/**
 * 判断当前时间是否在指定时间范围内
 * @param {string} startTime 开始时间，格式为 'HH:mm:ss'/'HH:mm'/'HH'
 * @param {string} endTime 结束时间，格式为 'HH:mm:ss'/'HH:mm'/'HH'
 * @returns {boolean} 是否在指定时间范围内
 */
export const isTimeWithinRange = (startTime, endTime) => {
  const reg = /^([01]\d|2[0-3])(:([0-5]\d)){0,2}$/
  if (!reg.test(startTime) || !reg.test(endTime)) { // 参数校验
    throw new Error(`Invalid time format. startTime: ${startTime}, endTime: ${endTime}`)
  }

  const now = new Date()
  const start = new Date(now) // 设置开始时间
  const [startHour = 0, startMinute = 0, startSecond = 0] = startTime.split(':').map(Number)
  start.setHours(startHour, startMinute, startSecond, 0) // 设置开始时间

  const end = new Date(now) // 设置结束时间
  const [endHour = 0, endMinute = 0, endSecond = 0] = endTime.split(':').map(Number)
  end.setHours(endHour, endMinute, endSecond, 0) // 设置结束时间

  return now >= start && now <= end
}

/**
 * 阻止事件冒泡
 * @param {Event} e 事件对象
 */
export const stopPropagation = (e) => {
  e.stopPropagation()
}

/**
 * 阻止默认行为和事件冒泡
 * @param {Event} e 事件对象
 * @param {boolean} isStopPropagation 是否阻止事件冒泡
 */
export const preventDefault = (e, isStopPropagation) => {
  if (typeof e.cancelable !== 'boolean' || e.cancelable) {
    e.preventDefault()
  }

  if (isStopPropagation) {
    stopPropagation(e)
  }
}

/**
 * 边界处理
 * @param {Array} arr 边界数组
 * @param {Number} value 值
 * @returns {Number} 处理后的值
 */
export const boundaryHandle = (arr, value) => {
  if (value < arr[0]) { // 超出上边界
    return arr[0]
  }
  if (value > arr[arr.length - 1]) { // 超出下边界
    return arr[arr.length - 1]
  }
  return value // 在边界范围内
}

/**
 * 将对象的键名转换为驼峰命名法
* @param {Object} obj 要转换的对象
*/
export const convertKeysToCamelCase = (obj) => {
  // 非对象或数组直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  // 数组递归处理
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToCamelCase(item))
  }
  // 对象递归处理
  const newObj = {}
  for (const key in obj) {
    // 使用 hasOwnProperty 判断 key 是否为对象自身的属性
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())
      newObj[camelCaseKey] = convertKeysToCamelCase(obj[key])
    }
  }
  return newObj
}
/**
 * 创建一个倒计时定时器
 * @param {Function} callback - 回调函数，每秒触发一次，参数为剩余秒数。当倒计时结束时，将不带参数调用
 * @param {Number} seconds - 倒计时总秒数
 * @throws {Error} 当 callback 不是函数时抛出错误
 * @example
 * // 使用示例
 * countdownTimer((remainingSeconds) => {
 *   if (remainingSeconds) {
 *     console.log(`还剩 ${remainingSeconds} 秒`);
 *   } else {
 *     console.log('倒计时结束！');
 *   }
 * }, 10);
 */
export const countdownTimer = (callback, seconds) => {
  if (typeof callback !== 'function') {
    throw new Error('callback必须是一个函数')
  }
  let remainingSeconds = seconds
  let timer // 保存setTimeout的引用
  let isTimerCleared = false // 状态标志，记录定时器是否已清除
  const tick = () => {
    callback(remainingSeconds)
    if (remainingSeconds > 0) {
      remainingSeconds--
      timer = setTimeout(tick, 1000) // 保留当前的定时器引用
    } else {
      clearTimeout(timer) // 清除定时器
      isTimerCleared = true // 定时器已清除
    }
  }
  tick()

  // 返回一个清除定时器的函数，便于外部调用停止倒计时
  const cancelCountdown = () => {
    if (timer) {
      clearTimeout(timer) // 清除定时器
      isTimerCleared = true // 定时器已清除
    }
  }

  // 返回定时器状态标志和取消定时器的函数
  return {
    cancelCountdown,
    get isTimerCleared () {
      return isTimerCleared
    }
  }
}
