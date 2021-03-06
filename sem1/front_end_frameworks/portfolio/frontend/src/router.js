import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Portfolio from './views/Portfolio.vue'
import PortfolioPiece from './views/PortfolioPiece.vue'
import Products from './views/Products.vue'
import Product from './views/Product.vue'
import Blog from './views/Blog.vue'
import BlogPost from './views/BlogPost.vue'
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
      path: '/portfolio/:id', 
      component: PortfolioPiece 
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/products/:id',
      component: Product
    },
    // {
    //   path: '/workflow',
    //   name: 'workflow',
    //   component: Workflow
    // },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: BlogPost
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
})
