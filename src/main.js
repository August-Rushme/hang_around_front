import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
// 导入字体图标
import './assets/iconfont/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8081/api/v1/'
// 配置请求拦截器(打印日志等)
// 在request拦截器中，展示进度条NPprogress.start()
axios.interceptors.request.use(
  config => {
    NProgress.start()
    console.log('请求参数：', config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 在response拦截器中，隐藏进度条NPprogress.done()
axios.interceptors.response.use(
  response => {
    NProgress.done()
    console.log('返回结果：', response)
    return response
  },
  error => {
    console.log('返回错误：', error)
    return Promise.reject(error)
  }
)
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
