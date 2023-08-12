<script setup lang="ts"></script>

<template>
  <div class="bg-orange-50">
    <div
      class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between"
    >
      <h2
        class="text-2xl font-extrabold tracking-tight text-gray-900 md:text-2xl"
      >
        <span class="block">Don't know what to shop for?</span>
        <span class="block text-orange-600">Browse a random category.</span>
      </h2>
      <div class="mt-4 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md">
          <NuxtLink
            to="/random"
            class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-tr-md text-white bg-orange-600 hover:bg-orange-700 rounded-bl-md"
          >
            Browse
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
