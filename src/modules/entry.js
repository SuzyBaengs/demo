/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-11-02 17:31:27
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2022-03-24 11:53:43
 */
import Vue from 'vue'
import Url from '@/plugin/url'
import lotus from '@/utils/lotus/lotus'
import watermark from '@/utils/watermark-generator'
import { apiBase } from '@/api'
import store from '@/store/index'
import freezeObj from '@/assets/consts'
import Report from '@/utils/report/lib/unify_report'
import AppBridge from '@/utils/app-bridge'
import '@/assets/style/index.less'
import '@/utils/svgxuse'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css'
import { Sticky, Toast, Tag, Popup, List, PullRefresh, Uploader, Image as VanImage, Rate, Picker, ImagePreview } from 'vant'
import { getRelativeUrl, getAbsUrl } from '@/utils/format-fastdfs-url'
import VueDOMPurifyHTML from 'vue-dompurify-html'

Vue.prototype.$stat = (...args) => { Report.report(...args) } // 挂载到Vue实例上会改变class实例的this指向 需要用函数包裹执行
Vue.use(Sticky)
  .use(Toast)
  .use(Tag)
  .use(Popup)
  .use(List)
  .use(PullRefresh)
  .use(Uploader)
  .use(VanImage)
  .use(Rate)
  .use(Picker)
  .use(ImagePreview)

Vue.prototype.$toast = Toast
Vue.prototype.$const = freezeObj
Vue.prototype.$getRelativeUrl = getRelativeUrl
Vue.prototype.$getAbsUrl = getAbsUrl

Vue.prototype.$openUrl = (url, opts = {}) => {
  if (!url) return
  lotus.forward(url, opts)
}
Vue.prototype.$goBack = () => {
  lotus.back()
}

export async function entry (components, options = {}) {
  const defaultOption = {
    needLogin: true,
    background: '#fff',
    header: true,
    watermark: true
  }
  options = { ...defaultOption, ...options }
  // vue url参数解析插件
  Vue.use(Url)

  // 使用vue-dompurify-htm预防xss攻击
  Vue.use(VueDOMPurifyHTML)

  // 登录态处理
  if (options.needLogin) {
    const res = await apiBase.getWorkAdminBaseInfo()
    Object.defineProperty(Vue.prototype, '$user', {
      get () { return res }
    })

    // 添加bd水印
    if (options.watermark) watermark(`${res.min}(${res.name})`, { ang: -45, xOffset: 80, yOffset: 140 })
  }
  // 头部隐藏
  if (!options.header && AppBridge.isApp) {
    AppBridge.invokeJsBridge('hideTitle')
  }

  try {
    Report.report('BROW')
    Report.start()
  } catch (e) { console.log(e) }

  new Vue({
    store,
    render: h => h(components)
  }).$mount('#app')
  // 背景色设置
  document.getElementById('container').style.backgroundColor = options.background
}
