<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div 
      v-for="(stat, key) in stats"
      :key="key"
      class="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800"
    >
      <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ stat.label }}</p>
      <p class="text-3xl font-bold mt-2" :class="stat.color">{{ stat.value }}</p>
      <p v-if="stat.change" class="text-xs mt-2" :class="stat.changeType === 'up' ? 'text-emerald-600' : 'text-red-600'">
        {{ stat.changeType === 'up' ? '↑' : '↓' }} {{ stat.change }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: Array
})
</script>
