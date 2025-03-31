export default {
  // 收入
  getLastUpdateTime: '/channel001/remuneration/last-update-time', // 获取数据更新时间
  getMyIncomeInfo: '/channel001/remuneration/income/brief', // 获取我的收入数据
  getIncomeDistributions: '/channel001/remuneration/income/distributions', // / 获取月度收入对比
  getRepayNumtypes: '/channel001/remuneration/repay-fqNum-types', // 获取已还期数类型
  getLoanBalanceComposite: '/channel001/remuneration/income/loan-bonus/composite', // 获取在贷余额奖金
  getUnLoanBalanceBonus: '/channel001/puhui/new_app/salary/income/get_unsettled_loan_balance_bonus.json', // 获取待结算在贷余额奖金
  getPerformanceBonusTrades: '/channel001/remuneration/income/perform-bonus/trades', // 获取绩效奖金

  getPerformance: '/channel001/puhui/new_app/salary/income/performance.json', // 获取绩效数据
  getHisPerformance: '/channel001/puhui/new_app/salary/income/hisPerformance.json', // 获取历史业绩达成情况

  getMyStar: '/channel001/puhui/new_app/achievement/income/myStar.json', // 获取我的星级数据
  getStarComparison: '/channel001/puhui/new_app/achievement/income/starComparison.json', // 获取我的星级数据
  // 业绩
  getMyAchievement: '/channel001/puhui/new_app/salary/achievement/myAchievement.json', // 获取我的业绩数据
  getHisAchievement: '/channel001/puhui/new_app/salary/achievement/hisAchievement.json', // 获取历史业绩对比
  getTeamAchievement: '/channel001/puhui/new_app/salary/achievement/team_achievement.json', // 获取团队业绩数据
  getHisTeamAchievement: '/channel001/puhui/new_app/salary/achievement/his_team_achievement.json', // 获取团队历史业绩对比

  // 质量
  getEarlyRepaymentInfo: '/channel001/puhui/new_app/salary/income/get_early_repayment_info.json', // 获取提前还款数据
  getEarlyRepaymentInfoList: '/channel001/puhui/new_app/salary/quality/get_early_repayment_info_list.json', // 获取提还订单明细
  getOverdueInfo: '/channel001/puhui/new_app/salary/quality/get_overdue_info.json', // 获取贷后逾期数据
  getUserOverdueDetail: '/channel001/puhui/new_app/salary/quality/query_user_overdue_detail.json',
  // 交易明细
  getOrderList: '/channel001/puhui/new_app/salary/achievement/orderList.json', // 业绩交易明细
  // 团队人员
  getAchievementRanking: '/channel001/puhui/new_app/data/team/query_achievement_ranking.json', // 查询本月业绩排名
  getManagerLoss: '/channel001/puhui/new_app/data/team/query_manager_loss.json' // 查询本月折损排名
}
