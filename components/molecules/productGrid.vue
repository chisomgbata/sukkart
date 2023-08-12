<script setup lang="ts">
const props = defineProps<{
  products: {
    id: number;
    name: string;
    image: string;
    slug: string;
    price: number;
  }[];
}>();
</script>

<template>
  <div
    class="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4"
  >
    <MoleculesProductCard v-for="product in products" :product="product" />
  </div>
</template>
