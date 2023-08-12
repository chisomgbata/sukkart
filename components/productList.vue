<template>
  <div class="bg-white">
    <div
      class="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8"
      v-if="!pending"
    >
      <div v-if="products">
        <h2 class="sr-only">Products</h2>
        <MoleculesProductGrid :products="products" />
      </div>
    </div>
    <div v-else>
      <UiProductsloading />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  take: number;
  skip: number;
}>();

const { data: products, pending } = useLazyFetch("/api/products", {
  key: `products-${props.take}-${props.skip}`,
});
</script>
