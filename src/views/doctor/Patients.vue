<template>
  <NotificationContainer>
    <div class="space-y-6">
      <!-- Header with Search -->
      <div class="flex justify-between items-center gap-4">
        <h2 class="text-3xl font-semibold">My Patients</h2>
        <SearchBar 
          placeholder="Search patients by name..."
          @update="searchQuery = $event"
        />
      </div>

      <!-- Filter by Status -->
      <FilterTags 
        :tags="['All', 'Stable', 'Recovering', 'Critical']"
        :multiple="false"
        @update="selectedStatus = $event"
      />

      <!-- Patients Table -->
      <div class="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
            <tr>
              <th class="px-6 py-3 text-left font-semibold">Patient Name</th>
              <th class="px-6 py-3 text-left font-semibold">Age</th>
              <th class="px-6 py-3 text-left font-semibold">Condition</th>
              <th class="px-6 py-3 text-left font-semibold">Status</th>
              <th class="px-6 py-3 text-left font-semibold">Next Visit</th>
              <th class="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200 dark:divide-zinc-700">
            <tr 
              v-for="patient in filteredPatients" 
              :key="patient.id"
              class="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              <td class="px-6 py-4">
                <div class="font-semibold">{{ patient.name }}</div>
                <div class="text-xs text-zinc-600 dark:text-zinc-400">ID: {{ patient.id }}</div>
              </td>
              <td class="px-6 py-4">{{ patient.age }}</td>
              <td class="px-6 py-4">{{ patient.condition }}</td>
              <td class="px-6 py-4">
                <span 
                  :class="{
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300': patient.status === 'Stable',
                    'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300': patient.status === 'Recovering',
                    'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300': patient.status === 'Critical'
                  }"
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :aria-label="`Patient status: ${patient.status}`"
                >
                  {{ patient.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-zinc-600 dark:text-zinc-400">{{ patient.nextAppointment }}</td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button 
                    @click="viewPatientNotes(patient.id)"
                    class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    :aria-label="`View notes for ${patient.name}`"
                  >
                    📋 Notes
                  </button>
                  <button 
                    @click="prescribeMedication(patient.id)"
                    class="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    :aria-label="`Prescribe medication for ${patient.name}`"
                  >
                    💊 Prescribe
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredPatients.length === 0" class="text-center py-12">
        <p class="text-zinc-600 dark:text-zinc-400">No patients found</p>
      </div>
    </div>
  </NotificationContainer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from '../../store'
import NotificationContainer from '../../components/NotificationContainer.vue'
import SearchBar from '../../components/SearchBar.vue'
import FilterTags from '../../components/FilterTags.vue'

const store = useStore()
const searchQuery = ref('')
const selectedStatus = ref(['All'])

const patients = computed(() => store.state.doctor.patients)

const filteredPatients = computed(() => {
  let result = patients.value
  
  if (searchQuery.value) {
    result = result.filter(p => 
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (selectedStatus.value.length > 0 && !selectedStatus.value.includes('All')) {
    result = result.filter(p => selectedStatus.value.includes(p.status))
  }
  
  return result
})

const viewPatientNotes = (patientId) => {
  store.addNotification('Opening patient notes...', 'info')
}

const prescribeMedication = (patientId) => {
  store.addNotification('Opening prescription form...', 'info')
}
</script>
