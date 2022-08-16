
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
]

const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
})

export default router
