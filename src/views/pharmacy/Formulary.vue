<template>
  <NotificationContainer>
    <div class="space-y-6">
      <!-- Header with Search -->
      <div class="flex justify-between items-center gap-4">
        <h2 class="text-3xl font-semibold">Hospital Formulary</h2>
        <SearchBar 
          placeholder="Search medications..."
          @update="searchQuery = $event"
        />
      </div>

      <!-- Filter by Category -->
      <FilterTags 
        :tags="['All', 'Antibiotic', 'Statin', 'NSAID', 'ACE Inhibitor', 'PPI']"
        :multiple="true"
        @update="selectedCategories = $event"
      />

      <!-- Formulary Table -->
      <div class="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
            <tr>
              <th class="px-6 py-3 text-left font-semibold">Medication</th>
              <th class="px-6 py-3 text-left font-semibold">Category</th>
              <th class="px-6 py-3 text-left font-semibold">Description</th>
              <th class="px-6 py-3 text-left font-semibold">Restrictions</th>
              <th class="px-6 py-3 text-left font-semibold">Prior Auth</th>
              <th class="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200 dark:divide-zinc-700">
            <tr 
              v-for="med in filteredFormulary" 
              :key="med.id"
              class="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              <td class="px-6 py-4 font-semibold">{{ med.name }}</td>
              <td class="px-6 py-4">
                <span class="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                  {{ med.category }}
                </span>
              </td>
              <td class="px-6 py-4 text-zinc-600 dark:text-zinc-400 max-w-xs">{{ med.description }}</td>
              <td class="px-6 py-4 text-sm">{{ med.restrictions || 'None' }}</td>
              <td class="px-6 py-4">
                <span 
                  :class="med.priorAuth ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'"
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :aria-label="`Prior authorization: ${med.priorAuth ? 'Required' : 'Not required'}`"
                >
                  {{ med.priorAuth ? '🔒 Required' : '✓ Not needed' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <button 
                  @click="editFormularyEntry(med.id)"
                  class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  :aria-label="`Edit formulary entry for ${med.name}`"
                >
                  ✏️ Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredFormulary.length === 0" class="text-center py-12">
        <p class="text-zinc-600 dark:text-zinc-400">No medications found in formulary</p>
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
const selectedCategories = ref([])

const formulary = computed(() => store.state.pharmacy.formulary)

const filteredFormulary = computed(() => {
  let result = formulary.value
  
  if (searchQuery.value) {
    result = result.filter(med => 
      med.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (selectedCategories.value.length > 0) {
    result = result.filter(med => selectedCategories.value.includes(med.category))
  }
  
  return result
})

const editFormularyEntry = (id) => {
  store.addNotification('Opening formulary editor...', 'info')
}
</script>
