<script setup lang="ts">
const props = defineProps<{
  product: {
    id: number;
    quantity: number;
    name: string;
    price: number;
    image: string;
    slug: string;
  };
}>();
const { removeItem, changeQuantity, productQuantity } = useCartStore();

let quantity = ref(productQuantity(props.product.id));

let timeoutId: ReturnType<typeof setTimeout> | undefined;

const debounceInput = (value: string) => {
  const InputQuantity = Number(value);
  useCartStore().loading = true;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    if (InputQuantity && InputQuantity >= 1) {
      if (InputQuantity == quantity.value) {
        quantity.value = InputQuantity;
        return (useCartStore().loading = false);
      }
      const quantityResponse = await changeQuantity(
        props.product.id,
        Number(value)
      );
      if (!quantityResponse) return;
      quantity.value = quantityResponse;
    } else {
      useCartStore().loading = false;
    }
  }, 700);
};
</script>

<template>
  <div>
    <div class="flex-shrink-0">
      <NuxtImg
        :src="product.image"
        :alt="product.name"
        :weight="300"
        :height="300"
        class="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
      />
    </div>

    <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
      <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
        <div>
          <div class="flex justify-between">
            <h3 class="text-sm">
              <NuxtLink
                :to="`/product/${product.slug}`"
                class="font-medium text-gray-700 hover:text-gray-800"
              >
                {{ product.name }}
              </NuxtLink>
            </h3>
          </div>

          <p class="mt-1 text-sm font-medium text-gray-900">
            {{ product.price }}
          </p>
        </div>

        <div class="mt-4 sm:mt-0 sm:pr-9">
          <label class="sr-only">Quantity, {{ product.quantity }}</label>
          <input
            type="number"
            @input="debounceInput(($event.target as HTMLInputElement).value)"
            :value="quantity"
            min="1"
            class="border-2 border-orange-300 rounded-md py-1 text-sm w-16 text-center"
          />

          <div class="absolute top-0 right-0">
            <button
              @click="removeItem(product.id)"
              type="button"
              class="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Remove</span>
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* hide arrows in number input */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
