import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth.js'
import './styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Verify token on app load
const authStore = useAuthStore()
authStore.verifyToken().then(() => {
  app.mount('#app')
}).catch(() => {
  app.mount('#app')
})
