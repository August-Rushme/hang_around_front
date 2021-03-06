import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 判断是否登录
    isLogin: window.sessionStorage.getItem('isLogined'),
    // 判断当前点击的是哪个商品
    goodsId: 1
  },
  mutations: {
    // 已经登录
    isLogined(state) {
      state.isLogin = window.sessionStorage.getItem('isLogined')
    },
    // 没有登录
    noLogin(state) {
      state.isLogin = window.sessionStorage.setItem('isLogined', false)
    },
    // 点击商品当前的id
    currentId(state, id) {
      state.goodsId = id
    }
  },
  actions: {},
  modules: {}
})
