/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-01-06 12:11:13
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2022-03-10 16:17:36
 */
const rules = {
  email: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  mobile: /^(1|9)\d{10}$/,
  qq: /^\d{5,16}$/,
  password: /[a-zA-Z\d`~!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/]{6,16}/,
  number: /^[0-9]+$/,
  amount: /^\d+(\.\d{1,2})?$/,
  name: /^[a-zA-Z\u4E00-\u9FA5·\u00B7]+$/,
  chinese: /^([\u4E00-\u9FA5])*$/,
  chineseAddr: /^([\u4E00-\u9FA5|0-9|a-zA-Z])*$/, // 中国地址详情
  chineseChar:
    /^([\u4E00-\u9FA5|\u0026|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5])*$/, // 中文搭配中文标点符号
  pinteger: /^[1-9]\d*$/, // 正整数
  finteger: /^[1-9]\d*(\.\d{2})?$/, // 正整数保留两位小数
  url: /^((https|http)?:\/\/)[^\s]+/ // 网址
}

// 匹配这些中文标点符号 & 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
// const chineseSymbol = /[\u0026|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/

/**
 * 正则匹配
 * @param {RegExp} patt
 * @return {Boolean}
 */
const regTest = (reg, v) => {
  return reg.test(v)
}

export const isMobile = (v) => regTest(rules.mobile, v)

export const isQQ = (v) => regTest(rules.qq, v)

export const isName = (v) => regTest(rules.name, v)

export const isChinese = (v) => regTest(rules.chinese, v)

export const isChar = (v) => regTest(rules.chineseChar, v)

export const isChineseAddr = (v) => regTest(rules.chineseAddr, v)

export const isPinteger = (v) => regTest(rules.pinteger, v)

export const isFinteger = (v) => regTest(rules.finteger, v)

export const isValidUrl = (v) => regTest(rules.url, v)

/**
 * 身份证校验
 * @param {String} v 身份证号码
 * @returns {Boolean}
 */
export const isCreditid = (v) => {
  const arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const arrValid = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码
  let y, m, d
  const funIsValidDate = function (y, m, d) {
    const now = new Date(y, m - 1, d, 12, 0, 0)
    const _y = now.getFullYear()
    const _m = now.getMonth() + 1
    const _d = now.getDate()
    return +y === _y && +m === _m && +d === _d
  }
  if (/^\d{15}$/.test(v)) {
    y = '19' + v.substr(6, 2)
    m = v.substr(8, 2)
    d = v.substr(10, 2)
    return funIsValidDate(y, m, d)
  } else if (/^\d{17}\d|x$/i.test(v)) {
    let sum = 0
    for (let i = 0; i < v.length - 1; i++) {
      sum += parseInt(v.substr(i, 1), 10) * arrExp[i]
    }
    const vBit = sum % 11
    y = v.substr(6, 4)
    m = v.substr(10, 2)
    d = v.substr(12, 2)
    return arrValid[vBit] === v.substr(17, 1).toUpperCase() && funIsValidDate(y, m, d)
  } else {
    return false
  }
}

export const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

export const isString = (obj) => {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export const isFunction = (cb) => {
  return Object.prototype.toString.call(cb) === '[object Function]'
}

export const isKorean = (text) => {
  const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi
  return reg.test(text)
}

export const isImage = (name = '') => {
  const arr = name.split('.')
  const houzui = arr.length > 1 ? arr[arr.length - 1] : ''
  if (name && houzui) {
    const arr = ['png', 'jpg', 'bmp', 'wbmp', 'jpeg', 'webp', 'mbm']
    return ~arr.indexOf(houzui.toLowerCase())
  }
  return false
}
export const isVideo = (name = '') => {
  const arr = name.split('.')
  const houzui = arr.length > 1 ? arr[arr.length - 1] : ''
  if (name && houzui) {
    const arr = ['mp4', '3gp', 'avi', 'mov', 'wmv', 'rmvb', 'mkv']
    return ~arr.indexOf(houzui.toLowerCase())
  }
  return false
}

export const isEmojiCharacter = (substring) => {
  for (let i = 0; i < substring.length; i++) {
    const hs = substring.charCodeAt(i)
    if (hs >= 0xd800 && hs <= 0xdbff) {
      if (substring.length > 1) {
        const ls = substring.charCodeAt(i + 1)
        const uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000
        if (uc >= 0x1d000 && uc <= 0x1fbcf) {
          return true
        }
      }
    } else if (substring.length > 1) {
      const ls = substring.charCodeAt(i + 1)
      if (ls === 0x20e3 || ls === 0xd83e || ls === 0xfe0f) {
        return true
      }
    } else {
      if (hs >= 0x2100 && hs <= 0x27ff) {
        return true
      } else if (hs >= 0x2b05 && hs <= 0x2b07) {
        return true
      } else if (hs >= 0x2934 && hs <= 0x2935) {
        return true
      } else if (hs >= 0x3297 && hs <= 0x3299) {
        return true
      } else if (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030 || hs === 0x2b55 || hs === 0x2b1c || hs === 0x2b1b || hs === 0x2b50) {
        return true
      }
    }
  }
  return false
}

export const replaceEmoji = (str = '') => {
  let res = ''
  for (let i = 0; i < str.length; i++) {
    const s = str[i]
    const pre = str[i - 1] || ''
    const next = str[i + 1] || ''
    if (isEmojiCharacter(s)) continue
    // emoji字符length都为2 (传入三个字符)
    if (!isEmojiCharacter(pre + s + next)) {
      res += s
    }
  }
  return res
}
