// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueRouter from 'vue-router'
import routes from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import './config/rem'
import io from 'socket.io-client'

//阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

Vue.prototype.io = io;
Vue.use(VueMaterial);
Vue.use(vueRouter)

const router = new vueRouter({
    routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
