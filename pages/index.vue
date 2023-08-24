<script setup lang="ts">
useHead({
  title: "Sukkart- Store",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "The Number 1 e-commerce store in nsukka",
    },
  ],
});

const promos = [
  {
    src: "/promos/food.jpeg",
    alt: "food",
    title: "Food",
    description: "Get the best food in nsukka",
    href: "/products/food",
  },
  {
    src: "/promos/food.jpeg",
    alt: "food",
    title: "Food",
    description: "Get the best food in nsukka",
    href: "/products/food",
  },
  {
    src: "/promos/food.jpeg",
    alt: "food",
    title: "Food",
    description: "Get the best food in nsukka",
    href: "/products/food",
  },
];

const categories = [
  {
    name: "Food",
    href: "/products/food",
    icon: "fa6-solid:bowl-food",
    color: "bg-red-500",
    description: "Get the best food in nsukka",
  },
  {
    name: "Drinks",
    href: "/products/drinks",
    icon: "fa6-solid:whiskey-glass",
    color: "bg-blue-500",
    description: "Get the best food in nsukka",
  },
  {
    name: "Electronics",
    href: "/products/electronics",
    icon: "fa6-solid:tv",
    color: "bg-green-500",
    description: "Get the best food in nsukka",
  },
  {
    name: "Fashion",
    href: "/products/fashion",
    icon: "fa6-solid:shirt",
    color: "bg-yellow-500",
    description: "Get the best food in nsukka",
  },
  {
    name: "Furniture",
    href: "/products/furniture",
    icon: "fa6-solid:chair",
    color: "bg-purple-500",
    description: "Get the best food in nsukka",
  },
  {
    name: "Health",
    href: "/products/health",
    icon: "fa6-solid:heart",
    color: "bg-pink-500",
    description: "Get the best food in nsukka",
  },
  {
    name: "Sports",
    href: "/products/sports",
    icon: "fa6-solid:volleyball",
    color: "bg-indigo-500",
    description: "Get the best food in nsukka",
  },
  {
    name: "Toys",
    href: "/products/toys",
    icon: "fa6-solid:gamepad",
    color: "bg-gray-500",
    description: "Get the best food in nsukka",
  },
];

useHandleRedirect();

const { data, pending, refresh } = useLazyFetch("/api/home");
</script>
<template>
  <div>
    <div v-if="pending">loading...</div>
    <div v-else>
      <div v-if="!data">
        <div>error</div>
        <button @click="refresh()">retry</button>
      </div>

      <div class="flex mt-4 gap-3">
        <div class="w-1/5 hidden lg:flex flex-col  rounded-lg bg-orange-50 text-orange-600 gap-3 p-4">
          <nav>
            <ul class="flex flex-col gap-4">
              <li v-for="category in categories">
                <NuxtLink :to="category.href" class="flex gap-2">
                  <Icon :name="category.icon" class="w-5 h-5" />
                  <span>{{ category.name }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <div class="flex overflow-auto gap-3 snap-x snap-mandatory lg:w-3/5">
          <div
            v-for="promo in promos"
            class="aspect-[2/1] w-[85%] lg:w-full rounded-lg overflow-clip shrink-0 snap-center"
          >
            <NuxtLink :to="promo.href">
              <NuxtPicture
                :src="promo.src"
                :imgAttrs="{ class: 'w-full h-full object-cover' }"
              ></NuxtPicture>
            </NuxtLink>
          </div>
        </div>
        <div class="hidden lg:flex flex-col flex-1 gap-4">
          <div
            class="w-full h-full bg-orange-600 rounded-xl grid place-items-center text-orange-50"
          >
            Promo Section
          </div>
          <div
            class="w-full h-full bg-orange-600 rounded-xl grid place-items-center text-orange-50"
          >
            Promo Section
          </div>
        </div>
      </div>

      <!-- <div>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Categories</h2>
          <NuxtLink to="/categories">See all</NuxtLink>
        </div>
        <div class="flex gap-3 overflow-auto snap-x snap-mandatory">
          <div
            v-for="category in categories"
            class="flex flex-col items-center justify-center w-40 h-40 rounded-lg bg-orange-50 snap-center"
          >
            <Icon :name="category.icon" class="w-10 h-10" />
            <span class="text-sm font-semibold">{{ category.name }}</span>
          </div>
        </div>
      </div> -->

      <div v-if="data" class="flex flex-col gap-10 mt-8">
        <Products
          :products="data"
          title="Recommended Products"
          icon="heroicons:star-20-solid"
        />
      </div>
    </div>
  </div>
</template>

<style>
/* hide scrollbar */
::-webkit-scrollbar {
  display: none;
}
</style>
