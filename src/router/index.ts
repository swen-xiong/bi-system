import Vue from 'vue'
import Router, { Route } from 'vue-router'
import Test from '../views/Test.vue'
import { UserModule } from '@/store/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: true })

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }, {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/view',
      name: 'view',
      component: () => import('../views/DataView.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/main',
      name: 'main',
      component: () => import('../views/Main.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/draggable',
      name: 'draggable',
      component: () => import('../views/Draggable.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        requireAuth: false
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (UserModule.token) {
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done()
    } else if (Object.keys(from.query).length === 0) {
      next()
      NProgress.done()
    } else {
      // 如果来源路由有query
      const redirect: any = from.query.redirect;
      // 解决next无限循环的问题
      if (to.path === redirect) {
        next()
        NProgress.done()
      } else {
        next({path: redirect})
        NProgress.done()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else if (to.matched.some((route) => !route.meta.requireAuth)) {
      next()
      NProgress.done()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // Finish progress bar
  // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
  NProgress.done()
})

export default router
