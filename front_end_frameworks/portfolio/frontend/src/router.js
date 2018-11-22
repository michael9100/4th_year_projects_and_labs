import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Portfolio from './views/Portfolio.vue'
import Products from './views/Products.vue'
import Workflow from './views/Workflow.vue'
import Blog from './views/Blog.vue'
import Contact from './views/Contact.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/workflow',
      name: 'workflow',
      component: Workflow
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
})
