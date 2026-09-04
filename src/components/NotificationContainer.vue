<template>
  <div class="space-y-4">
    <!-- Notifications -->
    <div v-if="notifications.length > 0" class="space-y-2">
      <div 
        v-for="notif in notifications"
        :key="notif.id"
        :class="{
          'bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500': notif.type === 'success',
          'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500': notif.type === 'info',
          'bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500': notif.type === 'warning',
          'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500': notif.type === 'error'
        }"
        class="p-4 rounded-lg animate-fade-up"
        role="alert"
      >
        <p class="font-medium text-sm">{{ notif.message }}</p>
      </div>
    </div>

    <!-- Content Slot -->
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '../store'

const store = useStore()
const notifications = computed(() => store.state.notifications)
</script>
