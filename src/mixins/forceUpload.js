
import { apiBase } from '@/api'
import AppBridge from '@/utils/app-bridge'

export default {
  data () {
    return {
      showForceUpdateDialog: false, // 强更弹窗是否展示
      forceUpdateContent: {} // 强更弹窗内容
    }
  },
  mounted () {
    this.getForceUpdateContent() // 获取强更需要的内容
  },
  methods: {
    // 获取强更版本号
    async getForceUpdateContent () {
      const res = await apiBase.getHippoConfig({ name_space: 'hippo.work_common_config', name: 'fastdfs-version' })
      console.log(res)
      if (!AppBridge.isApp) {
        return
      }
      // 强更策略1：判断版本号是否低于指定版本
      let version
      if (AppBridge.isAndroid) {
        version = res.android
        // 当前版本低于指定版本
        if (AppBridge.isVersionBelow(version)) {
          await this.handleForceUpdateContent(res)
        }
      } else if (AppBridge.isIos) {
        version = res.ios
        // 当前版本低于指定版本
        if (AppBridge.isVersionBelow(version)) {
          await this.handleForceUpdateContent(res)
        }
      }
    },
    async handleForceUpdateContent (res) {
      // 强更策略2：根据BD mid灰度强更
      try {
        const { mids = [] } = res
        const isTargetMidUser = this.isMidInForcelist(this.$user.mid, mids)
        if (!isTargetMidUser) {
          return
        }
      } catch (e) {
        console.error(e)
        return
      }
      const ret = await apiBase.getHippoConfig({ name_space: 'hippo.work_common_config', name: 'download' })
      const downloadLink = ret || { ios: '', android: '' }
      const { title, content } = res
      this.forceUpdateContent = {
        title,
        content,
        url: `https://sales.tiqianle.com/res/entry/download.html?ios=${downloadLink.ios}&android=${downloadLink.android}&_h=${Math.floor(+new Date() / 1000 / 60 / 60)}`
      }
      this.showForceUpdateDialog = true
    },
    /**
     * 判断BD mid是否在mid强更名单(支持mid尾号和完整的mid)中，是的话才进行强更
     * @param {*} mid BD mid
     * @param {*} mids mid强更名单列表
     * @returns {boolean} 是否命中
     */
    isMidInForcelist (mid, mids) {
      try {
        // 不存在mids，不强更
        if (!Array.isArray(mids) || !mids.length) {
          return false
        }
        for (let i = 0, len = mids.length; i < len; i++) {
          const item = mids[i]
          // BD mid命中强更名单中的mid，返回true需要强更
          if (`${mid}` === `${item}`) {
            return true
          }
          // BD mid尾号命中强更名单中的mid尾号，返回true需要强更
          if (`${mid}`.endsWith(`${item}`)) {
            return true
          }
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    }
  }
}
