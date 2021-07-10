import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Store from '../components/store.vue'
import GoodsInfo from '../components/goodsInfo.vue'
import User from '../components/user.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/store',
    children: [
      { path: '/store', component: Store },
      { path: '/store/goodsInfo', component: GoodsInfo },
      { path: '/user', component: User }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
