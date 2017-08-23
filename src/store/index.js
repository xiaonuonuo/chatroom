
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        socket: '',
        user:{
            name: '',
            src: '',
            room: ''
        }
    },
    getters: {
        getSocket: state => state.socket
    },
    mutations: {
        setSocket(state,data){
            state.socket = data
        }
    },
    actions: {

    }
})

export default store
