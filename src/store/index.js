import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 判断是否登录默认false
    isLogin: false,
    // 判断当前点击的是哪个商品
    goodsId: 1
  },
  mutations: {
    // 已经登录
    isLogined(state) {
      state.isLogin = true
    },
    // 没有登录
    noLogin(state) {
      state.isLogin = false
    },
    // 点击商品当前的id
    currentId(state, id) {
      state.goodsId = id
    }
  },
  actions: {},
  modules: {}
})
