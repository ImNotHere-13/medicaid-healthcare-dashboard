<template>
  <NotificationContainer>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center gap-4">
        <h2 class="text-3xl font-semibold">Active Prescriptions</h2>
        <SearchBar 
          placeholder="Search patient or medication..."
          @update="searchQuery = $event"
        />
      </div>

      <!-- Filter by Status -->
      <FilterTags 
        :tags="['All', 'Active', 'Pending', 'Archived']"
        :multiple="false"
        @update="selectedStatus = $event"
      />

      <!-- Prescriptions Table -->
      <div class="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
            <tr>
              <th class="px-6 py-3 text-left font-semibold">Patient</th>
              <th class="px-6 py-3 text-left font-semibold">Medication</th>
              <th class="px-6 py-3 text-left font-semibold">Dosage</th>
              <th class="px-6 py-3 text-left font-semibold">Frequency</th>
              <th class="px-6 py-3 text-left font-semibold">Quantity</th>
              <th class="px-6 py-3 text-left font-semibold">Refills</th>
              <th class="px-6 py-3 text-left font-semibold">Status</th>
              <th class="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200 dark:divide-zinc-700">
            <tr 
              v-for="rx in filteredPrescriptions" 
              :key="rx.id"
              class="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              <td class="px-6 py-4 font-semibold">{{ rx.patient }}</td>
              <td class="px-6 py-4">{{ rx.medication }}</td>
              <td class="px-6 py-4">{{ rx.dose }}</td>
              <td class="px-6 py-4">{{ rx.frequency }}</td>
              <td class="px-6 py-4">{{ rx.quantity }}</td>
              <td class="px-6 py-4">{{ rx.refills }}</td>
              <td class="px-6 py-4">
                <span 
                  :class="{
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300': rx.status === 'Active',
                    'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300': rx.status === 'Pending'
                  }"
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :aria-label="`Prescription status: ${rx.status}`"
                >
                  {{ rx.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <button 
                  @click="editPrescription(rx.id)"
                  class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  :aria-label="`Edit prescription for ${rx.medication}`"
                >
                  ✏️ Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredPrescriptions.length === 0" class="text-center py-12">
        <p class="text-zinc-600 dark:text-zinc-400">No prescriptions found</p>
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

const prescriptions = computed(() => store.state.doctor.prescriptions)

const filteredPrescriptions = computed(() => {
  let result = prescriptions.value
  
  if (searchQuery.value) {
    result = result.filter(rx => 
      rx.patient.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      rx.medication.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (selectedStatus.value.length > 0 && !selectedStatus.value.includes('All')) {
    result = result.filter(rx => selectedStatus.value.includes(rx.status))
  }
  
  return result
})

const editPrescription = (id) => {
  store.addNotification('Opening prescription editor...', 'info')
}
</script>
