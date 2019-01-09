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
            path: "/selectStore", //门店选择
            name: "selectStore",
            component: (resolve) => {
                require(['@/pages/selectStore/selectStore.vue'], resolve)
            }
        },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.login_require)) {

        if (!sessionStorage.ischoose && to.path != '/selectStore') {
            next('/selectStore')
        } else {
            next()
        }
    } else {
        next()
    }
    next()

})
router.afterEach(function(to) {
    if (to.path == '/') {
        store.commit('changeHeaderLeft', false)
        store.commit('isHeaderFooterShow', true)
        store.commit('isHeaderCenterShow', true)
        store.commit('changeHeaderRight', '门店选择') //将头部右侧的‘退出登录’改为‘门店选择’

    } else if (to.path == '/list') {
        store.commit('changeHeaderLeft', true)
        store.commit('isHeaderFooterShow', false)
        store.commit('isHeaderCenterShow', true)
        store.commit('changeHeaderRight', '') //将头部右侧的内容置空

    } else if (to.path == '/search') {
        store.commit('changeHeaderLeft', false)
        store.commit('isHeaderFooterShow', true)
        store.commit('isHeaderCenterShow', true)
        store.commit('changeHeaderRight', '门店选择') //将头部右侧的‘退出登录’改为‘门店选择’

    } else if (to.path == '/detail') {
        store.commit('changeHeaderLeft', true)
        store.commit('isHeaderFooterShow', false)
        store.commit('isHeaderCenterShow', true)
        store.commit('changeHeaderRight', '') //将头部右侧的内容置空

    } else if (to.path == '/selectStore') {
        store.commit('changeHeaderLeft', false) //判断头部左侧的返回按钮是否显示
        store.commit('isHeaderFooterShow', false) //头部导航和底部导航是否显示
        store.commit('isHeaderCenterShow', false) //头部导航中间部分是否显示
        store.commit('changeHeaderRight', '退出登录') //将头部右侧的‘门店选择’改为‘退出登录’
    }

})


export default router