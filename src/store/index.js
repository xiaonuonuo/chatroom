
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
        },
        userNum: 0,
    },
    getters: {
        getSocket: state => state.socket,
        getUser: state => state.user
    },
    mutations: {
        setSocket(state,data){
            state.socket = data
        },
        setUser(state,data){
            state.user = data
        },
        setUserNum(state,data){
            state.userName = data
        }
    },
    actions: {

    }
})

export default store
