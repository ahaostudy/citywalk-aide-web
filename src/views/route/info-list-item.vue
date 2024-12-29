<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>()
</script>

<template>
  <div class="flex gap-2 items-center">
    <div class="w-24 flex">
      <div class="bg-blue-600 text-white px-2 py-1 text-sm">{{ label }}</div>
    </div>
    <div>{{ value }}</div>
  </div>
</template>

<style scoped>

</style>