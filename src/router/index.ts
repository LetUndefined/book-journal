import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/Auth'
import { watch } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
}, {
    path: '/signup',
    name: 'signUp',
    component: () => import('../views/SignUpView.vue')
}
  ],
})
router.beforeEach(async(to, from, next) => {
  const authStore = useAuthStore()

  if(authStore.loading) {
    await new Promise(resolve => {
      const unwatch = watch(() => authStore.loading, (isLoading) => {
        if(!isLoading) {
          unwatch()
          resolve(true)
        }
      })
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
