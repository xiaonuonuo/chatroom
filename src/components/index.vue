<template lang="html">
    <div class="login page">
        <div class="form">
            <h3 class="title">What's your nickname?</h3>
            <input class="usernameInput" type="text" maxlength="14" v-on:keyup.enter="commitUserName" v-model="getUser.name"/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name:'index',
        data(){
            return {

            }
        },
        methods:{
            commitUserName() {
                var that = this;
                //加入用户的名字
                this.getSocket.emit('addUser',this.getUser.name)
                //提交该用户到服务端，并跳转到聊天页面
                this.getSocket.on('login',function(data){
                    console.log(data)
                    if(data.username){
                        that.$router.push({path:'/chat',query:{userName:that.getUser.name}})
                    }
                })  
            },
        },
        created() {
            //do something after creating vue instance
            var that = this

            this.$store.commit('setSocket',this.io.connect('http://localhost:1932'))
            this.getSocket.on('connect',function(){
                console.log('socket is linked')
            })

            //this.getSocket.commit('getUser',this.getUser.name)
            // this.socket = this.io.connect('http://localhost:1932')
            
            // this.socket.on('connect',function(){
            //     console.log('socket is linked')
            // })

        },
        mounted(){

        },
        computed:{
            ...mapGetters([
                'getSocket',
                'getUser'
            ])
        }

    }
</script>

<style>
    /* Login Page */

    .login.page {
        height: 100%;
        background-color: #000;
    }

    .login.page .form {
        height: 100px;
        margin-top: -100px;
        position: absolute;

        text-align: center;
        top: 50%;
        width: 100%;
    }

    .login.page .form .usernameInput {
        background-color: transparent;
        border: none;
        border-bottom: 2px solid #fff;
        outline: none;
        padding-top: 15px;
        text-align: center;
    }

    .login.page .title {
        font-size: 200%;
    }

    .login.page .usernameInput {
        font-size: 200%;
        letter-spacing: 3px;
    }

    .login.page .title, .login.page .usernameInput {
        color: #fff;
        font-weight: 100;
    }
</style>
