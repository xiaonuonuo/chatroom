<template lang="html">
    <div class="chat">
        <div class="chat-header">
            <i class="return"></i>
            <div class="chat-header-title">
                <h1>Trant Walton</h1>
                <p>Last seen just now</p>
            </div>
            <!-- <div class="face">
                <img src="http://img2.vipbcw.com/582ab2b2137886672" alt="">
            </div> -->
        </div>
        <div class="chat-container">
            <ul class="chat-main">
                <li class="chat-item">
                    <div class="section left-section">
                        <span class="host-img">
                            <img src="http://img2.vipbcw.com/582ab2b2137886672" alt="">
                        </span>
                        <div class="host-in-word">
                            <span>南京市 <i>2016 7.7</i></span>
                            <p>这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话这个是第一句话</p>
                        </div>
                    </div>
                </li>
                <li class="chat-item">
                    <div class="section right-section">
                        <span class="host-img">
                            <img src="http://img2.vipbcw.com/582ab2b2137886672" alt="">
                        </span>
                        <div class="host-in-word">
                            <span>南京市 <i>2016 7.7</i></span>
                            <p>这个是第一句话</p>
                        </div>
                    </div>
                </li>
                <!--<div class="chat-item">-->
                    <!--<div class="section left-section">-->
                        <!--<span class="host-img">-->
                            <!--<img src="http://img2.vipbcw.com/582ab2b2137886672" alt="">-->
                        <!--</span>-->
                        <!--<div class="host-in-word">-->
                            <!--<span>南京市 2016 7.7</span>-->
                            <!--<p>这个是第一句话</p>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            </ul>
        </div>
        <div class="chat-input">
            <input name="a" id="a" v-on:keyup.enter="sendMessage(message)" v-model="message">
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'


export default {
    name:'chat',
    data(){
        return {
            message:'',
            socket:'',
            userName:''
        }
    },
    methods: {
        sendMessage(val){
            // $socket is socket.io-client instance
            this.getSocket.emit('sendGroupMsg', val);
        },

        connectEvent(){
            this.getSocket.on('receiveGroupMsg', function(data) {
                that.showMessage()
            })
        },


        // <li class="chat-item">
        //             <div class="section right-section">
        //                 <span class="host-img">
        //                     <img src="http://img2.vipbcw.com/582ab2b2137886672" alt="">
        //                 </span>
        //                 <div class="host-in-word">
        //                     <span>南京市 <i>2016 7.7</i></span>
        //                     <p>这个是第一句话</p>
        //                 </div>
        //             </div>
        //         </li>
        showMessage(val){
            let li = document.createElement('li')
            let div = document.createElement('div')
            let span = document.createElement('span')
            let divChild = document.createElement('div')
            let img = document.createElement('img')
            let p = document.createElement('p')
            let spanChild = document.createElement('span')
            let i = document.createElement('i')
            li.className = 'chat-item'
            div.className = val?'section left-section':'section right-section'
            span.className = 'host-img'
            divChild.className = 'host-in-word'
            img.src = 'http://img2.vipbcw.com/582ab2b2137886672',
            spanChild.innerHTML = '南京市'
            i.innerHTML = this.getTime()
            p.innerHTML = '这是一句话'
            spanChild.appendChild(i)
            divChild.appendChild(spanChild)
            divChild.appendChild(p)
            span.appendChild(img)
            div.appendChild(span)
            div.appendChild(divChild)
            li.appendChild(div)
            document.querySelector('.chat-main').appendChild(li)
        },



    },
    computed:{
        ...mapGetters([
                'getSocket',
                'getUser'
            ])
    },

    created() {
        //do something after creating vue instance 2.6.9.1826
        var that = this
        console.log(this)
        this.userName = this.$route.query.userName;
        this.$store.commit('setSocket',this.io.connect('http://localhost:1932'))

        this.getSocket.on('connect',function(){
            console.log('socket is linked')
        })
    },
    mounted(){
        this.connectEvent();
    },
    beforeUpdate() {
        //do something after mounting vue instance

    }

}
</script>

<style lang="less">
    .chat {
        display: flex;
        flex-direction: column;
        .chat-header {
            /*width: 1rem;*/
            flex: 0 0 .55rem;
            background: #fff;
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
            box-shadow: 0 0 10px #ccc;
            position: relative;
            order: 0;
            .return {
                flex: 0 0 .3rem;
                order: 0;
                background: url(../assets/img/return.svg) no-repeat center;
                background-size: .3125rem .5rem;
            }
            .chat-header-title {
                flex: 0 0 70%;
                display: flex;
                flex-direction: column;
                padding: 2% 0;
                h1 {
                    flex: 1;
                    font-size: .16rem;
                }
                p {
                    flex: 1;
                }
            }
        }
        .chat-container {
            .chat-main {
                background: #fff;
                flex: 0 0 4.57rem;
                height: 4.57rem;
                overflow-y: auto;
                .chat-item {
                    padding: 5px 0;
                    box-sizing: border-box;
                    overflow: hidden;
                    .section {
                        display: flex;
                        .host-img {
                            width: .45rem;
                            height: .45rem;
                            flex: 0 0 .45rem;
                            border-radius: 100rem;
                            overflow: hidden;
                            margin: .05rem;
                            img {
                                width: 4rem;
                                height: auto;
                            }
                        }
                        .host-in-word {
                            flex: 0 1 auto;
                            max-width: 70%;
                            text-align: left;
                            box-sizing: border-box;
                            span {
                                display: block;
                                padding-left: .03rem;
                                font-size: .12rem;
                                &>i {
                                    font-size:.1rem;
                                }
                            }
                            p {
                                padding: .06rem .1rem;
                                background: #fdf8e5;
                                border-radius: 5px;
                            }
                        }
                    }
                    .left-section {
                        flex-direction: row;
                        .host-img {
                            float: left;
                        }
                    }
                    .right-section {
                        flex-direction: row-reverse;
                    }
                }
            }
        }
        .chat-input {
            display: flex;
            flex: 0 0 .56rem;
            padding: .08rem .1rem;
            input {
                display: flex;
                flex-flow: row wrap;
                align-content: center;
                width: 100%;
                height: .3rem;
                line-height: .3rem;
                padding: .05rem .1rem;
                resize: none;
                background: #e7f7f7;
                border-radius: .05rem;
                font-size: .14rem;
                box-sizing: content-box;
                color: #555555;
            }
        }
    }
</style>
