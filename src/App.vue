<template>
  <div :class="{ dark: isDarkMode }" class="min-h-screen bg-zinc-100 dark:bg-zinc-950">
    <div class="flex h-screen overflow-hidden">
      <!-- Sidebar -->
      <Sidebar 
        :user="currentUser" 
        :isDarkMode="isDarkMode"
        @toggle-theme="isDarkMode = !isDarkMode"
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
              {{ currentUser.initials }}
            </div>
          </div>
        </header>
        
        <!-- Page Content -->
        <main class="flex-1 overflow-auto p-8">
          <router-view :key="$route.fullPath" />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import { useStore } from './store'

const route = useRoute()
const store = useStore()
const isDarkMode = ref(false)

const currentUser = computed(() => store.state.auth.currentUser)

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
</script>

<style>
@import './styles/main.css';
</style>
