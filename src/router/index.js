import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Auth from '@/views/auth/Auth'

import SchoolsIndex from '@/views/schools/Index'
import SchoolsNew from '@/views/schools/New'
import SchoolsShow from '@/views/schools/Show'
import LevelsNew from '@/views/schools/levels/New'

import WardsIndex from '@/views/wards/Index'
import WardsNew from '@/views/wards/New'
import WardsShow from '@/views/wards/show/Index'
import WardDashboard from '@/views/wards/show/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/wards/:id',
      name: 'wards.show',
      component: WardsShow,
      redirect: {
          name: "wards.show.dashboard"
      },
      children: [
        {
          default: true,
          path: 'dashboard',
          name: 'wards.show.dashboard',
          component: WardDashboard,
        },
      ]
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: {
          name: "wards.index"
      },
      children: [
        {
          path: '/wards',
          name: 'wards.index',
          component: WardsIndex,
          children: [
            {
              path: 'new',
              name: 'wards.new',
              component: WardsNew,
            },
          ]
        },
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
              component: SchoolsShow,
              children: [
                {
                  path: 'new',
                  name: 'levels.new',
                  component: LevelsNew,
                  props: true
                }
              ]
            }
          ]
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
