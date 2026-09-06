<template>
  <aside class="w-72 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-screen">
    <!-- Header -->
    <div class="p-6 border-b border-zinc-200 dark:border-zinc-800">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-4xl">🏥</span>
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

    <!-- User Profile & Logout -->
    <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
          {{ user?.initials }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm truncate">{{ user?.fullName }}</p>
          <p class="text-xs text-zinc-500 truncate">{{ user?.role }}</p>
        </div>
      </div>
      <button 
        @click="handleLogout"
        class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg font-medium transition"
        aria-label="Logout"
      >
        🚪 Logout
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavItem from './NavItem.vue'

const route = useRoute()

const props = defineProps({
  user: Object,
  isDarkMode: Boolean
})

const emit = defineEmits(['toggle-theme', 'logout'])

const userRole = computed(() => props.user?.role || 'patient')

const isActive = (path) => route.path.startsWith(path)

const handleLogout = () => {
  emit('logout')
}
</script>
