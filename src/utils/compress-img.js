
/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-08-12 15:49:45
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2021-08-12 16:24:31
 */
const _compressImg = (file, maxWidth, maxheight, resolve) => {
  let rate = 1 // 缩放倍率
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.setAttribute('crossOrigin', 'Anonymous')
    img.onload = () => {
      if (img.width && img.width > maxWidth) { rate = Math.min(maxWidth / img.width) }
      if (img.height && img.height > maxheight) { rate = Math.min(maxheight / img.height, rate) }

      const canvas = document.createElement('canvas') // 创建canvas元素
      const width = img.width * rate // 确保canvas的尺寸和图片一样
      const height = img.height * rate
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height) // 将图片绘制到canvas中
      const dataURL = canvas.toDataURL('image/jpeg') // 转换图片为dataURL
      resolve(dataURL)
    }
    img.src = reader.result
  }
  reader.readAsDataURL(file)
}

const compress = (file = '', w, h) => {
  const dpr = 3
  const maxWidth = w || (375 * dpr)
  const maxheight = h || (667 * dpr)
  return new Promise((resolve, reject) => {
    if (!file) { reject(new Error('文件为空')); return }
    try {
      _compressImg(file, maxWidth, maxheight, resolve)
    } catch (e) {
      reject(e)
    }
  })
}

export default compress
