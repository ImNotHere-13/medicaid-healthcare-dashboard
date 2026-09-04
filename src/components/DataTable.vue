<template>
  <div class="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
    <table class="w-full text-sm">
      <thead class="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <tr>
          <th v-for="col in columns" :key="col" class="px-6 py-3 text-left font-semibold">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-zinc-200 dark:divide-zinc-700">
        <tr v-for="(row, idx) in rows" :key="idx" class="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
          <td v-for="col in columns" :key="col" class="px-6 py-3">
            <slot :name="col.toLowerCase()" :row="row">
              {{ row[col.toLowerCase()] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: Array,
  rows: Array
})
</script>
