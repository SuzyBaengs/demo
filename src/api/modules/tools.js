export default {
  queryRiskAreaList: '/channel001/work_loan_sale/risk/query_risk_area_list.json',
  queryRiskArea: '/channel001/work_loan_sale/risk/query_risk_area_listV2.json', // 高风险查询v2
  queryPreMatch: '/channel001/work_loan_sale/manager/query_pre_match.json', // 资金预匹配
  queryMerchantChannel: '/channel001/work_loan_sale/manager/query_merchant_channel.json', // 查询资金渠道

  // 锁定单解锁
  unlockSearchList: '/channel001/puhui/new_app/customercare/unlock_search_list.json', // 申请单列表查询
  unlockGetPplyStatusEnum: '/channel001/puhui/new_app/customercare/unlock_get_pply_status_enum.json', // 获取申请状态枚举
  unlockApplyCommit: '/channel001/puhui/new_app/customercare/unlock_apply_commit.json',
  unlockApplyDetail: '/channel001/puhui/new_app/customercare/unlock_apply_detail.json',
  unlockCheckMobile: '/channel001/puhui/new_app/customercare/unlock_check_mobile.json',
  unlockCheckOrderId: '/channel001/puhui/new_app/customercare/unlock_check_order_id.json',
  unlockGetDealType: '/channel001/puhui/new_app/customercare/get_deal_type.json',
  unlockSelectOrderList: '/channel001/puhui/new_app/customercare/select_unlock_order_list.json',
  unlockDealClose: '/channel001/puhui/new_app/customercare/error_deal_close.json', // 撤销申请
  checkUnlockRetentionApply: '/channel001/puhui/new_app/customercare/checkUnlockRetentionApply.json', // 判断是否能提交挽留申请
  handleUnlockApplyStatus: '/channel001/puhui/new_app/customercare/handleUnlockApplyStatus.json', // 解锁单状态扭转处理

  // 贷款计算器
  calcBaseInfo: '/channel001/puhui/new_app/orderTool/loanCalcul/getRcOrderInfo.json', // 根据手机号码查询授信金额和综合年化率
  calcResult: '/channel001/puhui/new_app/orderTool/loanCalcul/calcul.json', // 计算
  calcOrderType: '/channel001/puhui/new_app/orderTool/loanCalcul/getOrderType.json', // 获取产品类型
  unlockApplyStatus: '/channel001/puhui/new_app/customercare/unlock_apply_status.json', // 申请单状态扭转
  sendUnlockDiscount: '/channel001/puhui/new_app/customercare/send_unlock_discount.json', // 解锁场景发送优惠券
  upgradeUnlock: '/channel001/puhui/new_app/customercare/upgrade_unlock.json', // 升级解锁
  getNewDiscountInfo: '/channel001/work_loan_sale/puhui/new_app/get_new_discount_info.json', // 查询优惠券列表
  checkDiscountSend: '/channel001/work_loan_sale/puhui/new_app/check_discount_send.json' // 批量校验优惠券规则, // 查询优惠券列表
}
