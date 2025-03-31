/**
 * 百度地图工具 webgl版本
 */
const xPI = '3.14159265358979324' * 3000.0 / 180.0

export default {
  init: function () {
    // console.log("初始化百度地图脚本...");
    const AK = 'WD7KwrMxE9xPkcDpgEEUINikd95UldVs'
    const callbackName = 'init'
    const URL = 'https://api.map.baidu.com/api?type=webgl&v=2.0&ak=' + AK + '&callback=' + callbackName
    return new Promise((resolve, reject) => {
      try {
        // 如果已加载直接返回
        if (typeof window.BMapGL !== 'undefined') {
          resolve(window.BMapGL)
          return true
        }

        // 百度地图异步加载回调处理
        window[callbackName] = function () {
        //   console.log("百度地图脚本初始化成功...");
          resolve(window.BMapGL)
        }

        // 插入script脚本
        const scriptNode = document.createElement('script')
        scriptNode.setAttribute('type', 'text/javascript')
        scriptNode.setAttribute('src', URL)
        document.body.appendChild(scriptNode)
      } catch (e) {
        reject(e)
      }
    })
  },
  // 手动实现GCJ02到BD09的坐标转换
  transformGCJ02ToBD09: function (lng, lat) {
    // 计算中间变量z
    const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * xPI)
    // 计算中间变量theta
    const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * xPI)
    // 计算BD-09经度
    const bdLng = z * Math.cos(theta) + 0.0065
    // 计算BD-09纬度
    const bdLat = z * Math.sin(theta) + 0.006
    // 返回包含BD-09经度和纬度的对象
    return { lng: bdLng, lat: bdLat }
  }
}
