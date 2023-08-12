<script setup lang="ts">
defineProps<{
  products: {
    id: number;
    name: string;
    image: string;
    slug: string;
    price: number;
  }[];
  icon: string;
  title: string;
}>();
</script>

<template>
  <section class="max-w-7xl mx-auto py-4 px-2 sm:py-24 sm:px-6 lg:px-8 w-full">
    <h1 class="flex items-center gap-2 text-orange-600 text-xl font-bold">
      <icon :name="icon" class="w-6 h-6 text-orange-600" />
      <p>{{ title }}</p>
    </h1>
    <div
      class="mt-8 grid grid-cols-2 gap-x-2 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      <div v-for="product in products" :key="product.id">
        <NuxtLink :to="`/product/${product.slug}`">
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <NuxtImg
              :src="`/images/products/${product.image}`"
              :alt="product.name"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
              width="200"
              height="200"
              format="webp"
            />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
          <p class="mt-1 text-md font-medium text-gray-900">
            <AtomsCurrency>
              {{ product.price }}
            </AtomsCurrency>
          </p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
