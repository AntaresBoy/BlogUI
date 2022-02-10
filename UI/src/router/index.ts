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
    path: '/article/:contentId',
    name: 'Article',
    component: () =>
      import(/* webpackChunkName: 'article' */ '@/pages/content/Article.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem('isLogin')
  console.log('beforeEach', to, isLogin)
  console.log(from)
  if (!isLogin) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    console.log('ssss')
    next()
  }
})

export default router
