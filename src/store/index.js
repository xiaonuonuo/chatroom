
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


const store = new Vuex({
    state: {
        socket: ''
    },
    getters: {
        getsocket: state => state.socket
    },
    mutations: {
        setgetsocket(state,data){
            state.socket = data
        }
    },
    actions: {

    }
})

export default store
