<template lang="html">
    <div class="login page">
        <div class="form">
            <h3 class="title">What's your nickname?</h3>
            <input class="usernameInput" type="text" maxlength="14" v-on:keyup.enter="commitUserName" v-model="UserInfo.userName"/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name:'index',
        data(){
            return {
                userNameList: ['加菲猫 ', '流氓兔', '蜡笔小新', '樱木花道', '机器猫', '皮卡丘', '史努比', '蓝精灵', '紫龙', '芭比'],
            }
        },
        methods:{
            commitUserName() {
                
            },
        },
        created() {
            //do something after creating vue instance
            var that = this
            this.$store.commit('setSocket',this.io.connect('http://localhost:1932'))
            // this.socket = this.io.connect('http://localhost:1932')
            
            // this.socket.on('connect',function(){
            //     console.log('socket is linked')
            // })

        },
        mounted(){
            this.getSocket.on('addUser',function(obj){
                
            })
        },
        computed:{
            ...mapGetters([
                'getSocket'
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
