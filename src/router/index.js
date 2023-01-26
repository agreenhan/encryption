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
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Symmetric',
    meta: { title: '对称算法加密', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'aes',
        name: 'AES',
        component: () => import('@/views/table/index'),
        meta: { title: 'AES' },
        children: [
          {
            path: 'menu1-2-1',
            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
            name: 'Menu1-2-1',
            meta: { title: '加密' }
          },
          {
            path: 'menu1-2-2',
            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
            name: 'Menu1-2-2',
            meta: { title: '解密' }
          }
        ]
      },
      {
        path: 'rc4',
        name: 'RC4',
        component: () => import('@/views/tree/index'),
        meta: { title: 'RC4' },
        children: [
          {
            path: 'menu1-2-1',
            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
            name: 'Menu1-2-1',
            meta: { title: '加密' }
          },
          {
            path: 'menu1-2-2',
            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
            name: 'Menu1-2-2',
            meta: { title: '解密' }
          }
        ]
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    redirect: '/example/table',
    name: 'Asymmetric',
    meta: { title: '非对称算法加密', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'rsa',
        name: 'RSA',
        component: () => import('@/views/form/index'),
        meta: { title: 'RSA' },
        children: [
          {
            path: 'menu1-2-1',
            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
            name: 'Menu1-2-1',
            meta: { title: '加密' }
          },
          {
            path: 'menu1-2-2',
            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
            name: 'Menu1-2-2',
            meta: { title: '解密' }
          }
        ]
      },
      {
        path: 'dsa',
        name: 'DSA',
        component: () => import('@/views/tree/index'),
        meta: { title: 'DSA' },
        children: [
          {
            path: 'menu1-2-1',
            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
            name: 'Menu1-2-1',
            meta: { title: '加密' }
          },
          {
            path: 'menu1-2-2',
            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
            name: 'Menu1-2-2',
            meta: { title: '解密' }
          }
        ]
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Digest',
    meta: {
      title: '摘要算法加密',
      icon: 'nested'
    },
    children: [
      {
        path: 'md5',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'MD5',
        meta: { title: 'MD5算法' },
        children: [
          {
            path: 'menu1-2-1',
            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
            name: 'Menu1-2-1',
            meta: { title: '加密' }
          },
          {
            path: 'menu1-2-2',
            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
            name: 'Menu1-2-2',
            meta: { title: '解密' }
          }
        ]
      },
      {
        path: 'SHA-1',
        component: () => import('@/views/nested/menu2/index'),
        name: 'SHA-1',
        meta: { title: 'SHA-1算法' },
        children: [
          {
            path: 'menu1-2-2',
            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
            name: 'Menu1-2-2',
            meta: { title: '加密' }
          },
          {
            path: 'menu1-2-2',
            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
            name: 'Menu1-2-2',
            meta: { title: '解密' }
          }
        ]
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
