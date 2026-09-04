<template>
  <div class="relative">
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      @input="$emit('update', searchQuery)"
      class="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      :aria-label="placeholder"
    />
    <span class="absolute right-3 top-2.5 text-zinc-400">🔍</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  placeholder: {
    type: String,
    default: 'Search...'
  }
})

defineEmits(['update'])

const searchQuery = ref('')
</script>
