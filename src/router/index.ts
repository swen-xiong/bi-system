import Vue from 'vue'
import Router from 'vue-router'
import Test from '../views/Test.vue'
import store from '../store'
import { UserModule } from '@/store/modules/user'

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
        requireAuth: true
      }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   console.log(UserModule)
//   if (to.path === '/login') {
//     // TODO 若已登录，清除登录信息
//     UserModule.REMOVE_TOKEN()
//     next()
//   } else if (to.matched.some((route) => route.meta.requireAuth)) {
//     if (UserModule.token) {
//       if (Object.keys(from.query).length === 0) {
//         next()
//       } else {
//         // 如果来源路由有query
//         const redirect: any = from.query.redirect;
//         // 解决next无限循环的问题
//         if (to.path === redirect) {
//           next()
//         } else {
//           next({path: redirect})
//         }
//       }
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     }
//   }
// })

export default router
