import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
//导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//配置请求拦截器
//在request拦截器中，展示进度条NPprogress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
})
//在response拦截器中，隐藏进度条NPprogress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
