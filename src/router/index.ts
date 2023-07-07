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

      beforeEnter: async () => {
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
      beforeEnter: async () => {
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
      beforeEnter: async () => {
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
      beforeEnter: async () => {
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
      beforeEnter: async () => {
        const authStatus = await checkAuth()

        if (authStatus.data.userId === null && authStatus.data.isAuth === false) {
          return { path: '/login' }
        }
      },
      meta: {
        title: 'Images'
      }
    },
    {
      path: '/images/upload',
      name: 'uploadImage',
      component: () => import('../views/UploadView.vue'),
      beforeEnter: async () => {
        const authStatus = await checkAuth()

        if (authStatus.data.userId === null && authStatus.data.isAuth === false) {
          return { path: '/login' }
        }
      },
      meta: {
        title: 'Upload Image'
      }
    },
    {
      path: '/images/compress',
      name: 'compressImage',
      component: () => import('../views/CompressView.vue'),
      meta: {
        title: 'Compress Image'
      }
    }
  ]
})

router.beforeEach((to) => {
  // document.title = to.meta?.title ?? 'Manage Images'
  const title = to.meta?.title
  document.title = typeof title === 'string' ? title : 'Manage Images'
})

export default router
