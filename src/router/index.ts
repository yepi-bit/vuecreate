
// import VueRouter from 'vue-router' //此处描述does not provide an export named 'default'说明vue-router没有导出default
import * as VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue'

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
]

const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
})

export default router
