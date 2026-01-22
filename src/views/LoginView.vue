<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/Auth';
import { useRouter } from 'vue-router';


const authStore = useAuthStore()
const {signIn} = authStore
const router = useRouter()

  const email = ref('')
  const password = ref('')

async function handleSignIn(){
  try{
    await signIn(email.value, password.value)
    router.push({name: 'home'})
  } catch(error){
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
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            required
            v-model="email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            v-model="password"
          />
        </div>

        <button type="submit" class="btn-primary" >Sign In</button>
      </form>

      <div class="divider">
        <span>or</span>
      </div>

      <button class="btn-secondary" @click="router.push({name: 'signUp'})">Create Account</button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
}

.login-card {
  background: var(--color-card-bg);
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(45, 74, 62, 0.2);
  width: 100%;
  max-width: 400px;
}

h1 {
  font-family: var(--font-display);
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: var(--color-primary);
}

.subtitle {
  text-align: center;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
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
  color: var(--color-text);
  font-size: 0.9rem;
}

input {
  padding: 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: var(--color-primary);
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
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
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
  background: var(--color-secondary);
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
}
</style>
