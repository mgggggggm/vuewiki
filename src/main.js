import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueAxios,axios)
Vue.prototype.$axios=axios
Vue.config.productionTip = false

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
