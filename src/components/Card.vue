<template>
  <div 
    :class="{
      'bg-white dark:bg-zinc-900 border-l-4': true,
      'border-emerald-500': status === 'confirmed',
      'border-blue-500': status === 'pending',
      'border-amber-500': status === 'warning',
      'border-red-500': status === 'cancelled'
    }"
    class="rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  status: {
    type: String,
    default: 'default',
    validator: val => ['default', 'confirmed', 'pending', 'warning', 'cancelled'].includes(val)
  }
})
</script>
