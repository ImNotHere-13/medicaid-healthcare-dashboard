<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-950 dark:to-blue-950 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8 animate-fade-up">
        <div class="text-6xl mb-4">🏥</div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">MEDICAID</h1>
        <p class="text-gray-600 dark:text-gray-400">Healthcare Management System v3.3</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 animate-fade-up" style="animation-delay: 100ms">
        <!-- Error Alert -->
        <div v-if="error" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p class="text-red-700 dark:text-red-300 text-sm font-medium">{{ error }}</p>
        </div>

        <!-- Tab Navigation -->
        <div class="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            @click="isLogin = true"
            :class="isLogin ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' : 'text-gray-600 dark:text-gray-400'"
            class="pb-3 font-medium transition-colors flex-1"
          >
            Login
          </button>
          <button
            @click="isLogin = false"
            :class="!isLogin ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' : 'text-gray-600 dark:text-gray-400'"
            class="pb-3 font-medium transition-colors flex-1"
          >
            Register
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Login Form -->
          <template v-if="isLogin">
            <!-- Email -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                v-model="loginForm.email"
                type="email"
                placeholder="john@example.com"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                aria-label="Email address"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div class="relative">
                <input
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  aria-label="Password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
            </div>

            <!-- Demo Credentials -->
            <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p class="text-xs text-blue-700 dark:text-blue-300 font-medium mb-2">Demo Credentials:</p>
              <div class="space-y-1 text-xs text-blue-600 dark:text-blue-400">
                <p>👤 Patient: john@example.com</p>
                <p>🏥 Doctor: sarah@hospital.com</p>
                <p>💊 Pharmacy: emily@pharmacy.com</p>
                <p>🔑 Password: demo123</p>
              </div>
            </div>
          </template>

          <!-- Register Form -->
          <template v-else>
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                v-model="registerForm.fullName"
                type="text"
                placeholder="John Doe"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                aria-label="Full name"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                v-model="registerForm.email"
                type="email"
                placeholder="john@example.com"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                aria-label="Email address"
              />
            </div>

            <!-- Role Selection -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                I am a...
              </label>
              <select
                v-model="registerForm.role"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                aria-label="Select role"
              >
                <option value="patient">👤 Patient</option>
                <option value="doctor">🏥 Doctor</option>
                <option value="pharma">💊 Pharmacist</option>
              </select>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div class="relative">
                <input
                  v-model="registerForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  aria-label="Password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div class="relative">
                <input
                  v-model="registerForm.confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  aria-label="Confirm password"
                />
              </div>
            </div>
          </template>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95"
            :aria-busy="loading"
          >
            {{ loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Create Account') }}
          </button>
        </form>

        <!-- Footer -->
        <p class="text-center text-xs text-gray-600 dark:text-gray-400 mt-6">
          {{ isLogin ? 'Don\'t have an account?' : 'Already have an account?' }}
          <button
            @click="isLogin = !isLogin"
            class="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            {{ isLogin ? 'Register here' : 'Login here' }}
          </button>
        </p>
      </div>

      <!-- Security Notice -->
      <div class="mt-8 text-center text-xs text-gray-600 dark:text-gray-400 animate-fade-up" style="animation-delay: 200ms">
        <p>🔒 Secure login with JWT authentication and password hashing</p>
        <p class="mt-1">All data is encrypted and stored securely</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isLogin = ref(true)
const showPassword = ref(false)
const loading = ref(false)
const error = ref(null)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'patient'
})

const handleSubmit = async () => {
  error.value = null
  loading.value = true

  try {
    let result

    if (isLogin.value) {
      result = await authStore.login(loginForm.value.email, loginForm.value.password)
    } else {
      result = await authStore.register(
        registerForm.value.fullName,
        registerForm.value.email,
        registerForm.value.password,
        registerForm.value.confirmPassword,
        registerForm.value.role
      )
    }

    if (result.success) {
      // Redirect to appropriate dashboard
      const dashboards = {
        patient: '/patient/dashboard',
        doctor: '/doctor/patients',
        pharma: '/pharmacy/inventory'
      }
      const redirectUrl = route.query.redirect || dashboards[result.user.role]
      router.push(redirectUrl)
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = 'An unexpected error occurred'
    console.error('Auth error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.6s ease-out forwards;
  opacity: 0;
}
</style>
