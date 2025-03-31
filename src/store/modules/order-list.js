export default {
  namespaced: true,
  state () {
    return {
      isHorizontal: false, // 是否横屏
      outSalaryCalcDates: [] // 薪酬展示日期范围
    }
  },
  mutations: {
    setHorizontal (state, val) {
      state.isHorizontal = val
    },
    setOutSalaryCalcDates (state, val) {
      state.outSalaryCalcDates = val
    }
  }
}
