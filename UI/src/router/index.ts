import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/pages/login/Login.vue'),
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: 'home'*/ '@/pages/Home.vue'),
  },
  {
    path: '/article/:contentId/:type',
    name: 'Article',
    component: () =>
      import(/* webpackChunkName: 'article' */ '@/pages/content/Article.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
//路由前置守卫
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem('isLogin')
  if (!isLogin) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
