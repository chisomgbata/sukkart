<script setup lang="ts">
const props = defineProps<{
  alt: string;
}>();
</script>

<template>
  <img  :alt="alt" />
</template>
