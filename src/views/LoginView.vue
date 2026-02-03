<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/Auth'
import { useRouter } from 'vue-router'


const authStore = useAuthStore()
const { signIn } = authStore
const router = useRouter()

const email = ref('')
const password = ref('')

async function handleSignIn() {
  try {
    await signIn(email.value, password.value)
    router.push({ name: 'home' })
  } catch (error) {
    alert(error)
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Book Journal</h1>
      <p class="subtitle">Sign in to your account</p>

      <form class="login-form" @submit.prevent="handleSignIn()">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="your@email.com" required v-model="email" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" placeholder="••••••••" required v-model="password" />
        </div>

        <button type="submit" class="btn-primary">Sign In</button>
      </form>

      <div class="divider">
        <span>or</span>
      </div>

      <button class="btn-secondary" @click="router.push({ name: 'signUp' })">Create Account</button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.login-card {
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

.login-form {
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
  color: var(--color-secondary  );

}

.divider {
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-border);
}

.divider span {
  background: var(--color-card-bg);
  padding: 0 1rem;
  position: relative;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  border-radius: 10px;
}
</style>
