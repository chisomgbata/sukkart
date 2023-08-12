<script setup lang="ts"></script>

<template>
  <div>
    <slot />
    <Toaster :duration="3000" richColors />
  </div>
</template>

<style>
body {
  @apply h-full;
}
html {
  @apply h-full bg-gray-50;
}
</style>
