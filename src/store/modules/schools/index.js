import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  collection: [],
  currentSchool: {}
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}