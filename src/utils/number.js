export const isNumber = (o) => {
  return typeof o === 'number' && !isNaN(o)
}
/**
 * 千分位分隔符
 * @param {Number || String} num
 */
export const thousandsFormat = (num, thousandsSep = ',') => {
  if (!num || !isNumber(+num)) {
    throw new Error(num + ' is not a valid param')
  }
  return num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
    return $1 + thousandsSep
  })
}
/**
 * 转换数字单位
 * @param {Number || String} num
 * @param {Number} unit
 * @param {Number} decimals
 * @param {Number} step
 */
export const unitConvert = (num, unit, decimals = 2, step = 10) => {
  if (!num || !isNumber(+num)) {
    throw new Error(num + ' is not a valid param')
  }
  const tempNum = Number(num) / unit

  return tempNum > step ? Math.round(tempNum) : tempNum.toFixed(decimals)
}
/**
 * [将金额格式化为带分割符的格式]
 * 类似 123,456,789
 * @param amount 待格式化金额，以元为单位
 * @returns {string}
 */
export const moneyFormat = (amount) => {
  if (!+amount) return '0' // 非数字return
  const decimalPlaces = amount.toString().split('.')[1] // 查找小数位
  const revArr = parseInt(amount).toString().split('')
  const minus = revArr[0] === '-' ? revArr.shift() : '' // 是否为负数，为负数则删去符号位
  let len = Math.floor(revArr.length / 3)
  revArr.length % 3 === 0 && len--

  for (let i = 0; i < len; i++) {
    // 插入分隔符，因为插入之后数组长度变长，需要每次插入都添加偏移位
    revArr.splice(-((i + 1) * 3 + i), 0, ',')
  }
  return minus + (decimalPlaces ? revArr.join('') + '.' + decimalPlaces : revArr.join(''))
}
/**
 * [将数字格式化为保留n位小数,默认保留两位四舍五入]
 * @param {Number || String} num
 * @param {Number} decimals
 * @returns {Number}
 */
export const fixedFormat = (num, decimals = 2) => {
  if (num === 0) return num
  if (!num || !isNumber(+num)) {
    throw new Error(num + ' is not a valid param')
  }
  const decimalPlaces = num.toString().split('.')[1] || 0
  return decimalPlaces.length > decimals ? +num.toFixed(decimals) : num
}
/**
 * [将数字格式化为万元单位保留n位小数,默认截取两位不舍/入]
 * @param {Number || String} num
 * @param {Number} decimals
 * @param {Number} unit 单位
 * @returns {Number}
 */
export const thousandsFixedFormat = (num, decimals = 2, unit = 4) => {
  if (Number(num) === 0) return num
  if (!num || !isNumber(+num)) {
    throw new Error(num + ' is not a valid param')
  }
  const multiple = 10 ** decimals
  const double = 10 ** unit
  const res = Math.floor((num / double) * multiple) / multiple || 0
  const decimalPlaces = num.toString().split('.')[1] || 0
  return decimalPlaces.length > decimals ? +res.toFixed(decimals) : res
}
