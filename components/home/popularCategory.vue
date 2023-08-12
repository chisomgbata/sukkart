<script setup lang="ts">
import { Category } from "@prisma/client";

const props = defineProps<{
  categories: Category[];
}>();
</script>

<template>
  <div class="max-w-7xl mx-auto py-4 px-2 sm:pt-24 sm:px-6 lg:px-8 w-full">
    <div class="flex gap-4 flex-col md:flex-row w-full">
      <div
        class="flex relative overflow-clip rounded-lg shadow-lg shadow-orange-200 w-full"
        v-for="category in categories"
      >
        <NuxtImg
          :src="`/images/categories/${category.image}`"
          height="120"
          width="400"
          class="w-full h-full"
          format="webp"
        />
        <NuxtLink
          :to="`/category/${category.slug}`"
          class="absolute inset-0 w-full h-full bg-gradient-to-b from-orange-600/10 to-orange-600/70 flex flex-col justify-end px-6"
        >
          <div class="text-white text-2xl font-semibold mb-2">
            {{ category.name }}
          </div>
          <!-- <div class="text-orange-200 mt-1">Shop now</div> -->
        </NuxtLink>
      </div>
    </div>

    <!-- Link to all category -->
    <div class="mt-4 w-full flex justify-end">
      <NuxtLink
        to="/categories"
        class="block text-sm sm:text-md md:text-lg font-semibold text-orange-600 hover:text-orange-500"
        >Browse all categories<span aria-hidden="true"> &rarr;</span></NuxtLink
      >
    </div>
  </div>
</template>
