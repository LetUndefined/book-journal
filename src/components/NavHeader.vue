<script setup lang="ts">
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useAuthStore } from '@/stores/Auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()
const { signOut } = authStore

async function handleSignOut() {
  await signOut()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__brand">
        <div class="header__icon">
          <font-awesome-icon icon="book-open" />
        </div>
        <h1 class="header__title">Book Journal</h1>
      </div>
      <div class="logout">
        <font-awesome-icon :icon="faArrowRightFromBracket" @click="handleSignOut()" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--color-card-bg);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  padding-top: var(--safe-area-top);
}

.header__container {
  padding: 0 1rem;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.header__icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.header__icon svg {
  width: 20px;
  height: 20px;
}

.header__icon .fa-icon {
  font-size: 20px;
}

.header__title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  letter-spacing: -0.02em;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header__btn {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.header__btn:active {
  transform: scale(0.95);
  background: rgba(45, 74, 62, 0.05);
}

.header__btn svg {
  width: 22px;
  height: 22px;
}

.header__btn--primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(45, 74, 62, 0.25);
}

.header__btn--primary:active {
  transform: scale(0.95);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
}
</style>
