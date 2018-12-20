import Vue from 'vue';
import Vuex from 'vuex';
import levelsModule from './modules/levels/index'
import schoolsModule from './modules/schools/index'
import studentsModule from './modules/students/index'

import session from './modules/session'
import { firebaseMutations } from 'vuexfire'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		session,
		levels: levelsModule,
		schools: schoolsModule,
		students: studentsModule,
	},
	mutations: firebaseMutations,
	// actions: {
	// 	bindRef = firebaseAction(({ bindFirebaseRef }, { name, ref }) => {
	// 		// this will unbind any previously bound ref to named-model
	// 		bindFirebaseRef(name, ref)
	// 	})
	// }
})