// import VueRouter from 'vue-router' //此处描述does not provide an export named 'default'说明vue-router没有导出default
import * as VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue'
import {ElMessage} from "element-plus";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: "/login",
        // redirect:'/login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/rank/:id',
        name: 'rank',
        props: true,
        component: () => import('../views/RankPage.vue')
    },
    {
        path: "/result",
        name: 'result',
        props: true,
        component: () => import('../views/ResultPage.vue')
    },
    {
        path: "/terminal",
        name: 'terminal',
        props: true,
        component: () => import('../views/Terminal.vue')
    },
    {
        path: "/canvas",
        name: 'canvas',
        props: true,
        component: () => import('../views/Canvas.vue')
    },
    {
        path: "/tableClick",
        name: 'tableClick',
        props: true,
        component: () => import('../views/TableClick.vue')
    },
    {
        path: "/storeTest",
        name: 'storeTest',
        props: true,
        component: () => import('../views/StoreTest.vue')
    },
    {
        path: "/calendar",
        name: 'calendar',
        props: true,
        component: () => import('../views/Calendar.vue')
    },
    {
        path: "/bgAnima",
        name: 'bgAnima',
        props: true,
        component: () => import('../views/BgAnima.vue')
    },
    {
        path: "/getImage",
        name: 'getImage',
        props: true,
        component: () => import('../views/GetImage.vue')
    },
    {
        path: "/process",
        name: 'process',
        props: true,
        component: () => import('../views/Process.vue')
    },
    {
        path: "/zan",
        name: 'zan',
        props: true,
        component: () => import('../views/Zan.vue')
    },
    {
        path: "/player",
        name: 'player',
        props: true,
        component: () => import('../views/Player.vue')
    },
    {
        path: "/map",
        name: 'map',
        props: true,
        component: () => import('../views/Map.vue')
    },
    {
        path: "/grade",
        name: 'grade',
        props: true,
        component: () => import('../views/Grade.vue')
    },
    {
        path: "/hoverTable",
        name: 'hoverTable',
        props: true,
        component: () => import('../views/HoverTable.vue')
    },
    {
        path: "/yearMonth",
        name: 'yearMonth',
        props: true,
        component: () => import('../views/yearMonth.vue')
    },
    {
        path: "/disTable",
        name: 'disTable',
        props: true,
        component: () => import('../views/disTable.vue')
    },
]

const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory(),
})

// router.beforeEach((to, from, next) => {
//     const tokenStartTime = localStorage.getItem('tokenStartTime')
//     // 后台给出的token有效时间，一个星期 单位 是秒
//     const timeOver = 6 * 24 * 3600 * 1000
//     // 当前时间
//     let date = new Date().getTime()
//     // 如果大于说明是token过期了
//     let token
//
//     if (date - Number(tokenStartTime) > timeOver) {
//         token = null
//         ElMessage({
//             type: "warning",
//             message: "请填写账号或密码??",
//         });
//     }
//     // 如果token过期了
//     if (!token) {
//         if (to.path == '/login') return next()
//         // 注意要import element的Message组件
//         return next('/login')
//         // 如果token没有过期，又是选择了登录页面就直接重定向到首页，不需要重新输入账户密码
//     } else if (to.path == '/login') {
//         return next('/')
//     }
//     next()
//
// })

export default router
