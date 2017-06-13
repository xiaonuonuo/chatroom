import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import model from '@/components/model'
import chat from '@/components/chat'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/model',
      name: 'model',
      component: model
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    }
  ]
})
