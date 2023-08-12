<script setup lang="ts">
const cartStore = useCartStore();
const cart = computed(() => cartStore.cart);
</script>

<template>
  <div>
    <div class="lg:ml-6">
      <NuxtLink
        to="/cart"
        class="group p-2 flex items-center relative bg-orange-50 rounded-lg justify-between"
      >
        <Icon
          class="flex-shrink-0 h-6 w-6 text-orange-400"
          aria-hidden="true"
          name="heroicons:shopping-bag"
        />
        <span
          class="rounded-full bg-orange-200 w-5 h-5 absolute bottom-0 right-0 grid place-items-center text-xs font-medium text-orange-700"
          >{{ cart.length }}</span
        >
        <span class="sr-only">items in cart, view bag</span>
      </NuxtLink>
    </div>
  </div>
</template>
