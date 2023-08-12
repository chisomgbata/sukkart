<script setup lang="ts">
const {cart} = storeToRefs(useCartStore());
</script>

<template>
  <section aria-labelledby="cart-heading" class="lg:col-span-7">
    <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

    <ul
      role="list"
      class="border-t border-b border-gray-200 divide-y divide-gray-200"
    >
      <UiCartItem
        v-for="product in cart"
        :key="product.id"
        :product="product"
        class="flex py-6 sm:py-10"
      >
      </UiCartItem>
    </ul>
  </section>
</template>
