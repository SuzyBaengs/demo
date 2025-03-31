// 添加dom
const appendDom = function (ele, id, isDisplay = false) {
  const dom = document.createElement(ele)
  isDisplay && (dom.style.display = 'none')
  dom.classList.add(id)
  const nodeList = [...document.querySelectorAll('.' + id)]
  nodeList.forEach((item) => {
    item.parentElement.removeChild(item)
  })

  document.body.appendChild(dom)
  return dom
}
// 创建canvas
const createCanvas = function () {
  const canvasDOM = appendDom('canvas', 'js-canvas', true)

  const ctx = canvasDOM.getContext('2d')
  ctx.fillStyle = 'rgba(255, 255, 255, 0)'
  return { canvasDOM, ctx }
}
/**
 * 生成水印图片
 * @param {String} font 水印文字
 * @param {Number} [ang = -15] 角度
 * @param {Number} [offset = 100] 偏移量
 * @param {Number} [fontSize = 14] 字体大小
 * @param {String} [color = '#000000'] 颜色
 * @returns {String} 图片base64值
 */
const createWatermark = function (font, ang = -15, xOffset = 100, yOffset = 100, fontSize = 14, color = '#000000', alpha = 0.8) {
  const hu = ang * Math.PI / 180
  const fontStyle = `${fontSize}px Arial`
  const { canvasDOM, ctx } = createCanvas()
  ctx.font = fontStyle
  ctx.fillStyle = color
  const fontWidth = ctx.measureText(font).width

  const w = Math.abs(fontWidth * Math.cos(hu))
  const h = Math.abs(fontWidth * Math.sin(hu))
  canvasDOM.width = w + xOffset
  canvasDOM.height = h + yOffset

  ctx.translate(xOffset / 2, h + yOffset / 2)
  ctx.font = fontStyle
  ctx.fillStyle = color
  ctx.globalAlpha = alpha
  ctx.rotate(ang * Math.PI / 180)
  ctx.fillText(font, 0, 0)
  return canvasDOM.toDataURL('image/png')
}

export default function (font, options) {
  const defaultObj = {
    id: '#container',
    ang: -15,
    xOffset: 100,
    yOffset: 100,
    fontSize: 14,
    color: '#000000',
    alpha: 0.8
  }
  const opt = { ...defaultObj, ...options }
  const img = createWatermark(font, opt.ang, opt.xOffset, opt.yOffset, opt.fontSize, opt.color, opt.alpha)
  const ele = appendDom('div', 'js-watermark')
  const domApp = document.querySelector(opt.id)

  // 监听dom变化，给水印dom添加高度
  const observer = new MutationObserver(() => {
    ele.style.cssText = `background: url(${img});height:${domApp.scrollHeight}px`
  })

  ele.classList.add('g-watermark')
  // 水印图片背景设置
  ele.style.cssText = `background: url(${img});`
  observer.observe(domApp, {
    subtree: true,
    childList: true,
    attributeFilter: ['style']
  })
}
