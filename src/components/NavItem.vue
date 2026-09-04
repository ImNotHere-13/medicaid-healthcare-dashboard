<template>
  <router-link
    :to="to"
    :class="{
      'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600': active,
      'hover:bg-zinc-50 dark:hover:bg-zinc-800': !active
    }"
    class="sidebar-item flex items-center gap-3 px-6 py-3 rounded-lg cursor-pointer font-medium text-zinc-700 dark:text-zinc-300 transition-all"
    :aria-current="active ? 'page' : undefined"
    :aria-label="`Navigate to ${label}`"
  >
    <span class="text-xl">{{ icon }}</span>
    <span>{{ label }}</span>
  </router-link>
</template>

<script setup>
defineProps({
  to: String,
  icon: String,
  label: String,
  active: Boolean
})
</script>

<style scoped>
.sidebar-item {
  @apply transition-smooth;
}
</style>
