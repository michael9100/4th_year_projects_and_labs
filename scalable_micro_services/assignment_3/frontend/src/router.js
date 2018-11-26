import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {requiresAuth: true}
    },
    {
      path: '/',
      redirect: '/dashboard',
      meta: {requiresAuth: true}
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {requiresGuest: true}
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {requiresGuest: true}
    },
  ]
})

export default router