import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import checkAuth from '../utils/checkAuth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Manage Images'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),

      beforeEnter: async (from, to) => {
        const authStatus = await checkAuth()
        if (authStatus.data.userId !== null && authStatus.data.isAuth !== false) {
          return { name: 'home' }
        }
      },
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
      beforeEnter: async (from, to) => {
        const authStatus = await checkAuth()

        if (authStatus.data.userId !== null && authStatus.data.isAuth !== false) {
          return { path: '/' }
        }
      },
      meta: {
        title: 'Signup'
      }
    },
    {
      path: '/images',
      name: 'images',
      component: () => import('../views/ImageView.vue'),
      beforeEnter: async (from, to) => {
        const authStatus = await checkAuth()

        if (authStatus.data.userId === null && authStatus.data.isAuth === false) {
          return { path: '/login' }
        }
      },
      meta: {
        title: 'Manage Images'
      }
    },
    {
      path: '/images/add-endpoint',
      name: 'imagesAddEndpoint',
      component: () => import('../views/AddEndpoint.vue'),
      beforeEnter: async (from, to) => {
        const authStatus = await checkAuth()

        if (authStatus.data.userId === null && authStatus.data.isAuth === false) {
          return { path: '/login' }
        }
      },
      meta: {
        title: 'Add Endpoint'
      }
    },
    {
      path: '/images/:endpointId/:storageName/:folderName',
      name: 'imagesEndpoint',
      component: () => import('../views/ImageEndpoint.vue'),
      beforeEnter: async (from, to) => {
        const authStatus = await checkAuth()

        if (authStatus.data.userId === null && authStatus.data.isAuth === false) {
          return { path: '/login' }
        }
      },
      meta: {
        title: 'Images'
      }
    }
  ]
})

router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? 'Manage Images'
})

export default router
