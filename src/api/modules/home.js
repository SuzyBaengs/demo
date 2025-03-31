/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-11-30 11:26:43
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2022-03-03 16:39:33
 */
export default {
  getDailyMsg: '/channel001/work_loan_sale/puhui/new_app/get_notice.json',
  getNoticeMsgList: '/channel001/work_loan_sale/puhui/new_app/get_notice_msg_list.json',
  getHeadButtonList: '/channel001/work_loan_sale/puhui/new_app/get_head_button_list.json',
  getMoreButtonList: '/channel001/work_loan_sale/puhui/new_app/get_more_button_list.json',
  getWorkStage: '/channel001/work_loan_sale/puhui/new_app/get_work_stage.json',
  // 查询bd用户信息
  queryManagerAdmin: '/channel001/work_loan_sale/puhui/new_app/queryManagerAdmin.json',
  // 查询当前db上班状态
  attendanceClockStatus: '/channel001/work_loan_sale/puhui/new_app/attendance/clock_status.json',
  // db考勤
  attendanceClock: '/channel001/work_loan_sale/puhui/new_app/attendance/clock.json',
  uploadManagerLBS: '/channel001/work_loan_sale/puhui/new_app/upload_manager_lbs.json',
  // 根据场景获取商户配置信息
  getMerchant: '/channel001/work_loan_sale/puhui/new_app/qr_code/get_merchant.json',
  // 上传用户截屏
  uploadScreenshot: '/channel001/work_loan_sale/puhui/new_app/manager_operation/save_manager_operation_water.json',
  // 场景贷二维码是否弹窗提醒
  displayScenePop: '/channel001/work_loan_sale/puhui/new_app/vechicle_owner_loan/display_pop.json',
  // 刷新二维码token
  refreshQrCodeToken: '/channel001/work_loan_sale/puhui/new_app/refresh_qrcode_token.json',
  // 查询token是否有效
  verifyQrCodeStatus: '/channel001/work_loan_sale/puhui/new_app/verify_qrcode_status.json',
  // 上报客户经理地理位置信息，获取lbs_id
  uploadLBS: '/channel001/work_loan_sale/puhui/new_app/order/save_manager_lbs_info.json',
  // 龙虎榜上榜
  rankNotice: '/channel001/puhui/new_app/composite/longHuRank/rankNotice.json',
  queryManagerPermission: '/channel001/work_loan_sale/puhui/new_app/query_manager_permission.json',
  // 获取运营弹窗页
  getPopupPage: '/channel001/puhui/new_app/composite/popup/get_popup_page.json',
  queryPublicMsg: '/channel001/puhui/new_app/composite/query_public_msg.json', // 获取[强制阅读]公告弹窗
  savePublicMsgLog: '/channel001/puhui/new_app/composite/save_public_msg_log.json', // 保持[强制阅读]公告弹窗状态
  // 确认弹窗页
  confirmPopupPage: '/channel001/puhui/new_app/composite/popup/confirm_popup_page.json',
  // 工作台满意度调查
  getQuestion: '/channel001/work_loan_sale/puhui/question/get_nare_total.json',
  // 法人绑定
  validateLegal: '/channel001/puhui/new_app/validate/validate_tel.json',
  // 定位轨迹上报
  locationTraceReport: '/channel001/puhui/new_app/data/bd/location/report.json'
}
