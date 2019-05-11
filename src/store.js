import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import Cookies from 'js-cookie'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 存储token
    Authorization: '',
    //存储用户信息
    User:[],
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, Authorization) {
      state.Authorization = Authorization
    },
    getUser (state, User) {
      let id = User.id
      let username = User.username
      state.User.push({
        id: id,
        username: username
      })
    },
  }
});

export default store
