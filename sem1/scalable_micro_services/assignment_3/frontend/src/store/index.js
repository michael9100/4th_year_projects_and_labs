import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios" 
import Router from '../router'
import auth from './modules/auth'

Vue.use(Vuex)

Router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (sessionStorage.getItem('tattbooksAuth') != null) {
      next()
    }
    else {
      next('login')
    }
  }
  else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (sessionStorage.getItem('tattbooksAuth') == null) {
      next()
    }
    else {
      next('./dashboard')
    }
  }
  else {
    next()
  }
})

export default new Vuex.Store({
  modules: {
    auth,
  }
})
