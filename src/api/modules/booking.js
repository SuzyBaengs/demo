/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-05-20 18:31:26
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2021-08-05 17:06:26
 */
export default {
  queryAppointmentOrderList: '/channel001/sales/appointment/query_appointment_order_list.json', // 预约单列表
  queryAppointmentOrderDetail: '/channel001/sales/appointment/query_appointment_order_detail.json', // 预约单详情
  closeAppointmentOrder: '/channel001/sales/appointment/close_appointment_order.json', // 预约单关单
  refuseAppointmentOrder: '/channel001/sales/appointment/refuse_appointment_order.json', // 预约单退单
  receiveAppointmentOrder: '/channel001/sales/appointment/receive_appointment_order.json', // 预约单接单
  transferAppointmentOrder: '/channel001/sales/appointment/transfer_appointment_order.json', // 预约单转单
  statisticsAppointmentOrder: '/channel001/sales/appointment/statisticsAppointmentOrder.json' // 获取预约单数量统计
}
