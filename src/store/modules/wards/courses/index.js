import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import lecturesModule from './lectures'
import assessmentsModule from './assessments'
import studiesModule from './studies'

const state = {
  courses: [],
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    lectures: lecturesModule,
    assessments: assessmentsModule,
    studies: studiesModule,
  }
}