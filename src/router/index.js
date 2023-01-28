import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/symmetric',
    component: Layout,
    redirect: '/symmetric/table',
    name: 'Symmetric',
    meta: { title: '对称算法加密', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'aes',
        name: 'AES',
        component: () => import('@/views/symmetric/aes'),
        meta: { title: 'AES' }
      }
    ]
  },

  {
    path: '/asymmetric',
    component: Layout,
    redirect: '/example/table',
    name: 'Asymmetric',
    meta: { title: '非对称算法加密', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'rsa',
        name: 'RSA',
        component: () => import('@/views/asymmetric/rsa'),
        meta: { title: 'RSA' }
      }
    ]
  },

  {
    path: '/digest',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Digest',
    meta: {
      title: '摘要算法加密',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'md5',
        component: () => import('@/views/digest/md5'),
        name: 'MD5',
        meta: { title: 'MD5算法' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
