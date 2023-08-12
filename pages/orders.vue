<script setup lang="ts">
definePageMeta({
  title: "Orders",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "Order history and status",
    },
  ],
  middleware: ["authenticated"],
});

const { data: orders } = useFetch("/api/order");
const humanReadableDate = (date: string) => {
  const format = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return format.format(new Date(date));
};
</script>

<template>
  <div class="bg-white">
    <div class="max-w-4xl mx-auto py-16 sm:px-6 sm:py-24">
      <div class="px-4 sm:px-0">
        <h1
          class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
        >
          Order history
        </h1>
        <p class="mt-2 text-sm text-gray-500">
          Check the status of recent orders, manage returns, and download
          invoices.
        </p>
      </div>

      <div class="mt-16">
        <h2 class="sr-only">Recent orders</h2>

        <div class="space-y-16 sm:space-y-24">
          <div v-for="order in orders" :key="order.id">
            <h3 class="sr-only">
              Order placed on
              <time :datetime="order.createdAt">{{ order.createdAt }}</time>
            </h3>

            <div
              class="bg-gray-50 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8"
            >
              <dl
                class="divide-y divide-gray-200 space-y-4 text-sm text-gray-600 flex-auto md:divide-y-0 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8"
              >
                <div class="flex justify-between md:block">
                  <dt class="font-medium text-gray-900">Order number</dt>
                  <dd class="md:mt-1">
                    {{ order.reference }}
                  </dd>
                </div>
                <div class="flex justify-between pt-4 md:block md:pt-0">
                  <dt class="font-medium text-gray-900">Date placed</dt>
                  <dd class="md:mt-1">
                    <time :datetime="order.createdAt">{{
                      humanReadableDate(order.createdAt)
                    }}</time>
                  </dd>
                </div>
                <div
                  class="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0"
                >
                  <dt>Total amount</dt>
                  <dd class="md:mt-1">
                    &#8358;
                    {{ order.total }}
                  </dd>
                </div>
              </dl>
              <div
                class="space-y-4 mt-6 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0"
              >
                <NuxtLink
                  :to="`/order/${order.id}`"
                  class="w-full flex items-center justify-center bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 md:w-auto"
                >
                  View Order
                  <span class="sr-only">{{ order.reference }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
