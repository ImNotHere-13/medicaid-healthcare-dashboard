<template>
  <NotificationContainer>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center gap-4">
        <h2 class="text-3xl font-semibold">Drug Inventory</h2>
        <SearchBar 
          placeholder="Search medications..."
          @update="searchQuery = $event"
        />
      </div>

      <!-- Filter by Status -->
      <FilterTags 
        :tags="['All', 'Adequate', 'Low Stock', 'Critical']"
        :multiple="false"
        @update="selectedStatus = $event"
      />

      <!-- Inventory Stats -->
      <StatsGrid :stats="inventoryStats" />

      <!-- Inventory Table -->
      <div class="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
            <tr>
              <th class="px-6 py-3 text-left font-semibold">Medication</th>
              <th class="px-6 py-3 text-left font-semibold">Category</th>
              <th class="px-6 py-3 text-left font-semibold">Strength</th>
              <th class="px-6 py-3 text-left font-semibold">Current Stock</th>
              <th class="px-6 py-3 text-left font-semibold">Min Stock</th>
              <th class="px-6 py-3 text-left font-semibold">Status</th>
              <th class="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200 dark:divide-zinc-700">
            <tr 
              v-for="med in filteredInventory" 
              :key="med.id"
              class="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              <td class="px-6 py-4 font-semibold">{{ med.name }}</td>
              <td class="px-6 py-4 text-zinc-600 dark:text-zinc-400">{{ med.category }}</td>
              <td class="px-6 py-4">{{ med.strength }}</td>
              <td class="px-6 py-4">
                <div class="font-bold" :class="med.stock < med.minStock ? 'text-red-600' : 'text-emerald-600'">
                  {{ med.stock }} {{ med.unit }}
                </div>
              </td>
              <td class="px-6 py-4 text-zinc-600 dark:text-zinc-400">{{ med.minStock }}</td>
              <td class="px-6 py-4">
                <span 
                  :class="{
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300': med.stock >= med.minStock * 1.5,
                    'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300': med.stock >= med.minStock && med.stock < med.minStock * 1.5,
                    'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300': med.stock < med.minStock
                  }"
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :aria-label="`Stock status: ${med.stock < med.minStock ? 'Critical' : med.stock >= med.minStock * 1.5 ? 'Adequate' : 'Low'}`"
                >
                  {{ med.stock < med.minStock ? 'Critical' : med.stock >= med.minStock * 1.5 ? 'Adequate' : 'Low' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button 
                    @click="reorderMedication(med.id)"
                    class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    :aria-label="`Reorder ${med.name}`"
                  >
                    📦 Reorder
                  </button>
                  <button 
                    @click="updateStock(med.id)"
                    class="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    :aria-label="`Update stock for ${med.name}`"
                  >
                    ➕ Update
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredInventory.length === 0" class="text-center py-12">
        <p class="text-zinc-600 dark:text-zinc-400">No medications found</p>
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
import StatsGrid from '../../components/StatsGrid.vue'

const store = useStore()
const searchQuery = ref('')
const selectedStatus = ref(['All'])

const inventory = computed(() => store.state.pharmacy.inventory)

const inventoryStats = computed(() => [
  {
    label: 'Total Medications',
    value: inventory.value.length,
    color: 'text-blue-600'
  },
  {
    label: 'Low Stock',
    value: inventory.value.filter(m => m.stock < m.minStock * 1.5).length,
    color: 'text-amber-600',
    change: 'Need attention',
    changeType: 'up'
  },
  {
    label: 'Critical',
    value: inventory.value.filter(m => m.stock < m.minStock).length,
    color: 'text-red-600'
  },
  {
    label: 'Total Cost',
    value: '$' + (inventory.value.reduce((sum, m) => sum + (m.stock * m.cost), 0) / 1000).toFixed(1) + 'k',
    color: 'text-emerald-600'
  }
])

const filteredInventory = computed(() => {
  let result = inventory.value
  
  if (searchQuery.value) {
    result = result.filter(med => 
      med.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (selectedStatus.value.length > 0 && !selectedStatus.value.includes('All')) {
    const statusMap = {
      'Adequate': m => m.stock >= m.minStock * 1.5,
      'Low Stock': m => m.stock >= m.minStock && m.stock < m.minStock * 1.5,
      'Critical': m => m.stock < m.minStock
    }
    result = result.filter(statusMap[selectedStatus.value[0]])
  }
  
  return result
})

const reorderMedication = (medId) => {
  store.addNotification('Reorder request sent to supplier', 'success')
}

const updateStock = (medId) => {
  store.addNotification('Opening stock update form...', 'info')
}
</script>
