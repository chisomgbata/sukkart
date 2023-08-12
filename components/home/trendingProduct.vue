<script setup lang="ts">
import type { Product } from "@prisma/client";
</script>

<template>

    <section class="max-w-7xl mx-auto py-4 px-2 sm:py-24 sm:px-6 lg:px-8 w-full">
      <!-- fire icon -->
      <h1 class="flex items-center gap-2 text-orange-600 text-xl font-bold">
        <span>
          <icon
            name="heroicons:arrow-trending-up"
            class="w-6 h-6 text-orange-600"
          />
          <p class="sr-only">Trending products</p>
        </span>
        Trending Products
      </h1>
      <div
        class="mt-8 grid grid-cols-2 gap-x-2 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        <a href="#" class="group">
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
              alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">Earthen Bottle</h3>
          <p class="mt-1 text-md font-medium text-gray-900">
            <AtomsCurrency>500</AtomsCurrency>
          </p>
        </a>
        <a href="#" class="group">
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
              alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">Earthen Bottle</h3>
          <p class="mt-1 text-md font-medium text-gray-900">
            <AtomsCurrency>500</AtomsCurrency>
          </p>
        </a>
        <a href="#" class="group">
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
              alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">Earthen Bottle</h3>
          <p class="mt-1 text-md font-medium text-gray-900">
            <AtomsCurrency>500</AtomsCurrency>
          </p>
        </a>
        <a href="#" class="group">
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
              alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">Earthen Bottle</h3>
          <p class="mt-1 text-md font-medium text-gray-900">
            <AtomsCurrency>500</AtomsCurrency>
          </p>
        </a>
      </div>
    </section>

</template>
