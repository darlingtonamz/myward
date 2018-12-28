import Vue from 'vue';
import Vuex from 'vuex';
import levelsModule from './modules/levels/index'
import schoolsModule from './modules/schools/index'
import wardsModule from './modules/wards/index'

import session from './modules/session'
import { firebaseMutations } from 'vuexfire'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  reducer: state => ({
    wards: state.wards,
    schools: state.schools,
    levels: state.levels,
  }),
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

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
  plugins: [vuexLocalStorage.plugin]
})