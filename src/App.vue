<template>
  <div :class="{ dark: isDarkMode }" class="min-h-screen bg-zinc-100 dark:bg-zinc-950">
    <!-- Loading State -->
    <div v-if="authStore.loading && !authStore.isAuthenticated" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="text-6xl mb-4">🏥</div>
        <p class="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>

    <!-- Not Authenticated - Show Login/Register -->
    <template v-else-if="!authStore.isAuthenticated">
      <router-view />
    </template>

    <!-- Authenticated - Show Dashboard -->
    <template v-else>
      <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <Sidebar 
          :user="authStore.user" 
          :isDarkMode="isDarkMode"
          @toggle-theme="isDarkMode = !isDarkMode"
          @logout="handleLogout"
        />
        
        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
          <!-- Header -->
          <header class="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-8 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-semibold">{{ pageTitle }}</h1>
            <div class="flex items-center gap-4">
              <button 
                @click="isDarkMode = !isDarkMode"
                class="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
                :aria-label="isDarkMode ? 'Light mode' : 'Dark mode'"
              >
                {{ isDarkMode ? '☀️' : '🌙' }}
              </button>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                {{ authStore.user?.initials }}
              </div>
            </div>
          </header>
          
          <!-- Page Content -->
          <main class="flex-1 overflow-auto p-8">
            <router-view :key="$route.fullPath" />
          </main>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import { useAuthStore } from './stores/auth.js'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')

const pageTitle = computed(() => {
  const titles = {
    'patient-dashboard': 'Dashboard',
    'patient-appointments': 'Appointments',
    'patient-surgeries': 'Surgeries & Procedures',
    'patient-medications': 'Medications',
    'patient-chat': 'MEDI Assistant',
    'doctor-patients': 'My Patients',
    'doctor-schedule': 'Surgery Schedule',
    'doctor-prescriptions': 'Prescriptions',
    'pharma-inventory': 'Drug Inventory',
    'pharma-formulary': 'Hospital Formulary',
    'pharma-compliance': 'Compliance & Pricing',
  }
  return titles[route.name] || 'MEDICAID'
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

onMounted(() => {
  // Watch for dark mode changes
  watch(isDarkMode, (newVal) => {
    localStorage.setItem('darkMode', newVal)
    if (newVal) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })
})

import { watch } from 'vue'
</script>
