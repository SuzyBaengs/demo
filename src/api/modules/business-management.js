export default {
  getIncome: '/channel001/puhui/new_app/achievement/get_sale_income.json', // 获取收入数据
  getIncomeV2: '/channel001/puhui/new_app/achievement/get_new_sale_income.json', // 获取v2收入数据
  getSaleIncomeHistory: '/channel001/puhui/new_app/achievement/get_sale_income_history.json', // 获取月度收入历史数据（用于月度收入对比）
  getSaleAchievement: '/channel001/puhui/new_app/achievement/get_sale_achievement.json', // 获取业绩数据
  getMonthlyAchievementCompared: '/channel001/puhui/new_app/achievement/monthly_achievement_compared.json', // 获取月度业绩对比数据
  getIncomeDetail: '/channel001/puhui/new_app/achievement/get_income_detail.json', // 交易明细
  getAchievementSummary: '/channel001/puhui/new_app/achievement/get_achievement_summary.json', // 月交易提成汇总
  getAcquiredIncome: '/channel001/puhui/new_app/achievement/get_acquired_income.json', // 已记收入
  getNoAcquiredIncome: '/channel001/puhui/new_app/achievement/get_no_acquired_income.json', // 未记收入
  getSubtractIncome: '/channel001/puhui/new_app/achievement/get_subtract_income.json', // 扣减收入
  getServiceDetail: '/channel001/puhui/new_app/achievement/get_service_detail.json', // 服务明细
  getCreditDetail: '/channel001/puhui/new_app/achievement/get_credit_detail.json', // 在贷明细
  getPeriods: '/channel001/puhui/new_app/achievement/get_fq_num_list.json', // 查询条件-期数
  getSettledServiceDetail: '/channel001/puhui/new_app/achievement/get_to_be_settled_service_detail.json', // 查询服务提成明显
  // 风险
  queryLoanAnalysis: '/channel001/puhui/new_app/risk/query_loan_analysis.json', // 查询客户经理贷后分析信息-风险-贷前&贷后分析
  querySaleRateInfo: '/channel001/puhui/new_app/risk/query_sale_center_credit_rate_info.json', // 授信通过率月度对比
  querySaleOverdueInfo: '/channel001/puhui/new_app/risk/query_sale_overdue_info.json', // 查询客户经理下用户逾期信息-风险-贷后逾期
  queryUserOverdueDetail: '/channel001/puhui/new_app/risk/query_user_overdue_detail.json' // 查询用户逾期详情-贷后逾期详情
}
