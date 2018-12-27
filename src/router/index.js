import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Auth from '@/views/auth/Auth'
import SchoolsIndex from '@/views/schools/Index'
import WardsIndex from '@/views/wards/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'schools',
          name: 'Schools',
          component: SchoolsIndex,
        },
        {
          path: 'wards',
          name: 'Wards',
          component: WardsIndex,
        },
      ]
    },
    {
      path: '/callback',
      name: 'Auth',
      component: Auth,
    }
  ]
})
