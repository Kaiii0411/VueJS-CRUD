import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product',
    name: 'product.list',
    component: () => import('../views/products/List.vue')
  },
  {
    path: '/product/create',
    name: 'product.create',
    component: () => import('../views/products/Form.vue')
  },
  {
    path: '/product/edit/:id',
    name: 'product.edit',
    component: () => import('../views/products/Form.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
