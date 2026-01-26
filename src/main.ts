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

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

library.add(faBookOpen, faArrowRightFromBracket)

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('star-rating', StarRating)
app.use(createPinia())
app.use(router)
app.use(vuetify)

const AuthStore = useAuthStore()
const { initAuth } = AuthStore
initAuth()

app.mount('#app')
