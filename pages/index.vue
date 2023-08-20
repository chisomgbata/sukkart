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

      <div>
        <div class="aspect-[2/1] bg-gray-700 w-full rounded-sm overflow-clip">
          <NuxtPicture
            src="/promos/sale.jpg"
            :imgAttrs="{ class: 'w-full h-full object-cover' }"
          ></NuxtPicture>
        </div>
      </div>

      <div v-if="data" class="flex flex-col gap-10">
        <Products
          :products="data"
          title="Recommended Products"
          icon="heroicons:star-20-solid"
        />
      </div>
    </div>
  </div>
</template>
