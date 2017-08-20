import Vue from 'vue'
import vueRouter from 'vue-router'
import App from '../App'

 // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
const login = r => require.ensure([], () => r(require('../components/login')), 'login')
const model = r => require.ensure([], () => r(require('../components/model')), 'model')
const chat = r => require.ensure([], () => r(require('../components/chat')), 'chat')

const routes = [
    {
      path: '/',
      component: App,
      children: [
          {
              path: '',
              redirect: '/login',
              meta: {keepAlive:true}
          },
          {
              path: '/login',
              component: login,
              meta: {keepAlive:true}
          },
          {
              path: '/model',
              component: model,
          },
          {
              path: '/chat',
              component: chat,
          },
      ]
    },
    // {
    //   path: '/model',
    //   name: 'model',
    //   component: model
    // },
    // {
    //   path: '/chat',
    //   name: 'chat',
    //   component: chat
    // }
  ]

// const router = new vueRouter({
//     routes
// })

export default routes
