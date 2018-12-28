import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
 
Vue.use(Vuetify, {
  theme: {
    primary: '#30A3CE',
    secondary: '#0090C4',
    accent: '#2EC278',
    error: '#C41400'
  }
})

import 'vuetify/dist/vuetify.min.css'
import '@/assets/stylus/main.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  // template: '<App/>',
  // components: { App },
})
.$mount('#app')
