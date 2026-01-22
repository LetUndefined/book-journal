import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAuthStore = defineStore('authenticator', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)


  // Check if someone is logged in
  async function initAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    user.value = session?.user ?? null
    loading.value = false

    // Listen for login/logout changes
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
  }

  // Sign up new user
  async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  }

  // Login
  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  // Logout
  async function signOut() {
    const { error } = await supabase.auth.signOut()
    console.log('User logged out')
    if (error) throw error
  }

  return {
    user,
    loading,
    initAuth,
    signUp,
    signIn,
    signOut
  }
})




