import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: "/",
            name: "add",
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/add/add'], resolve); //卖场下单页面
            }
        },
        {
            path: "/search",
            name: "search",
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/search/search'], resolve); //订单查询页面
            }
        },
        {
            path: "/list", //订单提交页面
            name: "list",
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/add/children/list'], resolve)
            }
        },
        {
            path: "/detail", //订单提交页面
            name: "detail",
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/search/children/detail'], resolve)
            }
        },
        {
            path: "/login", //登录页面
            name: "login",
            component: (resolve) => {
                require(['@/pages/login/login.vue'], resolve)
            }
        },
    ],
})

router.beforeEach((to, from, next) => {
    // if (to.matched.some(record => record.meta.login_require)) {
    //     if (!sessionStorage.kaObj && to.path != '/login') {
    //         next('/login')
    //     } else {
    //         next()
    //     }
    // } else {

    //     next()
    // }
    if (to.path == '/') {
        store.commit('changeHeaderLeft', false)
        next()
    } else if (to.path == '/list') {
        store.commit('changeHeaderLeft', true)
        next()
    } else if (to.path == '/search') {
        store.commit('changeHeaderLeft', false)
        next()
    } else if (to.path == '/detail') {
        store.commit('changeHeaderLeft', true)
        next()
    }
})


export default router