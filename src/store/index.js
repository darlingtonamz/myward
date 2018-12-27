import Vue from 'vue';
import Vuex from 'vuex';
import levelsModule from './modules/levels/index'
import schoolsModule from './modules/schools/index'
import wardsModule from './modules/wards/index'

import session from './modules/session'
import { firebaseMutations } from 'vuexfire'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		test: "test data"
	},
	modules: {
		session,
		levels: levelsModule,
		schools: schoolsModule,
		wards: wardsModule,
	},
	mutations: firebaseMutations,
	// actions: {
	// 	bindRef = firebaseAction(({ bindFirebaseRef }, { name, ref }) => {
	// 		// this will unbind any previously bound ref to named-model
	// 		bindFirebaseRef(name, ref)
	// 	})
	// }
})