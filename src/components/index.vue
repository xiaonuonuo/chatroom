<template lang="html">
    <div class="chat">
        <div class="chat-header">

        </div>
        <div class="chat-container">
            <div class="chat-main">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'index',
        data(){
            return {
                userInfo:{},
                userNameList: ['加菲猫 ', '流氓兔', '蜡笔小新', '樱木花道', '机器猫', '皮卡丘', '史努比', '蓝精灵', '紫龙', '芭比'],
            }
        },
        methods:{
            getUserId () {
                return (new Date().getTime() + '' + Math.floor(Math.random() * 100000 + 100)) - 0;
            },
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
            textarea {
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
