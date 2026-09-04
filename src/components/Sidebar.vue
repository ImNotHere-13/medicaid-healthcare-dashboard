<template>
  <aside class="w-72 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-screen">
    <!-- Header -->
    <div class="p-6 border-b border-zinc-200 dark:border-zinc-800">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-4xl">🩺</span>
        <div>
          <h1 class="font-bold text-2xl tracking-tight">MEDICAID</h1>
          <span class="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-2 py-1 rounded-full font-mono">v3.3</span>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      <template v-if="userRole === 'patient'">
        <NavItem 
          to="/patient/dashboard" 
          icon="📊" 
          label="Dashboard"
          :active="isActive('/patient/dashboard')"
        />
        <NavItem 
          to="/patient/appointments" 
          icon="📅" 
          label="Appointments"
          :active="isActive('/patient/appointments')"
        />
        <NavItem 
          to="/patient/surgeries" 
          icon="🏥" 
          label="Surgeries"
          :active="isActive('/patient/surgeries')"
        />
        <NavItem 
          to="/patient/medications" 
          icon="💊" 
          label="Medications"
          :active="isActive('/patient/medications')"
        />
        <NavItem 
          to="/patient/chat" 
          icon="🧠" 
          label="AI Assistant"
          :active="isActive('/patient/chat')"
        />
      </template>

      <template v-if="userRole === 'doctor'">
        <NavItem 
          to="/doctor/patients" 
          icon="👥" 
          label="My Patients"
          :active="isActive('/doctor/patients')"
        />
        <NavItem 
          to="/doctor/schedule" 
          icon="📋" 
          label="Surgery Schedule"
          :active="isActive('/doctor/schedule')"
        />
        <NavItem 
          to="/doctor/prescriptions" 
          icon="📝" 
          label="Prescriptions"
          :active="isActive('/doctor/prescriptions')"
        />
      </template>

      <template v-if="userRole === 'pharma'">
        <NavItem 
          to="/pharmacy/inventory" 
          icon="📦" 
          label="Drug Inventory"
          :active="isActive('/pharmacy/inventory')"
        />
        <NavItem 
          to="/pharmacy/formulary" 
          icon="📚" 
          label="Formulary"
          :active="isActive('/pharmacy/formulary')"
        />
        <NavItem 
          to="/pharmacy/compliance" 
          icon="✅" 
          label="Compliance & Pricing"
          :active="isActive('/pharmacy/compliance')"
        />
      </template>
    </nav>

    <!-- Role Switcher -->
    <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
      <p class="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Switch Role</p>
      <div class="space-y-1">
        <button 
          @click="switchRole('patient')"
          :class="userRole === 'patient' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'"
          class="w-full text-left px-4 py-2 rounded-lg text-sm transition"
          aria-label="Switch to patient role"
        >
          👤 Patient
        </button>
        <button 
          @click="switchRole('doctor')"
          :class="userRole === 'doctor' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'"
          class="w-full text-left px-4 py-2 rounded-lg text-sm transition"
          aria-label="Switch to doctor role"
        >
          👨‍⚕️ Doctor
        </button>
        <button 
          @click="switchRole('pharma')"
          :class="userRole === 'pharma' ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'"
          class="w-full text-left px-4 py-2 rounded-lg text-sm transition"
          aria-label="Switch to pharmacy role"
        >
          💊 Pharmacy
        </button>
      </div>
    </div>

    <!-- User Profile -->
    <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
        {{ user.initials }}
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-sm truncate">{{ user.name }}</p>
        <p class="text-xs text-zinc-500 truncate">{{ user.role }}</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../store'
import NavItem from './NavItem.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

const props = defineProps({
  user: Object,
  isDarkMode: Boolean
})

const emit = defineEmits(['toggle-theme'])

const userRole = computed(() => store.state.auth.userRole)

const isActive = (path) => route.path.startsWith(path)

const switchRole = (role) => {
  store.login(role)
  // Navigate to appropriate dashboard
  const dashboards = {
    patient: '/patient/dashboard',
    doctor: '/doctor/patients',
    pharma: '/pharmacy/inventory'
  }
  router.push(dashboards[role])
}
</script>

<style scoped>
.sidebar-item {
  @apply transition-all duration-200;
}
</style>
