<script setup lang="ts">
const props = defineProps<{
  product: {
    id: number;
    name: string;
    image: string;
    slug: string;
    price: number;
  };
}>();
</script>

<template>
  <div class="group relative p-4 border-r border-b border-gray-200 sm:p-6">
    <div
      class="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75"
    >
      <NuxtImg :src="product.image" width="300" height="300" />
    </div>
    <div class="pt-4 pb-4 text-center">
      <h3 class="text-sm font-medium text-gray-900">
        <NuxtLink :to="`/product/${product.slug}`">
          <span aria-hidden="true" class="absolute inset-0" />
          {{ product.name }}
        </NuxtLink>
      </h3>

      <p class="mt-2 text-base font-medium text-gray-900">
        <!-- naira sign -->
        &#8358;
        {{ product.price }}
      </p>
    </div>
  </div>
</template>
