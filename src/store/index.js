import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 判断是否登录默认false
    isLogin: false
  },
  mutations: {
    // 已经登录
    isLogined(state) {
      state.isLogin = true
    },
    // 没有登录
    noLogin(state) {
      state.isLogin = false
    }
  },
  actions: {},
  modules: {}
})
