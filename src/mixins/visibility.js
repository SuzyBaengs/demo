import AppBridge from '@/utils/app-bridge'
import { isFunction } from '@/utils/is'
export default function () {
  return {
    methods: {
      /**
       * @param {*} cb api回调函数
       * @param {*} title 多页面title
       */
      controlVisibilityChange (cb, title = '') {
        try {
          title && (document.title = title)
          if (!isFunction(cb)) throw new Error('cb needs function')
          !AppBridge.isApp && cb()
          const fn = () => {
            if (AppBridge.isApp) {
              AppBridge.invokeJsBridge('hideTitle')
              !document.hidden && cb()
            }
          }
          window.document.removeEventListener('visibilitychange', fn)
          window.document.addEventListener('visibilitychange', fn)
          fn()
        } catch (e) {
          console.log('controlVisibilityChange from mixins visibility.js: ', location.href, e)
        }
      }
    }
  }
}
