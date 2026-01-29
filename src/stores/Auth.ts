import { supabase } from '@/lib/supabase'
import type { Profile } from '@/models/Interface'
import type { User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useAuthStore = defineStore('authenticator', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const email = ref('')
  const password = ref('')
  const name = ref('')
  const lastName = ref('')
  const profileInformation: Ref<Profile | null> = ref(null)
  const readingGoal = ref(0)


  // Check if someone is logged in
  async function initAuth() {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    user.value = session?.user ?? null
    loadProfile()
    loading.value = false // Listen for login/logout changes
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
  }

  // Sign up new user
  async function signUp() {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          display_name: `${lastName.value} ${name.value}`,
        },
      },
    })
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

  async function loadProfile() {
    if (!user.value) return null

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.value?.id)
      .single()

    if (error) throw error

    profileInformation.value = data
    console.log(profileInformation.value)
    return data
  }


  async function saveProfile() {
    const {error} = await supabase
    .from('user_profiles')
    .update({'reading_goal': readingGoal.value})
    .eq('user_id', user.value?.id)

    if(error){
      throw error
    }
  }
  return {
    user,
    loading,
    initAuth,
    signUp,
    signIn,
    signOut,
    name,
    lastName,
    email,
    password,
    profileInformation,
    loadProfile,
    readingGoal,
    saveProfile
  }
})
