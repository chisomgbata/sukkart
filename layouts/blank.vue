<script setup lang="ts"></script>

<template>
  <div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-min px-4"
    >
      <slot />
      <Error />
    </div>
    <footer
      class="fixed bottom-0 text-orange-600 left-1/2 -translate-x-1/2 px-4 py-6"
    >
      <nav>
        <ul class="flex justify-center gap-4">
          <li>
            <NuxtLink to="/about">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/privacy">Privacy</NuxtLink>
          </li>
        </ul>
      </nav>
    </footer>
    <Toaster :duration="3000" richColors />
  </div>
</template>

<style>
body {
  background: #f7fafc;
}
</style>
