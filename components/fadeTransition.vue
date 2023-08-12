<script setup lang="ts"></script>

<template>
  <transition
    enter-active-class="transition ease-out duration-500"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-500"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <slot />
  </transition>
</template>
