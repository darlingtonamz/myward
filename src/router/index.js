import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Auth from '@/views/auth/Auth'

import SchoolsIndex from '@/views/schools/Index'
import SchoolsNew from '@/views/schools/New'
import SchoolsShow from '@/views/schools/Show'

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
          path: '/schools',
          name: 'schools.index',
          component: SchoolsIndex,
          children: [
            {
              path: 'new',
              name: 'schools.new',
              component: SchoolsNew
            },
            {
              path: ':id',
              name: 'schools.show',
              component: SchoolsShow
            }
          ]
        },
        {
          path: 'wards',
          name: 'wards.index',
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
