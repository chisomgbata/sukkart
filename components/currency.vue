<script setup lang="ts">
const formatMoney = (amount: number) => {
  const format = new Intl.NumberFormat("en", {});
  return format.format(amount);
};
defineProps<{
  value: number;
  strike?: boolean;
}>();
</script>

<template>
  <div class="relative">
    <span class="text-sm text-gray-500"> &#8358;</span>
    <span class="text-xl font-medium ml-1">{{ formatMoney(value) }}</span>

    <div
      v-if="strike"
      class="text-sm bg-orange-500 absolute top-1/2 left-0 h-1 w-full rotate-12 rounded-full "
    />
  </div>
</template>
