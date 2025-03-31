import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import { importAll } from '@/utils/import-all'
Vue.use(Vuex)

const storeModules = importAll(
  require.context('@/store/modules', false, /\.js$/)
)
const moduleMap = {}
storeModules.forEach(item => {
  moduleMap[item.camelModuleName] = item.module
})

const DEBUG = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: moduleMap,
  strict: DEBUG
})
