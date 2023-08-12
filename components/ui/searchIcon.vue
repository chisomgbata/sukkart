<script setup lang="ts">
const open = useSearch().open;
</script>

<template>
  <button class="bg-orange-50 rounded-lg p-2" @click="open = true">
    <span class="sr-only">Search For Products</span>
    <Icon name="heroicons:magnifying-glass" class="h-6 w-6 text-orange-400" />
  </button>
</template>
