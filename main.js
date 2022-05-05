import App from './App'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
//引入全局 Uview
import uView from "uview-ui";
Vue.use(uView);
const app = new Vue({
    ...App
})

import httpInterceptor from 'common/http.interceptor.js'
// http接口API集中管理引入部分
import httpApi from 'common/http.api.js'
Vue.use(httpApi, app)

// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif