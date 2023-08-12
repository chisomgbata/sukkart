<script setup lang="ts"></script>

<template>
  <div class="bg-orange-50">
    <div
      class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between"
    >
      <h2
        class="text-2xl font-extrabold tracking-tight text-gray-900 md:text-2xl"
      >
        <span class="block">Don't see what you are looking for?</span>
        <span class="block text-orange-600">Create a custom request.</span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md">
          <NuxtLink
            to="/request"
            class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-tr-md text-white bg-orange-600 hover:bg-orange-700 rounded-bl-md"
          >
            Create Request
          </NuxtLink>
          <button
            type="button"
            @click="useSearch().open.value = true"
            class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 ml-2"
          >
            Search
            <span>
              <icon name="heroicons:magnifying-glass" class="w-6 h-6 ml-2" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
