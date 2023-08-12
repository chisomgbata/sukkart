<script setup lang="ts">
const orderSlug = useRoute().params.order;
const { data: order } = useFetch(`/api/order/${orderSlug}`, {
  method: "GET",
});
const text = computed(() => {
  if (!order.value) return "Your order has shipped and will be with you soon.";
  switch (order.value.status) {
    case "PLACED":
      return " Your havent been paid for,if you have made the payment check back in a few minutes as we process your payment or retry the payment.";
    case "PAID":
      return " Your order has been paid for and we are processing your order.";
    case "DELIVERED":
      return " Your order has is being delivered.";
    case "PAYMENT_CANCELLED":
      return " Your order has been cancelled.";
    case "DISPATCHED":
      return " Your order has been completed and received.";
    default:
      return " Your order has shipped and will be with you soon.";
  }
});
const subtotal = computed(() => {
  return order.value?.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
});
</script>

<template>
  <div class="bg-white">
    <div
      class="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      v-if="order"
    >
      <div class="max-w-xl">
        <p class="text-2xl font-extrabold tracking-tight sm:text-5xl">
          Order
          <span class="font-bold text-orange-600">#{{ order.reference }}</span>
        </p>
        <p class="mt-2 text-base text-gray-600" v-if="order.type == 'ONLINE'">
          {{ text }}
        </p>
        <p
          v-if="order.status == 'PLACED' && order.type == 'PAY_ON_DELIVERY'"
          class="mt-2 text-base text-gray-600"
        >
          Your order has been placed and will be delivered to you soon. This
          order is payment on delivery. Be sure to available to receive your
          order.
        </p>
        <ClientOnly v-if="order.status == 'PLACED' || order.status == 'PAID'">
          <p class="text-gray-600 mt-4">
            Your Order should be dispatched on
            {{ useGetNextDeliveryBatch(new Date(order.createdAt)) }} *
          </p>
        </ClientOnly>
        <NuxtLink
          v-if="order.paymentUrl && order.status == 'PLACED'"
          :to="order.paymentUrl"
          class="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
        >
          Pay for order
        </NuxtLink>
      </div>

      <div class="mt-10 border-t border-gray-200">
        <h2 class="sr-only">Your order</h2>

        <h3 class="sr-only">Items</h3>
        <div
          v-for="(
            { price, quantity, image, name, slug, description }, key
          ) in order.items"
          :key="key"
          class="py-10 border-b border-gray-200 flex space-x-6 overflow-x-auto"
        >
          <NuxtImg
            :src="image"
            :alt="name"
            format="webp"
            width="80"
            height="80"
            class="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40"
          />
          <div class="flex-auto flex flex-col">
            <div>
              <h4 class="font-medium text-gray-900">
                <NuxtLink :to="`/product/${slug}`">
                  {{ name }}
                </NuxtLink>
              </h4>
              <p class="mt-2 text-sm text-gray-600">
                {{ description.split(" ").slice(0, 15).join(" ") }}
                ...
              </p>
            </div>
            <div class="mt-6 flex-1 flex items-end">
              <dl
                class="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6"
              >
                <div class="flex">
                  <dt class="font-medium text-gray-900">Quantity</dt>
                  <dd class="ml-2 text-gray-700">
                    {{ quantity }}
                  </dd>
                </div>
                <div class="pl-4 flex sm:pl-6">
                  <dt class="font-medium text-gray-900">Price</dt>
                  <dd class="ml-2 text-gray-700">
                    {{ price }}
                  </dd>
                </div>
                <div class="pl-4 flex sm:pl-6">
                  <dt class="font-medium text-gray-900">Total</dt>
                  <dd class="ml-2 text-gray-700">
                    {{ price * quantity }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div class="sm:ml-40 sm:pl-6">
          <h3 class="sr-only">Your information</h3>

          <h4 class="sr-only">Addresses</h4>
          <dl
            class="grid grid-cols-2 gap-x-6 text-sm py-10"
            v-if="order.address"
          >
            <div>
              <dt class="font-medium text-gray-900">Delivery address</dt>
              <dd class="mt-2 text-gray-700">
                <address>
                  <span class="block capitalize">{{
                    order.address.area.replace(/_/g, " ")
                  }}</span>
                  <span class="block">{{ order.address.lodge }}</span>
                  <span class="block">{{ order.address.phoneNumber }}</span>
                </address>
              </dd>
            </div>
          </dl>

          <h3 class="sr-only">Summary</h3>

          <dl class="space-y-6 border-t border-gray-200 text-sm pt-10">
            <div class="flex justify-between p-2 bg-blue-50 rounded-lg">
              <dt class="font-medium text-gray-900">Subtotal</dt>
              <dd class="text-gray-700 space-x-1">
                <Currency :value="subtotal || 0" />
              </dd>
            </div>
            <div
              class="flex justify-between bg-green-50 p-2 rounded-lg"
              v-if="subtotal && subtotal !== order.total"
            >
              <dt class="font-medium text-gray-900">Discount</dt>
              <dd class="text-gray-700 space-x-1">
                <Currency :value="subtotal - order.total" />
              </dd>
            </div>

            <div class="flex justify-between p-2 bg-orange-50 rounded-lg">
              <dt class="font-medium text-gray-900">Total</dt>
              <dd class="text-gray-900 space-x-1">
                <Currency :value="order.total" />
              </dd>
            </div>

            <div class="mt-2 text-gray-400">
              * There might be a slight delay in the delivery time, but in case
              of such we will notify you before hand.
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
