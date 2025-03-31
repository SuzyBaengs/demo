/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-09-18 18:15:10
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2021-09-24 10:08:30
 */
export default {
  queryWorkList: '/channel001/work_loan_sale/data/query_work_detail.json', // 获取作业数据
  queryOrderCoordinateList: '/channel001/work_loan_sale/data/query_order_coordinate_list.json', // 查询办单位置坐标
  queryOrderLocationList: '/channel001/work_loan_sale/data/query_order_position_list.json', // 查询办单位置列表
  positionFeedBack: '/channel001/work_loan_sale/order/position_feedback.json', // 反馈定位
  // 代理商
  getAuthPassingRate: '/channel001/work_loan_sale/data/get_auth_passing_rate_data.json', // 查询授信通过率数据
  getLimitUsageRate: '/channel001/work_loan_sale/data/get_limit_usage_rate_data.json', // 查询授信额度使用率数据
  getOverdueData: '/channel001/work_loan_sale/data/get_overdue_data.json', // 查询逾期率数据
  getAuthPassingRateLine: '/channel001/work_loan_sale/data/get_auth_passing_rate_line_chart.json', // 授信通过率折线图接口
  getLimitUsageRateLine: '/channel001/work_loan_sale/data/get_limit_usage_rate_line_chart.json' // 额度使用率折线图接口
}
