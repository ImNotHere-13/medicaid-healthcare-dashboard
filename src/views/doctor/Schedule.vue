<template>
  <NotificationContainer>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-semibold">Surgery Schedule</h2>
        <button 
          @click="showAddSurgery = true"
          class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition"
          aria-label="Add new surgery"
        >
          + Add Surgery
        </button>
      </div>

      <!-- Filter by Status -->
      <FilterTags 
        :tags="['All', 'Confirmed', 'Scheduled', 'Cancelled']"
        :multiple="false"
        @update="selectedStatus = $event"
      />

      <!-- Calendar View Indicator -->
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p class="text-sm">📅 Showing surgeries for the next 90 days</p>
      </div>

      <!-- Surgery Cards -->
      <div class="space-y-4">
        <Card 
          v-for="surgery in filteredSurgeries" 
          :key="surgery.id"
          status="confirmed"
        >
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Surgery Info -->
            <div>
              <p class="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Procedure</p>
              <h3 class="text-lg font-bold mt-1">{{ surgery.procedure }}</h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Patient: {{ surgery.patient }}</p>
            </div>

            <!-- Date & Time -->
            <div>
              <p class="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Date & Time</p>
              <p class="text-lg font-bold mt-1">{{ formatDate(surgery.date) }}</p>
              <p class="text-sm font-semibold text-blue-600 mt-1">{{ surgery.time }}</p>
            </div>

            <!-- Room & Duration -->
            <div>
              <p class="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Operating Room</p>
              <p class="text-lg font-bold mt-1">{{ surgery.room }}</p>
              <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Duration: {{ surgery.duration }}</p>
            </div>

            <!-- Status & Actions -->
            <div class="flex flex-col justify-between">
              <div>
                <span 
                  :class="{
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300': surgery.status === 'Confirmed',
                    'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300': surgery.status === 'Scheduled'
                  }"
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :aria-label="`Surgery status: ${surgery.status}`"
                >
                  {{ surgery.status }}
                </span>
              </div>
              <div class="flex flex-col gap-2 mt-3">
                <button 
                  @click="editSurgery(surgery.id)"
                  class="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  :aria-label="`Edit surgery for ${surgery.patient}`"
                >
                  ✏️ Edit
                </button>
                <button 
                  @click="viewPreOp(surgery.id)"
                  class="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  :aria-label="`View pre-op checklist for ${surgery.patient}`"
                >
                  📋 Pre-Op
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div v-if="filteredSurgeries.length === 0" class="text-center py-12">
        <p class="text-zinc-600 dark:text-zinc-400">No surgeries scheduled</p>
      </div>
    </div>
  </NotificationContainer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import { useStore } from '../../store'
import NotificationContainer from '../../components/NotificationContainer.vue'
import Card from '../../components/Card.vue'
import FilterTags from '../../components/FilterTags.vue'

const store = useStore()
const selectedStatus = ref(['All'])
const showAddSurgery = ref(false)

const surgeries = computed(() => store.state.doctor.surgerySchedule)

const filteredSurgeries = computed(() => {
  let result = surgeries.value
  
  if (selectedStatus.value.length > 0 && !selectedStatus.value.includes('All')) {
    result = result.filter(s => selectedStatus.value.includes(s.status))
  }
  
  return result
})

const formatDate = (dateStr) => format(new Date(dateStr), 'MMM d, yyyy')

const editSurgery = (id) => {
  store.addNotification('Opening surgery editor...', 'info')
}

const viewPreOp = (id) => {
  store.addNotification('Pre-op checklist loaded', 'success')
}
</script>
