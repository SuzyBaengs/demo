import { cloneDeep } from 'lodash'
const tabList = [
  {
    tab_name: '风险跟进',
    tab_code: 'riskFollowUp',
    tab_sub_code: ['overdueRemind', 'repaymentRemind'],
    tab_item: []
  },
  {
    tab_name: '线索跟进',
    tab_code: 'clueFollowUp',
    tab_sub_code: ['appointmentOrder'],
    tab_item: []
  },
  {
    tab_name: '客户服务',
    tab_code: 'customerService',
    tab_sub_code: ['complaintOrder', 'unlockRetentionApply', 'satisfactionSurvey'],
    tab_item: []
  }
]

// 将智能助手原tabs数据存放至新的tabs（风险更近，线索跟进，客户服务）中
export const tabFilter = (list = [], sort = 'sort') => {
  // 将原tabs数据按序号排序
  const tabs = list.sort(sortBy(sort))
  // 深拷贝新的tabs数组，防止页面重复请求导致多次存放数据
  const tabCloneList = cloneDeep(tabList)
  tabCloneList.forEach((item) => {
    tabs.forEach((tabsItem) => {
      if (item.tab_sub_code.includes(tabsItem.tab_code)) {
        item.tab_item.push(tabsItem)
      }
    })
  })
  return tabCloneList.filter((item) => item.tab_item.length)
}

// attr：根据该属性排序；rev：升序1或降序-1，不填则默认为1
export const sortBy = (attr, rev = 1) => {
  return function (a, b) {
    a = a[attr]
    b = b[attr]
    return (a - b) * rev
  }
}
