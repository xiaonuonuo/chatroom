var utils = {

    /**
     * 存储时间戳转成字符串
     */

    DateToString : (date) => {
        return date.getFullYear()
          + "-" + (date.getMonth()>8?(date.getMonth()+1):"0"+(date.getMonth()+1))
          + "-" + (date.getDate()>9?date.getDate():"0"+date.getDate())
          + " " + (date.getHours()>9?date.getHours():"0"+date.getHours())
          + ":" + (date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes())
          + ":" + (date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds());
      },


    /**
     * 存储localStorage
     */
    setStore : (name, content) => {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.localStorage.setItem(name, content);
    },

    /**
     * 获取localStorage
     */
    getStore : name => {
        if (!name) return;
        return window.localStorage.getItem(name);
    },

    /**
     * 删除localStorage
     */
    removeStore : name => {
        if (!name) return;
        window.localStorage.removeItem(name);
    },

    /**
     * 存储sessionStorage
     */
    setSessionStore : (name, content) => {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.sessionStorage.setItem(name, content);
    },
    /**
     * 获取sessionStorage
     */
    getSessionStore : name => {
        if (!name) return;
        return window.sessionStorage.getItem(name);
    },
    /**
     * 删除sessionStorage
     */
    delSessionStore : name => {
        if (!name) return;
        window.sessionStorage.removeItem(name);
    },
    setPageTitle : title => {
        document.title = title
        var mobile = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(mobile)) {
          var iframe = document.createElement('iframe')
          iframe.style.display = 'none'
          // 替换成站标favicon路径或者任意存在的较小的图片即可
          // iframe.setAttribute('src', '/static/logo.png')
          var iframeCallback = function () {
            setTimeout(function () {
              iframe.removeEventListener('load', iframeCallback)
              document.body.removeChild(iframe)
            }, 0)
          }
          iframe.addEventListener('load', iframeCallback)
          document.body.appendChild(iframe)
        }
    },
    trigger : id => {
        //IE
        if(document.all) {
            document.getElementById(id).click();
        }
        // 其它浏览器
        else {
            var e = document.createEvent("MouseEvents");
            e.initEvent("click", true, true);　　　　　　　　　　　　　　//这里的click可以换成你想触发的行为
            document.getElementById(id).dispatchEvent(e);　　　//这里的clickME可以换成你想触发行为的DOM结点
        }
    },
    //    设置cookie
        setCookie : (name,value,expiresHours) => {
            var cookieString=name+"="+escape(value);
            //判断是否设置过期时间
            if(expiresHours>0){
            var date=new Date();
            date.setTime(date.getTime+expiresHours*3600*1000);
            cookieString=cookieString+"; expires="+date.toGMTString()+";path=/";
            }
            document.cookie=cookieString;
        },
        //    读取cookie
        getCookie : name => {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
            }else{
            return null;
            }
        },
        // 删除cookie
        delCookie : name => {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval=getCookie(name);
            if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        },
        //JavascriptBridge
    jsBridge : () => {
        var jsBridgeFun,merchantBridge;
        var _userAgent = navigator.userAgent;
        if (_userAgent.indexOf("bcwmall") > 0) {
        //客户端向web传递参数 name:客户端的方法名；payData:传递的参数
        if (_userAgent.indexOf("iPhone") > 0) {
            jsBridgeFun = function (callback) {
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'bcwbridge://__bridge_loaded__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
            }
        } else if (_userAgent.indexOf("Android") > 0) {
            jsBridgeFun = function (callback) {
            try {
                if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge);
                } else {
                document.addEventListener("WebViewJavascriptBridgeReady", function () {
                    callback(WebViewJavascriptBridge);
                }, false);
                }
            } catch (ex) { }
            };
        }
    
    
        //web向客户端传递参数 name:客户端的方法名；payData:传递的参数
        merchantBridge = {
            initSignNet: function (name,payData) {
            jsBridgeFun(function (bridge) {
                if (typeof bridge === "undefined") {
                return;
                }
                bridge.callHandler(name,payData);
            });
            }
        };
        var obj = {
            'jsBridgeFun':jsBridgeFun,
            'merchantBridge':merchantBridge
        }
        return obj;
        }
    },

    /**
     * 获取style样式
     */
    getStyle : (element, attr, NumberMode = 'int') => {
        let target;
        // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
        if (attr === 'scrollTop') {
            target = element.scrollTop;
        }else if(element.currentStyle){
            target = element.currentStyle[attr];
        }else{
            target = document.defaultView.getComputedStyle(element,null)[attr];
        }
        //在获取 opactiy 时需要获取小数 parseFloat
        return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
    },


    /**
     * 页面到达底部，加载更多
     */
    loadMore : (element, callback) => {
        let windowHeight = window.screen.height;
        let height;
        let setTop;
        let paddingBottom;
        let marginBottom;
        let requestFram;
        let oldScrollTop;
        document.body.addEventListener('scroll',() => {
        loadMore();
        }, false)
        //运动开始时获取元素 高度 和 offseTop, pading, margin
        element.addEventListener('touchstart',() => {
            height = element.offsetHeight;
            setTop = element.offsetTop;
            paddingBottom = getStyle(element,'paddingBottom');
            marginBottom = getStyle(element,'marginBottom');
        },{passive: true})
        //运动过程中保持监听 scrollTop 的值判断是否到达底部
        element.addEventListener('touchmove',() => {
        loadMore();
        },{passive: true})
        //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
        element.addEventListener('touchend',() => {
            oldScrollTop = document.body.scrollTop;
            moveEnd();
        },{passive: true})
        const moveEnd = () => {
            requestFram = requestAnimationFrame(() => {
                if (document.body.scrollTop != oldScrollTop) {
                    oldScrollTop = document.body.scrollTop;
                    loadMore();
                    moveEnd();
                }else{
                    cancelAnimationFrame(requestFram);
                    //为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
                    height = element.offsetHeight;
                    loadMore();
                }
            })
        }
        const loadMore = () => {
            if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
                callback();
            }
        }
    },


    /**
     * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
     */
    showBack : callback => {
        let requestFram;
        let oldScrollTop;
        document.addEventListener('scroll',() => {
        showBackFun();
        }, false)
        document.addEventListener('touchstart',() => {
        showBackFun();
        },{passive: true})
        document.addEventListener('touchmove',() => {
        showBackFun();
        },{passive: true})
        document.addEventListener('touchend',() => {
            oldScrollTop = document.body.scrollTop;
            moveEnd();
        },{passive: true})
        
        const moveEnd = () => {
            requestFram = requestAnimationFrame(() => {
                if (document.body.scrollTop != oldScrollTop) {
                    oldScrollTop = document.body.scrollTop;
                    moveEnd();
                }else{
                    cancelAnimationFrame(requestFram);
                }
                showBackFun();
            })
        }
        //判断是否达到目标点
        const showBackFun = () => {
            if (document.body.scrollTop > 500) {
                callback(true);
            }else{
                callback(false);
            }
        }
    },
    /**
     * 运动效果
     * @param {HTMLElement} element   运动对象，必选
     * @param {JSON}        target    属性：目标值，必选
     * @param {number}      duration  运动时间，可选
     * @param {string}      mode      运动模式，可选
     * @param {function}    callback  可选，回调函数，链式动画
     */
    animate : (element, target, duration = 400, mode = 'ease-out', callback) => {
        clearInterval(element.timer);
        //判断不同参数的情况
        if (duration instanceof Function) {
            callback = duration;
            duration = 400;
        }else if(duration instanceof String){
            mode = duration;
            duration = 400;
        }
        //判断不同参数的情况
        if (mode instanceof Function) {
            callback = mode;
            mode = 'ease-out';
        }
        //获取dom样式
        const attrStyle = attr => {
            if (attr === "opacity") {
                return Math.round(getStyle(element, attr, 'float') * 100);
            } else {
                return getStyle(element, attr);
            }
        }
        //根字体大小，需要从此将 rem 改成 px 进行运算
        const rootSize = parseFloat(document.documentElement.style.fontSize);
        const unit = {};
        const initState = {};
        //获取目标属性单位和初始样式值
        Object.keys(target).forEach(attr => {
            if (/[^\d^\.]+/gi.test(target[attr])) {
                unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
            }else{
                unit[attr] = 'px';
            }
            initState[attr] = attrStyle(attr);
        });
        //去掉传入的后缀单位
        Object.keys(target).forEach(attr => {
            if (unit[attr] == 'rem') {
                target[attr] = Math.ceil(parseInt(target[attr])*rootSize);
            }else{
                target[attr] = parseInt(target[attr]);
            }
        });
        let flag = true; //假设所有运动到达终点
        const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
        element.timer = setInterval(() => {
            Object.keys(target).forEach(attr => {
                let iSpeed = 0;  //步长
                let status = false; //是否仍需运动
                let iCurrent = attrStyle(attr) || 0; //当前元素属性址
                let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
                let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
                switch(mode){
                    case 'ease-out':
                        speedBase = iCurrent;
                        intervalTime = duration*5/400;
                        break;
                    case 'linear':
                        speedBase = initState[attr];
                        intervalTime = duration*20/400;
                        break;
                    case 'ease-in':
                        let oldspeed = remberSpeed[attr] || 0;
                        iSpeed = oldspeed + (target[attr] - initState[attr])/duration;
                        remberSpeed[attr] = iSpeed
                        break;
                    default:
                        speedBase = iCurrent;
                        intervalTime = duration*5/400;
                }
                if (mode !== 'ease-in') {
                    iSpeed = (target[attr] - speedBase) / intervalTime;
                    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                }
                //判断是否达步长之内的误差距离，如果到达说明到达目标点
                switch(mode){
                    case 'ease-out':
                        status = iCurrent != target[attr];
                        break;
                    case 'linear':
                        status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                        break;
                    case 'ease-in':
                        status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                        break;
                    default:
                        status = iCurrent != target[attr];
                }
                if (status) {
                    flag = false;
                    //opacity 和 scrollTop 需要特殊处理
                    if (attr === "opacity") {
                        element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                        element.style.opacity = (iCurrent + iSpeed) / 100;
                    } else if (attr === 'scrollTop') {
                        element.scrollTop = iCurrent + iSpeed;
                    }else{
                        element.style[attr] = iCurrent + iSpeed + 'px';
                    }
                } else {
                    flag = true;
                }
                if (flag) {
                    clearInterval(element.timer);
                    if (callback) {
                        callback();
                    }
                }
            })
        }, 20);
    }

}

export default utils

