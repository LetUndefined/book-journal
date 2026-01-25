import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/Auth'

import App from './App.vue'
import router from './router'
import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBookOpen, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import StarRating from 'vue-star-rating'

library.add(faBookOpen, faArrowRightFromBracket)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('star-rating', StarRating)
app.use(createPinia())
app.use(router)

const AuthStore = useAuthStore()
const { initAuth } = AuthStore
initAuth()

app.mount('#app')
