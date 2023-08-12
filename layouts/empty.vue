<script setup lang="ts"></script>

<template>
  <div class="container mx-auto px-5 py-10">
    <NuxtLink to="/">
      <UiLogo class="md:text-8xl text-5xl" />
    </NuxtLink>
    <slot />
    <footer class="text-orange-600 px-4 py-6">
      <nav class="mt-4 md:mt-10">
        <ul class="flex justify-center gap-4">
          <li>
            <NuxtLink to="/about">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/privacy">Privacy</NuxtLink>
          </li>
        </ul>
      </nav>
      <Toaster :duration="3000" richColors />
    </footer>
  </div>
</template>
