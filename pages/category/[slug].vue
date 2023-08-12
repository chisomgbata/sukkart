<script lang="ts" setup>
let slug = useRoute().params.slug;
const { data: category, pending } = await useLazyFetch(
  `/api/categories/${slug}`
);
</script>

<template>
  <div class="max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="mx-4" v-if="!pending">
      <div v-if="category">
        <h1 class="mt-7 text-xl font-bold capitalize">
          {{ category.name }}
        </h1>
        <div class="mt-5">
          <h2 class="sr-only">Products</h2>
          <MoleculesProductGrid
            :products="category.products"
            v-if="category.products.length > 0"
          />
          <div v-else>
            <div class="mt-2 text-sm text-gray-600">
              <p>No Product is in this category</p>
            </div>
            <NuxtLink to="/" class="mt-6">
              <UiButton class="bg-orange-600 px-3 py-1">Go Back Home</UiButton>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-else>
        <!-- category not found -->

        <div class="mt-5">
          <div class="flex justify-center">
            <div class="flex flex-col items-center">
              <div class="flex-shrink-0">
                <svg
                  class="h-12 w-12 text-gray-400"
                  x-description="Heroicon name: outline/emoji-sad"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-2-5a2 2 0 114 0 2 2 0 01-4 0zm2-4a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="mt-2 text-sm text-gray-600">
                <p>Category not found</p>
              </div>
              <NuxtLink to="/" class="mt-6">
                <UiButton class="bg-orange-600 px-3 py-1"
                  >Go Back Home</UiButton
                >
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div>
        <div class="flex justify-center">
          <div
            class="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
