export default defineNuxtPlugin(async (nuxtApp) => {
  await useCartStore().fetchAndSetCart();
});
