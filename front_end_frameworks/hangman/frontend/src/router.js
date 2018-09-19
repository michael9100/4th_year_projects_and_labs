import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (sessionStorage.getItem('user') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } 
    else {
      next()
    }
  } 
  else if (to.matched.some(record => record.meta.guest)) {
    if (sessionStorage.getItem('user') == null) {
      next()
    }
    else {
      next({ 
        path: '/' 
      })
    }
  } 
  else {
    next()
  }
})

export default router