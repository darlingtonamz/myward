import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import lecturesModule from './modules/lectures'
import assessmentsModule from './modules/assessments'
import studiesModule from './modules/studies'

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