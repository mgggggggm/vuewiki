import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/Login'
import Main from './components/Main'
import Register from './components/Register'
import Video from './components/video/Video'
import UserInfo from './components/userInfo/UserInfo'
import Message from './components/userInfo/Message'
import Avatar from './components/userInfo/Avatar'
import Safe from './components/userInfo/Safe'
import Space from './components/userInfo/Space'
import AvatarChange from './components/userInfo/AvatarChange'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo,
      children: [{
          path: 'message',
        component:Message,

        }, {
          path: 'avatar',
          components:{
            default: Avatar,
            avatar: Avatar,
          },
          children: [{
            path: 'changeAvatar',
            components: {
              default: AvatarChange,
              changeAvatar:AvatarChange,
            },
          }]
        }, {
          path: 'safe',
          components:{
            default: Safe,
            safe: Safe,
          }
        }, {
          path: 'space',
          components:{
            default: Space,
            space: Space,
          }
        }
        ]
    },

  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('Authorization')
    if (token === 'null' || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
