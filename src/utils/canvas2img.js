import QRCode from 'qrcode'
/**
 * canvas生成图片工具类
 * @class Canvas2img
 */
export default class Canvas2img {
  create (options, cb) {
    return new Promise((resolve, reject) => {
      try {
        this.createShareImg(options, (data) => {
          resolve(data)
          cb && cb(data)
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 查询浏览器是否支持webp
   * @param {Function} callback 回调函数
   */
  checkWebpFeature (callback) {
    const img = new Image()
    img.onload = function () {
      const result = (img.width > 0) && (img.height > 0)
      callback(result)
    }
    img.onerror = function () {
      callback()
    }
    img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA'
  }

  /**
   * 图片加载函数
   * @param {String} src 图片url
   * @param {Boolean} crossOrigin 是否需要跨域
   * @returns
   * @memberof Canvas2img
   */
  imgLoader (src, crossOrigin = true) {
    // 生成图片对象
    const img = new Image()
    crossOrigin && img.setAttribute('crossOrigin', 'Anonymous')
    return new Promise((resolve) => {
      img.onload = () => { resolve(img) }
      img.src = src
    })
  }

  /**
   * 画文字
   * @param {*} ctx canvas对象
   * @param {Object} item 配置参数
   * @returns
   * @memberof Canvas2img
   */
  writeText (ctx, item) {
    const fontSize = item.fontSize || 12
    const lineHeight = item.lineHeight || 1.5
    const maxWidth = item.width ? item.width * this.dpr : 0
    let content = item.content
    let lineIndex = 0

    ctx.font = `${fontSize * this.dpr}px Arial`
    // 字体默认颜色
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    item.color && (ctx.fillStyle = item.color)

    while (item.width && ctx.measureText(content).width > maxWidth) {
      let min = 0
      let max = content.length - 1
      while (min <= max) {
        const middle = Math.floor((min + max) / 2)
        const text = content.substr(0, middle)
        const middleW = ctx.measureText(text).width
        const middleNextW = ctx.measureText(content.substr(0, middle + 1)).width

        if (middleW <= maxWidth && middleNextW > maxWidth) {
          ctx.fillText(text, item.position[0] * this.dpr, (item.position[1] + (lineIndex * fontSize * lineHeight)) * this.dpr)
          lineIndex++
          content = content.substr(middle)
          break
        }

        if (middleW < maxWidth) {
          min = middle + 1
        } else {
          max = middle - 1
        }
      }
    }
    ctx.fillText(content, item.position[0] * this.dpr, (item.position[1] + (lineIndex * fontSize * lineHeight)) * this.dpr)
  }

  /**
   * 生成分享图片
   * @param {Object} options
   * @param {Array} options.wh 图片页面中宽高列表
   * @param {String} options.bg 背景url
   * @param {Array} [options.list = []] 画布操作列表
   * @param {Number} [options.ratio = window.devicePixelRatio] 像素比，如果没有则取window.devicePixelRatio的值（背景图不是3x图的建议自己设置像素比，不然不同设备展示会不一样）
   * @memberof Canvas2img
   */
  createShareImg (options, cb) {
    if (!options.wh || !options.bg) return

    this.dpr = options.ratio ? options.ratio : window.devicePixelRatio ? parseInt(window.devicePixelRatio) : 2

    // 设置背景图片宽高阈值
    const maxWH = [options.wh[0] * this.dpr, options.wh[1] * this.dpr]
    const { canvasDOM, ctx } = this.createCanvas()
    const img = new Image()
    img.setAttribute('crossOrigin', 'Anonymous')
    img.onload = async () => {
      // 背景图片宽高不超过阈值
      if (img.width >= maxWH[0]) {
        canvasDOM.width = maxWH[0]
        canvasDOM.height = maxWH[0] / img.width * img.height
      } else if (img.height >= maxWH[1]) {
        canvasDOM.width = maxWH[1] / img.height * img.width
        canvasDOM.height = maxWH[1]
      } else {
        canvasDOM.width = img.width
        canvasDOM.height = img.height
      }
      const imgHeight = canvasDOM.height
      // 添加图片底部留白
      if (options.extraHeight) {
        canvasDOM.height += options.extraHeight * this.dpr
      }
      ctx.fillStyle = 'rgba(255, 255, 255, 1)'
      ctx.fillRect(0, 0, canvasDOM.width, canvasDOM.height)
      // 塞背景
      ctx.drawImage(img, 0, 0, canvasDOM.width, imgHeight)

      if (options.list && options.list.length > 0) {
        for (let i = 0; i < options.list.length; i++) {
          const item = options.list[i]
          let wh = []
          let imgObj = null
          // let text
          ctx.restore()
          switch (item.type) {
            case 'avatar':
              wh = item.wh ? item.wh.map((item) => item * this.dpr) : []
              imgObj = await this.imgLoader(item.content)
              if (item.center && item.r) {
                // 生成图片对象
                ctx.save()
                ctx.beginPath()
                ctx.arc(item.center[0] * this.dpr, item.center[1] * this.dpr, item.r * this.dpr, 0, 2 * Math.PI)
                ctx.closePath()
                ctx.strokeStyle = 'rgba(255, 255, 255, 0)'
                ctx.stroke()
                ctx.clip()
              }
              break
            case 'img':
              wh = item.wh ? item.wh.map((item) => item * this.dpr) : []
              // 生成图片对象
              imgObj = await this.imgLoader(item.content)
              break
            case 'txt':
              this.writeText(ctx, item)
              break
            case 'qrcode':
              // 生成二维码
              // 生成二维码图片对象
              imgObj = await this.imgLoader(await QRCode.toDataURL(item.content, {
                margin: 0,
                scale: 1,
                width: item.width * this.dpr
              }))
              break
          }

          // 塞图片
          if (imgObj) {
            const position = item.position.map((item) => item * this.dpr) // 具体参数数值乘以this.dpr值
            const arr = [imgObj].concat(position, wh)
            ctx.drawImage.apply(ctx, arr)
          }

          // 二维码塞icon
          if (item.type === 'qrcode' && item.icon) {
            const qrIcon = await this.imgLoader(item.icon) // icon图片对象
            const iconWidth = item.iconWidth ? item.iconWidth : 17 // icon大小
            const offset = (item.width - iconWidth) / 2 // icon相对于二维码的偏移量
            const args = [item.position[0] + offset, item.position[1] + offset, iconWidth, iconWidth].map((item) => item * this.dpr)
            ctx.drawImage.apply(ctx, [qrIcon].concat(args))
          }
        }
      }

      // 查询是否支持webp
      this.checkWebpFeature((isSupport) => {
        // 把canvas生成图片
        cb && cb(canvasDOM.toDataURL(isSupport ? 'image/webp' : 'image/png', 0.7))
      })
    }
    img.src = options.bg
  }

  createCanvas () {
    // 创建canvas
    const canvasDOM = document.createElement('canvas')
    canvasDOM.style.display = 'none'
    canvasDOM.classList.add('js-canvas2img')
    const nodeList = [...document.querySelectorAll('.js-canvas2img')]
    nodeList.forEach((item) => {
      item.parentElement.removeChild(item)
    })

    document.body.appendChild(canvasDOM)
    const ctx = canvasDOM.getContext('2d')
    ctx.fillStyle = 'rgba(255, 255, 255, 0)'
    return { canvasDOM, ctx }
  }
}
