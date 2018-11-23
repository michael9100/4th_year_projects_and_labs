import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

import {VueMasonryPlugin} from 'vue-masonry'
import VueLazyLoad from 'vue-lazyload'
import feather from 'vue-icon'

Vue.use(VueMasonryPlugin) 
Vue.use(VueLazyLoad) 
Vue.use(feather, 'v-icon')


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
