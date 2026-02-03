<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { signUp } = authStore
const { name, lastName, email, password } = storeToRefs(authStore)
const router = useRouter()

async function handleSignUp() {
  try {
    await signUp()
    router.push({ name: 'home' })
  } catch (error) {
    alert(error)
  }
}
</script>

<template>
  <div class="signup-container">
    <div class="signup-card">
      <h1>Book Journal</h1>
      <p class="subtitle">Create your account</p>

      <form class="signup-form" @submit.prevent="handleSignUp()">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" placeholder="Name" required v-model="name" />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" placeholder="Last Name" required v-model="lastName" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="your@email.com" required v-model="email" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" placeholder="••••••••" required v-model="password" />
        </div>

        <button type="submit" class="btn-primary">Sign Up</button>
        <button type="submit" class="btn-secondary" @click="router.go(-1)">Go Back</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.signup-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.signup-card {
  background: transparent;
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(45, 74, 62, 0.2);
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.167);
  backdrop-filter: blur(20px);
}

h1 {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 3.5rem;
  font-weight: 100;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--color-primary);
  letter-spacing: 0.15em;
  text-transform: lowercase;
  font-style: italic;
  position: relative;
  padding-bottom: 1rem;
}

h1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
}

.subtitle {
  text-align: center;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
  text-shadow: 0px 1px 5px black;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: var(--color-primary);
  font-size: 0.9rem;
}

input {
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: all 0.3s;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  font-weight: 500;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

input:focus {
  outline: none;
  border-color: #fff;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-primary,
.btn-secondary {
  padding: 0.875rem;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: var(--gradient-bg);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(45, 74, 62, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-secondary:hover {
  background: var(--color-primary);
  color: var(--color-secondary);
}
</style>
