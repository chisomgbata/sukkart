<script setup lang="ts">
let slug = useRoute().params.slug.toString();

const { data: product, pending } = useLazyFetch(`/api/products/${slug}`, {
  key: `product-${slug}`,
});

const policies = [
  {
    name: "Quick delivery",
    icon: "heroicons:bolt",
    description: "Get your order in less than 2 hours",
  },

  {
    name: "Secure payments",
    icon: "heroicons:credit-card",
    description: "We accept all major credit cards",
  },
];

useHead({
  title: () => `Sukkart - ${product.value?.name}`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: () => product.value?.description,
    },
  ],
});
</script>

<template>
  <div class="bg-white">
    <div v-if="!pending">
      <div class="pt-6 pb-16 sm:pb-24" v-if="product">
        <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div class="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div class="lg:col-start-8 lg:col-span-5">
              <div class="flex justify-between gap-3 items-center">
                <h1 class="text-xl font-medium text-gray-900">
                  {{ product.name }}
                </h1>
                <p class="text-xl font-medium text-gray-900 min-w-fit">
                  <Currency :value="product.price" />
                </p>
              </div>
            </div>
            <!-- Image gallery -->
            <div
              class="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3 w-full overflow-clip rounded-lg"
            >
              <h2 class="sr-only">Images</h2>

              <div
                class="flex overflow-x-auto gap-2 snap-x snap-mandatory scroll-smooth px-2 py-4 bg-orange-50"
              >
                <NuxtImg
                  v-for="image in [...product.images, product.image]"
                  :src="image"
                  :alt="product.name + '' + image"
                  width="500"
                  height="500"
                  class="rounded-lg bg-white shrink-0 snap-center shadow-lg shadow-orange-600"
                  :class="{ 'w-11/12': product.images.length > 1 }"
                  format="webp"
                />
              </div>
            </div>
            <div class="mt-8 lg:col-span-5">
              <UiAddToCart
                :product="product"
                :slug="product.slug"
                :product-name="product.name"
              />
              <!-- Product details -->
              <div class="mt-10">
                <h2 class="text-sm font-medium text-gray-900">Description</h2>
                <div class="mt-4 text-gray-500">
                  {{ product.description }}
                </div>
              </div>
              <!-- Policies -->
              <section aria-labelledby="policies-heading" class="mt-10">
                <h2 id="policies-heading" class="sr-only">Our Policies</h2>
                <dl
                  class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
                >
                  <div
                    v-for="policy in policies"
                    :key="policy.name"
                    class="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"
                  >
                    <dt>
                      <div>
                        <Icon
                          :name="policy.icon"
                          class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <span class="mt-4 text-sm font-medium text-gray-900">
                        {{ policy.name }}
                      </span>
                    </dt>
                    <dd class="mt-1 text-sm text-gray-500">
                      {{ policy.description }}
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- product not found page tailwind with icons-->
        <div class="bg-white">
          <div class="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center">
              <div>
                <Icon
                  name="fontisto:shopping-store"
                  class="mx-auto h-12 w-12 text-gray-400"
                  aria-hidden="true"
                />
                <h1
                  class="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl"
                >
                  Product not found
                </h1>
                <p class="mt-2 text-sm text-gray-500">
                  Sorry, we couldn't find the product you were looking for.
                </p>
              </div>
              <div class="mt-12">
                <NuxtLink to="/">
                  <UiButton>
                    <p>Back to store</p>
                  </UiButton>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <UiProductloading />
    </div>
  </div>
</template>

<style scoped>
/* hidescrolbar */
.images::-webkit-scrollbar {
  display: none;
}
</style>
