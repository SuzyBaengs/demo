<template>
  <section>
    <AppHeader2 color="#050C1C" title="入职欢迎信" />
    <div class="content">
      <p class="hi">{{ $user.name }}你好：</p>
      <p>{{ letters }}</p>
      <span :class="{ btn: !count }" @click="handlerBegin">{{ btnTxt }}</span>
    </div>
  </section>
</template>
<script>
import { AppHeader2 } from '@/components'
import AppBridge from '@/utils/app-bridge'
import { apiBase, apiMembers } from '@/api'
export default {
  components: {
    AppHeader2
  },
  data () {
    return {
      count: 10,
      timer: null,
      letters: '',
      actConfigId: +this.$url.query.actConfigId || null,
      actId: +this.$url.query.actId || null,
      actName: decodeURI(this.$url.query.actName) || '',
      needDo: +this.$url.query.count || false
    }
  },
  computed: {
    btnTxt () {
      if (this.count) {
        return `浏览${this.count}S`
      } else {
        return '我准备好了 开始学习'
      }
    }
  },
  async created () {
    const res = await apiBase.getHippoConfig({ name_space: 'hippo.work_common_config', name: 'act_newer_configs' })
    this.letters = res.wel
    if (this.needDo) {
      this.controlVisiableChange()
    } else {
      this.count = 0
    }
  },
  methods: {
    controlVisiableChange () {
      if (AppBridge.isApp) {
        const that = this
        const fn = () => {
          if (document.hidden) {
            that.count = 10
            that.timer && clearTimeout(that.timer)
          } else {
            that.countDownHandler()
          }
        }
        window.document.removeEventListener('visibilitychange', fn)
        window.document.addEventListener('visibilitychange', fn)
        fn()
      } else {
        this.countDownHandler()
      }
    },
    // 倒计时事件
    countDownHandler () {
      this.timer = setTimeout(() => {
        if (this.count <= 0) {
          clearTimeout(this.timer)
          return
        }
        this.count--
        // 提前1s发起请求，提高用户体验
        if (this.count <= 0) {
          this.finishBrowseTask()
        }
        this.countDownHandler()
      }, 1000)
    },
    // 任务完成事件
    finishBrowseTask () {
      apiMembers.finishActive({ actConfigId: this.actConfigId, actId: this.actId, actName: this.actName }).then(res => {
        if (res && +res.is_success === 0) {
          this.$toast('任务已完成')
        } else {
          this.$toast(res.reason)
        }
      }).catch(err => {
        console.log('finishActive err: ', location.href, err)
      })
    },
    handlerBegin () {
      if (this.count) return
      AppBridge.goBack()
    }
  }
}
</script>
<style lang="less" scoped>
section {
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(253, 235, 213, .1) 0%, rgba(255, 221, 181, .1) 100%);
  .content {
    margin-top: 67px;
    width: 100%;
    background-image: url('../img/newer_wel_bg.png');
    background-size: 100% 100%;
    padding: 92px 58px 206px;
    p {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #451F13;
      line-height: 20px;
      &.hi {
        margin-bottom: 12px;
      }
    }
    > span {
      display: inline-block;
      margin: 32px auto 0;
      padding: 15px 0;
      width: 259px;
      border-radius: 8px;
      border: 1px solid rgba(193, 153, 130, .5);
      color: rgba(69, 31, 19, .5);
      text-align: center;
      &.btn {
        border: 1px solid #C19982;
        color: #451F13;
        font-weight: bold;
      }
    }
  }
}
</style>
