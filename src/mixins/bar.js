import AppBridge from '@/utils/app-bridge'
export default function () {
  return {
    data () {
      return {
        stateBarHeight: 0
      }
    },
    created () {
      AppBridge.isApp && this.getStateBarHeight()
    },
    methods: {
      getStateBarHeight () {
        try {
          if (AppBridge.isIos) {
            AppBridge.invokeJsBridge('getDeviceInfo', {
              callback: (res) => {
                const deviceModel = res.model
                const iphoneXModel = ['iPhone10,3', 'iPhone10,6']
                // iphonex 以后为刘海屏 状态栏高度为44
                if (iphoneXModel.includes(deviceModel) || deviceModel > 'iPhone10,6') {
                  this.stateBarHeight = 44
                } else {
                  this.stateBarHeight = 20
                }
              }
            })
          } else {
            this.stateBarHeight = 25
          }
        } catch (e) {
          console.log(e)
        }
      },
      handleGoBack () {
        AppBridge.goBack()
      }
    }
  }
}
