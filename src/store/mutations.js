// 公共 mutations
import * as types from './mutation-types'

export default {
  [types.KEEP_ALIVE] (state, keepAlive) {
    state.keepAlive = keepAlive || false
  }
}
