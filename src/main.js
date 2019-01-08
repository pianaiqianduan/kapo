// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios';

//引入插件
import { WechatPlugin } from 'vux'
import { LoadingPlugin } from 'vux'
import { AlertPlugin } from 'vux'
import { ConfirmPlugin } from 'vux'
import { ToastPlugin } from 'vux'

//使用插件
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)

//添加请求拦截器
axios.interceptors.request.use((config) => { 
    Vue.$vux.loading.show({ //显示加载动画
        text: 'Loading'
    })
    return config;
}, (err) => {
    return Promise.reject(err)
})

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    Vue.$vux.loading.hide() //隐藏加载动画
    return response;
}, function(error) {
    return Promise.reject(error);
});

Vue.config.productionTip = false

//解决ios手机点击延迟问题
const FastClick = require('fastclick')
FastClick.attach(document.body)

//增加原型链,实例也能调用
Vue.prototype.$axios = axios
    // Vue.prototype.url = '/api'
Vue.prototype.url = 'http://222.88.22.69:8080/synear/' //46测试服务器
    // Vue.prototype.url = 'http://192.168.16.147:8080 /synear/' //张闯本地测试服务器
    // Vue.prototype.url = '/'
Vue.prototype.bus = new Vue();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})