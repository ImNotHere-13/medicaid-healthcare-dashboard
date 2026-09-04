<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="tag in tags"
      :key="tag"
      @click="handleClick(tag)"
      :class="{
        'bg-blue-500 text-white': selectedTags.includes(tag),
        'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600': !selectedTags.includes(tag)
      }"
      class="px-3 py-1 rounded-full text-sm font-medium transition cursor-pointer"
      :aria-pressed="selectedTags.includes(tag)"
    >
      {{ tag }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  tags: Array,
  multiple: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update'])
const selectedTags = ref([])

const handleClick = (tag) => {
  if (props.multiple) {
    const idx = selectedTags.value.indexOf(tag)
    if (idx > -1) {
      selectedTags.value.splice(idx, 1)
    } else {
      selectedTags.value.push(tag)
    }
  } else {
    selectedTags.value = [tag]
  }
  emit('update', selectedTags.value)
}
</script>
