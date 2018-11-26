import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueSessionStorage from 'vue-sessionstorage'

Vue.use(BootstrapVue)
Vue.use(VueSessionStorage)

Vue.config.productionTip = true

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
