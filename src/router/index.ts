import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/Auth'
import { watch } from 'vue'
import MainLayout from '@/layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainlayout',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/library',
          name: 'library',
          component: () => import('../views/LibraryView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signUp',
      component: () => import('../views/SignUpView.vue'),
    },
  ],
})

// Handle 404 redirect from GitHub Pages
router.isReady().then(() => {
  const redirect = sessionStorage.getItem('redirect')
  if (redirect) {
    sessionStorage.removeItem('redirect')
    router.replace(redirect)
  }
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.loading) {
    await new Promise((resolve) => {
      const unwatch = watch(
        () => authStore.loading,
        (isLoading) => {
          if (!isLoading) {
            unwatch()
            resolve(true)
          }
        },
      )
    })
  }

  const isAuthenticated = !!authStore.user
  const authRequired = to.name !== 'login' && to.name !== 'signUp'

  if (authRequired && !isAuthenticated) {
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'signUp') && isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})
export default router
