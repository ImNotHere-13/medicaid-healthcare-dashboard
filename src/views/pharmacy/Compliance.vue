<template>
  <NotificationContainer>
    <div class="space-y-8">
      <!-- Compliance Overview -->
      <div>
        <h2 class="text-3xl font-semibold mb-4">Compliance & Compliance Metrics</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Last Audit</p>
            <p class="text-2xl font-bold mt-2">{{ complianceData.lastAudit }}</p>
            <p class="text-xs text-emerald-600 mt-2">✓ Passed</p>
          </Card>
          <Card>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Next Audit</p>
            <p class="text-2xl font-bold mt-2">{{ complianceData.nextAudit }}</p>
            <p class="text-xs text-blue-600 mt-2">📅 Scheduled</p>
          </Card>
          <Card>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">FDA Approval Rate</p>
            <p class="text-2xl font-bold text-emerald-600 mt-2">{{ complianceData.fdaApprovalRate }}%</p>
            <div class="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mt-3">
              <div class="bg-emerald-500 h-2 rounded-full" :style="{ width: complianceData.fdaApprovalRate + '%' }"></div>
            </div>
          </Card>
          <Card>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Storage Compliance</p>
            <p class="text-2xl font-bold text-emerald-600 mt-2">{{ complianceData.storageCompliance }}%</p>
            <div class="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mt-3">
              <div class="bg-emerald-500 h-2 rounded-full" :style="{ width: complianceData.storageCompliance + '%' }"></div>
            </div>
          </Card>
        </div>
      </div>

      <!-- Pricing & Cost Analysis -->
      <div>
        <h2 class="text-3xl font-semibold mb-4">Medication Pricing</h2>
        <div class="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
              <tr>
                <th class="px-6 py-3 text-left font-semibold">Medication</th>
                <th class="px-6 py-3 text-left font-semibold">Insurance Cost</th>
                <th class="px-6 py-3 text-left font-semibold">Patient Copay</th>
                <th class="px-6 py-3 text-left font-semibold">Hospital Cost</th>
                <th class="px-6 py-3 text-left font-semibold">Markup %</th>
                <th class="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr 
                v-for="price in pricing" 
                :key="price.id"
                class="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
              >
                <td class="px-6 py-4 font-semibold">{{ price.medication }}</td>
                <td class="px-6 py-4">${{ price.insuranceCost.toFixed(2) }}</td>
                <td class="px-6 py-4">${{ price.patientCopay.toFixed(2) }}</td>
                <td class="px-6 py-4 text-zinc-600 dark:text-zinc-400">${{ price.hospitalCost.toFixed(2) }}</td>
                <td class="px-6 py-4 font-semibold">{{ price.markup.toFixed(2) }}x</td>
                <td class="px-6 py-4">
                  <button 
                    @click="editPricing(price.id)"
                    class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    :aria-label="`Edit pricing for ${price.medication}`"
                  >
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Temperature & Storage Monitoring -->
      <div>
        <h2 class="text-2xl font-semibold mb-4">Facility Monitoring</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 class="font-semibold mb-4">Temperature Compliance</h3>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Primary Refrigerator</p>
                <div class="flex justify-between items-center mt-2">
                  <span class="font-bold">2-8°C</span>
                  <span class="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-2 py-1 rounded">✓ Normal</span>
                </div>
              </div>
              <div>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Freezer Unit</p>
                <div class="flex justify-between items-center mt-2">
                  <span class="font-bold">-20°C</span>
                  <span class="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-2 py-1 rounded">✓ Normal</span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 class="font-semibold mb-4">Storage Audits</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>Shelving Organization</span>
                <span class="font-bold text-emerald-600">100%</span>
              </div>
              <div class="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                <div class="bg-emerald-500 h-2 rounded-full w-full"></div>
              </div>
              <div class="flex justify-between mt-4">
                <span>Expiration Date Checks</span>
                <span class="font-bold text-emerald-600">100%</span>
              </div>
              <div class="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                <div class="bg-emerald-500 h-2 rounded-full w-full"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </NotificationContainer>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '../../store'
import NotificationContainer from '../../components/NotificationContainer.vue'
import Card from '../../components/Card.vue'

const store = useStore()

const complianceData = computed(() => store.state.pharmacy.compliance)
const pricing = computed(() => store.state.pharmacy.pricing)

const editPricing = (id) => {
  store.addNotification('Opening pricing editor...', 'info')
}
</script>
