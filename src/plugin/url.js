import Url from '@/utils/url'

// vue url参数解析插件，暴露参数为this.$url
export default class VueUrl extends Url {
  static install (Vue) {
    const query = super.parse()

    Object.defineProperty(Vue.prototype, '$url', {
      get () { return { query } }
    })
  }
}
