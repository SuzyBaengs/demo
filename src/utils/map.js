/* eslint-disable no-loss-of-precision */
/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-04-21 11:41:29
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2021-08-26 17:16:10
 */

const xPI = 3.14159265358979324 * 3000.0 / 180.0
const PI = 3.1415926535897932384626
const a = 6378245.0
const ee = 0.00669342162296594323

export default {
  init: function () {
    // console.log("初始化百度地图脚本...");
    const AK = 'WD7KwrMxE9xPkcDpgEEUINikd95UldVs'
    const callbackName = '__onBMapCallback'
    const URL = 'https://api.map.baidu.com/api?v=2.0&ak=' + AK + '&s=1&callback=' + callbackName
    return new Promise((resolve, reject) => {
      try {
        // 如果已加载直接返回
        if (typeof window.BMap !== 'undefined') {
          resolve(window.BMap)
          return true
        }

        // 百度地图异步加载回调处理
        window[callbackName] = function () {
        //   console.log("百度地图脚本初始化成功...");
          resolve(window.BMap)
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
  // 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
  bd09togcj02 (lng, lat) {
    const x = lng - 0.0065
    const y = lat - 0.006
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPI)
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPI)
    const gcLng = z * Math.cos(theta)
    const gcLat = z * Math.sin(theta)
    return [gcLng, gcLat]
  },
  // 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
  gcj02tobd09 (lng, lat) {
    const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * xPI)
    const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * xPI)
    const bdLng = z * Math.cos(theta) + 0.0065
    const bdLat = z * Math.sin(theta) + 0.006
    return [bdLng, bdLat]
  },
  // GCJ02 转换为 WGS84
  gcj02towgs84 (lng, lat) {
    if (this.outOfChina(lng, lat)) {
      return [lng, lat]
    } else {
      let dlat = this.transformlat(lng - 105.0, lat - 35.0)
      let dlng = this.transformlng(lng - 105.0, lat - 35.0)
      const radlat = lat / 180.0 * PI
      let magic = Math.sin(radlat)
      magic = 1 - ee * magic * magic
      const sqrtmagic = Math.sqrt(magic)
      dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
      dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)
      const wgsLat = lat + dlat
      const wgsLng = lng + dlng
      return [lng * 2 - wgsLng, lat * 2 - wgsLat]
    }
  },
  wgs84togcj02 (lng, lat) {
    if (this.isOutofChina(lng, lat)) {
      return [lng, lat]
    } else {
      let dlat = this.transformLat(lng - 105.0, lat - 35.0)
      let dlng = this.transformLng(lng - 105.0, lat - 35.0)
      const radlat = lat / 180.0 * PI
      let magic = Math.sin(radlat)
      magic = 1 - ee * magic * magic
      const sqrtmagic = Math.sqrt(magic)
      dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
      dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)
      const mglat = lat + dlat
      const mglng = lng + dlng
      return [mglng, mglat]
    }
  },
  transformlat (lng, lat) {
    let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0
    return ret
  },

  transformlng (lng, lat) {
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0
    return ret
  },
  outOfChina (lng, lat) {
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false)
  }
}
