import Vue from 'vue';
import Vuex from 'vuex';
import wardModule from './modules/ward/index'

import session from './modules/session'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		session,
		ward: wardModule,
	}
})