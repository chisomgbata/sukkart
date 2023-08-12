<script setup lang="ts">
import { Category } from "@prisma/client";
const props = defineProps<{
  banner: Category;
}>();
</script>

<template>
  <div class="max-w-7xl mx-auto py-4 px-2 sm:py-24 sm:px-6 lg:px-8 w-full">
    <div
      class="flex relative overflow-clip rounded-lg shadow-lg shadow-orange-200"
    >
      <NuxtImg
        :src="`/images/categories/${banner.image}`"
        height="120"  
        width="400"
        class="w-full h-full"
        format="webp"
      />
      <NuxtLink
        :to="`/category/${banner.slug}`"
        class="absolute inset-0 w-full h-full bg-gradient-to-b from-orange-600/10 to-orange-600/70 flex flex-col justify-end px-6"
      >
        <div class="text-white text-xl font-semibold mb-1">
          {{ banner.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
