/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-01-06 12:11:13
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2022-02-25 15:12:29
 */
export default {
  getDiscountInfo: '/channel001/work_loan_sale/puhui/new_app/new_get_discount_info.json', // 查询优惠券列表
  giveOutLockLehuaDiscount: '/channel001/work_loan_sale/puhui/new_app/give_out_lock_lehua_discount.json', // 客户经理发券
  queryActivityList: '/channel001/work_loan_sale/puhui/new_app/new_activity_list.json', // 查询活动列表
  queryActivityDetail: '/channel001/work_loan_sale/puhui/new_app/new_query_activity_detail.json', // 查询活动详情
  addActivityData: '/channel001/work_loan_sale/puhui/new_app/add_activity_data.json', // 活动数据埋点
  giveOutDiscount: '/channel001/work_loan_sale/puhui/new_app/give_out_discount.json', // 客户经理发券
  getShopUrl: '/channel001/puhui/new_app/sale/electricity/get_url.json', // 获取电商url
  // 降息工具接口
  getReduceCount: '/channel001/puhui/new_app/sale/priceReduce/reduceCount.json', // bd当月降价次数信息
  getReduceQualification: '/channel001/puhui/new_app/sale/priceReduce/reduceQualification.json', // 查询用户资格
  applyDetailQuery: '/channel001/puhui/new_app/sale/priceReduce/applyDetailQuery.json', // 查询用户降息详情
  applySubmit: '/channel001/puhui/new_app/sale/priceReduce/applySubmit.json', // 提交用户降息申请
  applyResultQuery: '/channel001/puhui/new_app/sale/priceReduce/applyResultQuery.json', // 查询降息结果
  getReducelist: '/channel001/puhui/new_app/sale/priceReduce/listByPage.json', // 查询降息历史记录
  checkRole: '/channel001/puhui/new_app/sales/bd/check_role.json' // 校验BD角色
}
