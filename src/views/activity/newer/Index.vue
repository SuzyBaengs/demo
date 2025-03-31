<template>
  <section>
    <van-pull-refresh v-model="isLoading" @refresh="apiQueryInfos">
      <div class="newer-header">
        <AppHeader2 color="#fff">
          <template #right>
            <p class="right-btn" @click="handleRightClick">活动说明</p>
          </template>
        </AppHeader2>
        <h2 :style="{ marginTop: 30 }">新同学成长之路</h2>
        <p>完成以下新人任务，还可以获得积分</p>
      </div>
      <ul class="newer-task-list">
        <li v-for="(task, index) in taskList" :key="index" class="f-r jc-sb" @click="handlerTask(task)">
          <div class="l">
            <h3>{{ task.act_name }}</h3>
            <p>+{{ task.act_integral }}&nbsp;积分</p>
          </div>
          <!-- 0-待解锁, 1-待完成, 2-已完成 -->
          <span :class="[`s${task.act_status}`]">{{ task.act_status === 2 ? `已完成`: (task.act_status === 0 ? '待解锁' : '去完成') }}</span>
        </li>
      </ul>
    </van-pull-refresh>
  </section>
</template>
<script>
import { AppHeader2, Dialog } from '@/components'
import AppBridge from '@/utils/app-bridge'
import bar from '@/mixins/bar'
import visibility from '@/mixins/visibility'
import { apiBase, apiMembers } from '@/api'
export default {
  components: {
    AppHeader2
  },
  mixins: [bar(), visibility()],
  data () {
    return {
      isLoading: false,
      taskList: [],
      actConfigId: +this.$url.query.act_config_id || ''
    }
  },
  async created () {
    this.controlVisibilityChange(this.apiQueryInfos, '新人活动')
  },
  methods: {
    async apiQueryInfos () {
      const act = await apiMembers.getMyActivity({ actConfigId: this.actConfigId })
      this.taskList = act
      this.isLoading = false
    },
    async handleRightClick () {
      this.$stat('EVENT_DESC.TAB')
      const h = this.$createElement
      const res = await apiBase.getHippoConfig({ name_space: 'hippo.work_common_config', name: 'act_newer_configs' })
      const desc = res ? res.desc.map(v => h('p', v)) : [h('p', '未获取配置，请退出重试')]
      Dialog({
        title: '活动说明',
        message: h('div', { style: { textAlign: 'left' } }, desc),
        buttons: [{
          text: '我知道了',
          handler: async (done) => {
            done()
          }
        }]
      })
    },
    async handlerTask (task) {
      const map = {
        入职欢迎信: 'WELCOME',
        团队融入度调研: 'QUESTION',
        萌新学习课堂: 'CLASSROOM',
        导师满意度评价: 'SATISFACTION_QUESTION',
        萌新业绩目标达成调研: 'PERFORMANCE_QUESTION',
        导师祝贺信: 'CONGRATULATION'
      }
      const status = ['待解锁', '待完成', '已完成']
      map[task.act_name] && this.$stat(`${map[task.act_name]}.TAB`, {}, { key: 'task_state', title: status[task.act_status] })
      if (task.act_status !== 1) return // 待解锁 & 已完成 [去完成继续]
      const actState = await apiMembers.checkActState({ actConfigId: this.actConfigId, actId: task.act_id, actName: task.act_name })
      if (actState && actState.is_success === 1) {
        this.$toast(actState.reason)
        return
      }
      const needToken = +task.act_type !== 0
      let url = task.act_url
      if (url) {
        if (needToken) { // 第三方
          const yun = await apiMembers.getLeDaToken()
          if (!(yun && yun.token)) {
            this.$toast('任务校验失败，请稍候重试')
            return
          }
          const targetUrl = encodeURIComponent(url)
          url = `${yun.token}&returnurl=${targetUrl}`
        } else {
          if (task.act_status === 1) { // 需要倒计时
            url = `${url}?count=1&actConfigId=${this.actConfigId}&actId=${task.act_id}&actName=${encodeURI(task.act_name)}`
          }
        }
        AppBridge.openUrl(url)
      }
    }
  }
}
</script>
<style lang="less" scoped>
section {
  min-height: 100vh;
  .newer-header {
    height: 266px;
    background-image: url('./img/newer_header_bg.png');
    background-size: 100% 100%;
    color: #FFF2E0;
    .right-btn {
      font-size: 14px;
      color: #fff;
      font-family: PingFangSC-Medium, PingFang SC;
    }
    > h2 {
      text-align: center;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
    }
    > p {
      text-align: center;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      margin-top: 24px;
      span {
        font-size: 22px;
        font-family: DINPro-Medium, DINPro;
      }
    }
  }
  .newer-task-list {
    margin-top: -59px;
    padding: 16px;
    border-radius: 8px 8px 0px 0px;
    background: #fff;
    min-height: 300px;
    li {
      padding: 16px 16px 16px 0;
      margin-left: 16px;
      border-bottom: solid 1px #EDEDEE;
      font-weight: 500;
      .l {
        h3 {
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          color: #363C48;
          line-height: 17px;
        }
        p {
          font-family: DINPro-Medium, DINPro;
          color: #FF7912;
          line-height: 14px;
          margin-top: 8px;
        }
      }
      > span {
        width: 72px;
        padding: 6px 0;
        border-radius: 13px;
        font-size: 12px;
        text-align: center;
        color: #fff;
        font-family: PingFangSC-Medium, PingFang SC;
        background: linear-gradient(309deg, #407AFF 0%, #408FFF 100%);
        &.s2 {
          background: #ddd;
        }
      }
    }
  }
}
</style>
