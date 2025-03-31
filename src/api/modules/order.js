/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-05-20 18:31:26
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2021-12-16 10:57:25
 */
export default {
  getLehuakaDetail: '/channel001/work_loan_sale/lehuaka/get_lehuaka_detail.json',
  getAllOrderList: '/channel001/work_loan_sale/puhui/new_app/get_all_order_list.json',
  queryOrderReason: '/channel001/sales/appointment/appointment_order_reason_type.json', // 预约单关单/退单 原因
  closeOrder: '/channel001/work_loan_sale/order/close_appointment_order.json',
  transferOrder: '/channel001/work_loan_sale/order/transfer_appointment_order.json',
  closeCreditOrder: '/channel001/work_loan_sale/puhui/new_app/close_order.json',
  closeMgmCreditOrder: '/channel001/work_mgm_server/puhui/new_app/close_order.json',
  submitKYC: '/channel001/work_loan_sale/puhui/new_app/submit_kyc_info.json',
  getKycList: '/channel001/work_loan_sale/puhui/new_app/get_kyc_list.json',
  saveKycInfo: '/channel001/work_loan_sale/puhui/new_app/save_kyc_info.json',
  submitSceneOrder: '/channel001/work_loan_sale/puhui/new_app/submit_scene_loan_order.json',
  checkUserHouseLoanLabel: '/channel001/puhui/new_app/credit/house_loan/check_user_house_loan_label.json', // 房贷失败，查询是否有普惠授信标签
  queryCreditResultDesc: '/channel001/puhui/new_app/credit/product/v3/house/sale/query_credit_result_desc.json', // 房贷失败，查询失败描述
  queryPayCreditResultDesc: '/channel001/puhui/new_app/credit/product/v3/pay/sale/query_credit_result_desc.json', // 流水授信失败，查询失败描述
  querySurveys: '/channel001/puhui/credit/sale/surveys.json', // BD侧-资料项-查询尽调内容
  saveSurveys: '/channel001/puhui/credit/survey/save.json', // BD资料项-保存尽调内容
  querySurveysType: '/channel001/puhui/credit/identity/query.json', // 查询尽调模板类型
  saveSurveysType: '/channel001/puhui/credit/identity/save.json' // 保存尽调模板类型
}
