import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  collection: [],
  current: {}
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}