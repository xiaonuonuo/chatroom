// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueRouter from 'vue-router'
import routes from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import './config/rem'
import VueSocketio from 'vue-socket.io';


Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VueSocketio, 'http://localhost:1932');
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
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    customEmit: function(val){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
})
