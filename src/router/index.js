import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/login.vue'
const Login = () => import(/* webpackChunkName:"Login_Home_Store" */ '../components/login.vue')
// import Home from '../components/home.vue'
const Home = () => import(/* webpackChunkName:"Login_Home_Store" */ '../components/home.vue')
// import Store from '../components/store.vue'
const Store = () => import(/* webpackChunkName:"Login_Home_Store" */ '../components/store.vue')
// import GoodsInfo from '../components/goodsInfo.vue'
const GoodsInfo = () => import(/* webpackChunkName:"GoodsInfo_User" */ '../components/goodsInfo.vue')
// import User from '../components/user.vue'
const User = () => import(/* webpackChunkName:"GoodsInfo_User" */ '../components/user.vue')
// import Goods from '../components/goods.vue'
const Goods = () => import(/* webpackChunkName:"AddGood_Goods_Collection" */ '../components/goods.vue')
// import AddGood from '../components/addGoods.vue'
const AddGood = () => import(/* webpackChunkName:"AddGood_Good_Collection" */ '../components/addGoods.vue')
// import Collection from '../components/collection.vue'
const Collection = () => import(/* webpackChunkName:"AddGood_Goods_Collection" */ '../components/collection.vue')

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
      { path: '/user', component: User, meta: { loginRequire: true } },
      { path: '/goods', component: Goods, meta: { loginRequire: true } },
      { path: '/goods/add', component: AddGood, meta: { loginRequire: true } },
      { path: '/collection', component: Collection, meta: { loginRequire: true } }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (
    to.matched.some(function(item) {
      return item.meta.loginRequire
    })
  ) {
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
  } else {
    next()
  }
})

export default router
