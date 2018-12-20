import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import coursesModule from './courses'
import enrollmentsModule from './enrollments'

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