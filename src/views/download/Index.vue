<template>
  <div class="main">
    <img class="header-img" src="@/assets/icons/jpg/download/download.jpg" alt="">
    <div class="btn-group">
      <a v-for="item in btnList" :key="item.type" class="btn" :href="item.link" @click="download(item)">{{ item.label }}</a>
    </div>

    <!-- 提示 -->
    <div v-show="show" class="tips" @click="close()">
      <img :src="tipsSrc" alt="">
    </div>
  </div>
</template>
<script>
import { apiBase } from '@/api'
export default {
  data () {
    return {
      device: navigator.userAgent.toLowerCase(),
      show: false,
      btnList: [
        {
          type: 'ios',
          label: 'iOS下载',
          link: ''
        },
        {
          type: 'android',
          label: '安卓下载',
          link: ''
        }
      ]
    }
  },
  computed: {
    tipsSrc () {
      const src = {
        ios: require('@/assets/icons/png/download/app_ios.png'),
        android: require('@/assets/icons/png/download/app_andriod.png')
      }
      let device = ''
      if (/ipod|iphone|ipad/.test(this.device)) {
        device = 'ios'
      }
      if (/android/.test(this.device)) {
        device = 'android'
      }
      return src[device] || ''
    }
  },
  async mounted () {
    window.document.title = '分期乐销售系统'
    await this.getDownloadLink()
  },
  methods: {
    async getDownloadLink () {
      // 链接中存在ios和android下载链接传参
      if (this.$url.query.ios && this.$url.query.android) {
        this.btnList[0].link = `itms-services://?action=download-manifest&url=${this.$url.query.ios}`
        this.btnList[1].link = this.$url.query.android
        return
      }
      // 请求接口获取hippo配置中的ios和android下载链接
      try {
        const res = await apiBase.getHippoConfig({ name_space: 'hippo.work_common_config', name: 'download' })
        this.btnList[0].link = `itms-services://?action=download-manifest&url=${res.ios}`
        this.btnList[1].link = res.android
      } catch (e) {
        console.error(e)
        this.$toast('获取hippo配置中的ios和android下载链接出错')
      }
    },
    download (item) {
      const isMicro = /micromessenger/.test(this.device)
      if (isMicro && item.type === 'ios' && /ipod|iphone|ipad/.test(this.device)) {
        this.show = true
        return false
      }
      if (isMicro && item.type === 'android' && /android/.test(this.device)) {
        this.show = true
        return false
      }
    },

    close () {
      this.show = false
    }
  }
}
</script>
<style scoped lang="less" >
  .main{
    min-height: 100vh;
    background: #ff7268;
    .header-img{
      display: block;
      width: 100%;
    }
    .btn-group{
      padding: 50px 30px 0;
      font-size: 16px;
      text-align: center;
      .btn{
        display: block;
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 20px;
      }
    }
    .tips{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.8);
      z-index: 100;
      padding: 20px;
      img{
        display: block;
        width: 100%;
      }
    }
  }
</style>
