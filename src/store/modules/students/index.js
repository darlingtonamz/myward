import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import coursesModule from './modules/courses'
import enrollmentsModule from './modules/enrollments'

const state = {
  students: [],
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    courses: coursesModule,
    enrollments: enrollmentsModule,
  }
}