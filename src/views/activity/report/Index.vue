<template>
  <section>
    <IconSvg name="arrow-left" class="back" :style="`top: ${statusBarHeightPx}`" @click="handlerBack" />
    <van-swipe
      ref="SWIPE"
      style="height: 100%"
      vertical
      :loop="false"
      :show-indicators="false"
      :touchable="touchable"
      @change="handlerChange"
    >
      <van-swipe-item
        v-for="(item, index) in swipes"
        :key="index"
      >
        <div class="content" :style="`background-image: url(${item.pic})`">
          <!-- swipe1 -->
          <img v-if="!index" class="btn" :src="require('./image/btn.png')" @click="next">
          <!-- swipe2 -->
          <div v-if="index === 1" class="w1">
            <img class="title" :src="require('./image/p2.png')">
            <div class="f-r name">
              <span>Hi~ {{ actInfo.name }}</span>
              <img class="avator" :src="actInfo.photo_personal || require('./image/btn.png')">
            </div>
            <p>这是你在乐信普惠的<span>第</span><em>{{ actInfo.days_on_the_job }}</em><span>天</span></p>
            <p>感谢你的一路相伴！</p>
          </div>
          <!-- swipe3 -->
          <div v-if="index === 2" class="w2">
            <img class="avator" :src="actInfo.photo_personal || require('./image/btn.png')">
            <img class="title" :src="require('./image/p3.png')">
            <p>2022年你授信了<em>{{ actInfo.credit_count }}</em><span>个客户</span></p>
            <p>共服务了<em>{{ actInfo.service_count }}</em><span>个客户</span></p>
            <p>总GMV<em>{{ actInfo.amount_of_new_loans }}</em><span>元</span></p>
            <p><em>{{ actInfo.monthly_new_loans_gtn1_millions }}</em><span>个月</span>超过了百万GMV</p>
            <p>在<em>{{ actInfo.mew_loans_gtn1_millions_month }}</em><span>月</span></p>
            <p>你达到了<em>{{ actInfo.mew_loans_gtn1_millions_amount }}</em><span>元</span>的月GMV巅峰</p>
            <p>给一直在路上的自己点赞!</p>
          </div>
          <!-- swipe4 -->
          <div v-if="index === 3" class="w3">
            <img class="avator" :src="actInfo.photo_personal || require('./image/btn.png')">
            <div class="bottom">
              <img class="title" :src="require('./image/p4.png')">
              <p>这一年的你</p>
              <p><span>最早在</span><em>{{ actInfo.earliest_auth_succ_date }}</em>就达成了当日第一单</p>
              <p>愿每一份早起的努力都不被辜负</p>
              <p><span>最晚在</span><em>{{ actInfo.latest_auth_succ_date }}</em>才结束当日最后一单</p>
              <p>感谢披星戴月的自己!</p>
            </div>
          </div>
          <!-- swipe5 -->
          <div v-if="index === 4" class="w4">
            <div class="f-r">
              <img class="avator" :src="actInfo.leader_photo_personal || require('./image/btn.png')">
              <div class="f-r">
                <img class="title" :src="require('./image/p5-1.png')">
                <em>{{ actInfo.leader_name }}</em>
                <img class="title" :src="require('./image/p5-2.png')">
              </div>
            </div>
            <p>{{ actInfo.leader_message }}</p>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </section>
</template>
<script>
import AppBridge from '@/utils/app-bridge'
import visibility from '@/mixins/visibility'
import { apiActivity } from '@/api'
import { IconSvg, Loading } from '@/components'
import Vue from 'vue'
import { Swipe, SwipeItem } from 'vant'
Vue.use(Swipe).use(SwipeItem)
export default {
  components: {
    IconSvg
  },
  mixins: [visibility()],
  data () {
    return {
      statusBarHeight: 0,
      currentIndex: 0,
      actInfo: {},
      swipes: [{
        pic: require('./image/p1.jpg')
      }, {
        pic: require('./image/p2.jpg')
      }, {
        pic: require('./image/p3.jpg')
      }, {
        pic: require('./image/p4.jpg')
      }, {
        pic: require('./image/p5.jpg')
      }]
    }
  },
  computed: {
    statusBarHeightPx () {
      return (this.statusBarHeight || 15) + 'px'
    },
    touchable () {
      return !!this.currentIndex
    }
  },
  async created () {
    this.controlVisibilityChange(this.apiQueryInfos, '年度报告')
  },
  methods: {
    handlerBack () {
      AppBridge.goBack()
    },
    async getStatusBarHeight () {
      const res = await AppBridge.invokeJsBridgeSync('getStateBarHeight')
      if (AppBridge.isAndroid) {
        this.statusBarHeight = res.statusBarHeight / window.devicePixelRatio
      } else {
        this.statusBarHeight = res.statusBarHeight
      }
    },
    handlerChange (index) {
      this.currentIndex = index
    },
    next () {
      const infoReady = !!Object.keys(this.actInfo).length
      if (this.$refs && this.$refs?.SWIPE && infoReady) {
        this.$refs.SWIPE.next()
      } else {
        this.$toast('数据异常，请退出重试')
      }
    },
    async apiQueryInfos () {
      Loading()
      this.getStatusBarHeight()
      try {
        const { mid, min } = this.$user
        const res = await apiActivity.getAnnualSummary({ mid, min }).catch(e => { console.log(e) })
        const dat = await apiActivity.getAnnualSummaryData({ mid, min }).catch(e => { console.log(e) })
        if (res && dat) {
          this.actInfo = Object.assign({}, res, dat)
        } else {
          console.log('接口返回异常，请稍后重试')
        }
        Loading(false)
        apiActivity.viewAnnualSummary({ mid, min }).catch(e => { console.log(e) })
      } catch (e) {
        Loading(false)
        console.error(e)
      }
    }
  }
}
</script>
<style lang="less" scoped>
section {
  position: relative;
  height: 100vh;
  color: #fff;
  .back {
    width: 14px;
    height: 14px;
    color: #fff;
    position: fixed;
    left: 16px;
    z-index: 10;
  }
  .content {
    position: relative;
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
    .btn {
      position: absolute;
      left: 74px;
      bottom: 115px;
      width: 227px;
      height: 56px;
    }
    // common style
    p {
      font-size: 18px;
      font-family: OPPOSans;
      font-weight: 400;
      margin-top: 16px;
      line-height: 23px;
      > span {
        font-size: 23px;
      }
      > em {
        white-space: nowrap;
        padding: 0 10px 0 5px;
        font-style: normal;
        border-bottom: solid 1px rgba(255, 255, 255, .5);
      }
      &:first-child {
        margin-top: 0;
      }
    }
    .avator {
      width: 60px;
      height: 60px;
      border: 2px solid rgba(255,215,76,0.74);
      border-radius: 50%;
    }
    .title {
      height: 34px;
    }
    // common style end

    .w1 {
      padding: 112px 0 0 30px;
      .name {
        padding: 30px 0 0;
        > span {
          font-size: 18px;
          font-family: OPPOSans;
        }
        > img {
          margin-left: 22px;
        }
      }
    }

    .w2 {
      padding: 23px 0 0 30px;
      .title {
        display: block;
        margin-top: 32px;
      }
    }

    .w3 {
      position: relative;
      width: 100%;
      height: 100%;
      .avator {
        margin: 23px 0 0 30px;
      }
      .bottom {
        position: absolute;
        bottom: 130px;
        left: 30px;
        > img {
          display: block;
        }
      }
    }

    .w4 {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 0 30px 130px 30px;
      .f-r {
        align-items: center;
        .avator {
          margin-right: 22px;
        }
        .title {
          height: 29px;
        }
        em {
          white-space: nowrap;
          font-style: normal;
          font-size: 18px;
          padding: 0 10px 0 5px;
          line-height: 29px;
          border-bottom: solid 1px rgba(255, 255, 255, .5);
        }
      }
      > p {
        line-height: 32px;
      }
    }
  }
}
</style>
