/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-02-04 12:44:21
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2022-01-14 14:31:19
 */
export default {
  // original
  queryUserDetail: '/channel001/work_loan_sale/puhui/new_app/query_user_detail.json', // 查询详情页面基础信息&&营销信息
  queryCertification: '/channel001/work_loan_sale/puhui/new_app/new_certification_status.json', // 查询详情页面认证信息
  queryOrderList: '/channel001/work_loan_sale/puhui/new_app/new_query_order_list.json', // 查询详情页面交易信息
  addUserRemark: '/channel001/work_loan_sale/puhui/new_app/new_add_user_remark.json', // 详情页面添加备注
  getNewDiscountInfo: '/channel001/work_loan_sale/puhui/new_app/get_new_discount_info.json', // 查询优惠券列表
  getTagList: '/channel001/work_loan_sale/puhui/new_app/new_list.json', // 添加标签弹层列表
  queryUserInfo: '/channel001/work_loan_sale/puhui/new_app/new_query_user_info.json', // 查看明文
  sendNewDiscount: '/channel001/work_loan_sale/puhui/new_app/send_new_discount.json', // 发放优惠券
  queryDiscountList: '/channel001/work_loan_sale/order/query_user_discount_list.json', // 订单详情优惠券信息
  updateTags: '/channel001/work_loan_sale/puhui/new_app/edit.json', // 编辑标签
  queryAmountLimit: '/channel001/work_loan_sale/puhui/new_app/query_limit.json', // 查询用户提额信息
  queryManagerDepartments: '/channel001/work_loan_sale/puhui/new_app/query_manager_departments.json', // 查询当前登录客户经理片区信息
  querySaleCompany: '/channel001/puhui/new_app/sale/company/querySaleCompany.json', // 查询当前登录客户经理片区和人员信息
  queryConversionList: '/channel001/work_loan_sale/puhui/new_app/query_conversion_list.json', // 客户管理列表
  checkDiscountSend: '/channel001/work_loan_sale/puhui/new_app/check_discount_send.json', // 批量校验优惠券规则
  // rebuild
  getCustomerPortrait: '/channel001/puhui/new_app/customer/analysis/get_customer_portrait.json', // 获取客户画像分析
  getCustomerPortraitForLeader: '/channel001/puhui/new_app/customer/analysis/get_customer_portrait_for_leader.json', // 获取客户画像分析 for leader
  getCustomerArea: '/channel001/puhui/new_app/customer/analysis/query_customer_area.json', // 获取客户区域分布分析
  getCustomerAreaForLeader: '/channel001/puhui/new_app/customer/analysis/query_customer_area_for_leader.json', // 获取客户区域分布分析 for leader
  getCustomerRetained: '/channel001/puhui/new_app/customer/analysis/get_customer_retained.json', // 获取客户留存分析
  getCustomerRetainedForLeader: '/channel001/puhui/new_app/customer/analysis/get_customer_retained_for_leader.json', // 获取客户留存分析 for leader
  getSilkBagList: '/channel001/puhui/new_app/silk/get_silk_bag_list.json', // 获取客户经理锦囊列表
  getSilkBagDetail: '/channel001/puhui/new_app/speech/get_silk_bag_detail.json', // 获取小乐推荐话术
  saveSpeechArt: '/channel001/puhui/new_app/speech/save_speech_art.json', // 投稿小乐推荐话术
  changeSpeechArt: '/channel001/puhui/new_app/speech/speech_art_change.json', // 更换小乐推荐话术
  saveThumbsUp: '/channel001/puhui/new_app/speech/save_operation.json', // 小乐推荐话术评价
  getSilkBagCustomerList: ' /channel001/puhui/new_app/silk/customer_list.json', // 获取符合条件用户(经营锦囊)
  getSpeechArtList: '/channel001/puhui/new_app/speech/get_speech_art_list.json', // 获取小乐推荐话术投稿记录
  queryBaseInfo: '/channel001/puhui/new_app/customer/info/query_base_info.json', // 查询客户基础信息
  queryDiscountInfo: '/channel001/puhui/new_app/customer/info/query_user_discount_info.json', // 查询客户优惠券信息
  queryFollowInfo: '/channel001/puhui/new_app/customer/info/query_user_follow_info.json', // 查询客户跟进信息
  queryRightInfo: '/channel001/puhui/new_app/customer/info/query_user_right_info.json', // 查询客户权益信息
  queryTradeInfo: '/channel001/puhui/new_app/customer/info/query_user_trade_info.json', // 查询客户交易信息
  addFollowInfo: '/channel001/puhui/new_app/customer/info/add_user_follow_info.json', // 添加客户跟进信息
  updateUserFollow: '/channel001/puhui/new_app/customer/info/update_user_follow.json', // 修改删除跟进记录
  queryUserFollowDetail: '/channel001/puhui/new_app/customer/info/query_user_follow_detail.json', // 查询跟进记录详情
  goCreditLimit: '/channel001/puhui/new_app/limit/go_credit_limit.json', // 提额
  queryAllCustomerList: '/channel001/puhui/new_app/customer/info/query_all_customer_list.json', // 查询全部客户
  queryAllCustomerListForLeader: '/channel001/puhui/new_app/customer/info/query_all_customer_list_for_leader.json', // 查询全部客户 for leader
  queryRecentUpdateCustomerList: '/channel001/puhui/new_app/customer/info/query_recent_update_customer_list.json', // 最近更新客户
  queryRecentUpdateCustomerListForLeader: '/channel001/puhui/new_app/customer/info/query_recent_update_customer_list_for_leader.json', // 最近更新客户 for leader
  queryLabelList: '/channel001/puhui/new_app/label/query_label_list.json', // 获取所有标签
  addLabel: '/channel001/puhui/new_app/label/add_label.json', // 添加标签
  deleteLabel: '/channel001/puhui/new_app/label/delete_label.json', // 删除标签
  labelManager: '/channel001/puhui/new_app/label/label_manager.json', // 编辑用户标签
  queryGrayId: '/channel001/work_loan_sale/manager/query_gray_mid.json', // 判断新旧页面跳转
  checkLeader: '/channel001/puhui/new_app/sale/check_manager_leader.json', // 检测是否为leader或者代理商leader
  checkNewLeader: '/channel001/puhui/new_app/achievement/v1/checkLeader', // 检测是否为leader
  getFollowRecord: '/channel001/puhui/new_app/customer/info/getFollowRecord.json', // 跟进时间记录
  queryUserPrice: '/channel001/puhui/new_app/customer/info/query_user_price.json', // 用户详情定价接口查询
  queryUserAuthInfo: '/channel001/puhui/new_app/customer/info/query_user_auth_info.json', // 查询用户认证信息
  queryUserPredictiveInfo: '/channel001/puhui/new_app/customer/info/query_user_predictive_info.json', // 查询用户预测信息
  queryUserOtherInfo: '/channel001/puhui/new_app/customer/info/query_user_other_info.json', // 查询用户其他信息
  // 交易订单
  querySaleOrderPage: '/channel001/puhui/new_app/sale/order/querySaleOrderPage.json',
  searchList: '/channel001/puhui/new_app/order/get_search_list.json', // 历史搜索记录
  saveSearch: '/channel001/puhui/new_app/order/save_search.json', // 保存当前搜索记录
  dropAll: '/channel001/puhui/new_app/order/drop_all.json', // 删除当前搜索记录
  closeSaleOrder: '/channel001/puhui/new_app/sale/order/closeOrder.json', // 交易单关单
  queryServiceVoucher: '/channel001/puhui/new_app/sale/order/queryServiceVoucher.json', // 交易单查询服务承诺书
  uploadServiceCommit: '/channel001/puhui/new_app/sale/order/uploadServiceVoucher.json', // 交易单上传服务承诺书
  queryClusterStratifie: '/channel001/work_loan_sale/puhui/new_app/query_cluster_stratifie.json', // 查询用户信息枚举
  saveClusterStratifie: '/channel001/work_loan_sale/puhui/new_app/save_cluster_stratifie.json', // 保存用户信息
  queryRcLabelType: '/channel001/puhui/new_app/label/queryRcLabelType.json', // 查询风控标签【房贷标签】
  getMarketLabel: '/channel001/puhui/new_app/customer/getMarketLabel.json', // 查询营销标签【ID1286727】
  // 意向用户 http://wiki.fenqile.com/pages/viewpage.action?pageId=157690868
  getVisitUserPage: '/channel001/puhui/new_app/customer/visit/getVisitUserPage.json', // 查询意向客户列表接口
  addVisitUserLabel: '/channel001/puhui/new_app/customer/visit/addVisitUserLabel.json', // 添加意向用户标签
  getBdVisitUserLabel: '/channel001/puhui/new_app/customer/visit/getBdVisitUserLabel.json', // 获取BD意向列表筛选条件标签集合
  visitUserLabelManager: '/channel001/puhui/new_app/customer/visit/visitUserLabelManager.json', // 管理意向用户标签接口
  saveVisitUser: '/channel001/puhui/new_app/customer/visit/saveVisitUser.json', // 保存意向用户
  queryVisitDetail: '/channel001/puhui/new_app/customer/visit/queryVisitDetail.json', // 查询意向客户详情
  updateVisitUser: '/channel001/puhui/new_app/customer/visit/updateVisitUser.json', // 编辑 | 删除 意向客户
  checkVisitPhone: '/channel001/puhui/new_app/customer/visit/checkVisitPhone.json', // 校验手机号码
  addWillingUserFollow: '/channel001/puhui/new_app/customer/visit/addUserFollow.json', // 添加意向客户跟进信息
  queryWillingUserFollowDetail: '/channel001/puhui/new_app/customer/visit/queryUserFollowDetail.json', // 查询意向客户跟进详情
  updateWillingUserFollow: '/channel001/puhui/new_app/customer/visit/updateUserFollow.json', // 更新意向客户跟进信息
  queryUserFollowPage: '/channel001/puhui/new_app/customer/visit/queryUserFollowPage.json', // 查询意向客户跟进信息列表
  queryVisitFollow: '/channel001/puhui/new_app/customer/visit/queryVisitFollow.json', // 查询意向客户陌拜总结
  // 客户留存
  statisticsTotalRetained: '/channel001/puhui/new_app/customer/analysis/statisticsTotalRetained.json', // 总客户接口
  statisticsCustomerRetained: '/channel001/puhui/new_app/customer/analysis/statisticsCustomerRetained.json', // 进件客户转化接口
  statisticsInterestedCustomerRetained: '/channel001/puhui/new_app/customer/analysis/statisticsInterestedCustomerRetained.json', // 意向客户转化接口
  getBdUserDetail: '/channel001/puhui/new_app/customer/analysis/getBdUserDetail.json', // BD客户明细接口

  queryCreditMaterials: '/channel001/puhui/new_app/credit/product/v3/lehuaPurse/query_credit_result_page.json' // 乐花钱包V2授信bd侧查询材料项接口
}
