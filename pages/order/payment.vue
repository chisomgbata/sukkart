<script setup lang="ts">
const query = useRoute().query;
const { data: order } = await useLazyFetch(
  `/api/order/cus/reference/${query.reference}`,
  {
    key: new Date().toISOString(),
  }
);
</script>

<template>
  <div>
    <div class="mx-auto container">
      <div v-if="order" class="">
        <div v-if="order.status == 'PAYMENT_CANCELLED'">
          Your Order Has Being Cancelled
        </div>
        <div
          v-else-if="order.status == 'PLACED'"
          class="flex flex-col items-center justify-center h-screen w-full"
        >
          Your Payment is being processed
          <NuxtLink :to="`/order/${order.id}`" class="text-orange-700"
            >View Order</NuxtLink
          >
        </div>
        <div v-else>
          <main class="relative lg:min-h-full">
            <div>
              <div
                class="max-w-2xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-32 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24"
              >
                <div class="lg:col-start-2">
                  <h1 class="text-sm font-medium text-orange-700">
                    Payment successful
                  </h1>
                  <p
                    class="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
                  >
                    Thanks for ordering
                  </p>
                  <p class="mt-2 text-base text-gray-500">
                    We appreciate your order, we’re currently processing it. So
                    hang tight and we’ll send you confirmation very soon!
                  </p>

                  <dl class="mt-16 text-sm font-medium">
                    <dt class="text-gray-900">Tracking number</dt>
                    <dd class="mt-2 text-orange-700">{{ order.reference }}</dd>
                  </dl>

                  <dl
                    class="text-sm font-medium text-gray-500 space-y-6 border-t border-gray-200 pt-6 mt-2"
                  >
                    <div
                      class="flex items-center justify-between text-gray-900 pt-6"
                    >
                      <dt class="text-base">Order Amount</dt>
                      <dd class="text-lg">
                        <span class="text-orange-400 text-sm">₦</span>
                        {{ order.total - order.deliveryCost }}
                      </dd>
                    </div>
                  </dl>
                  <dl
                    class="text-sm font-medium text-gray-500 space-y-6 border-t border-gray-200 pt-6 mt-2"
                  >
                    <div
                      class="flex items-center justify-between text-gray-900 pt-6"
                    >
                      <dt class="text-base">Delivery</dt>
                      <dd class="text-lg">
                        <span class="text-orange-400 text-sm">₦</span>
                        {{ order.deliveryCost }}
                      </dd>
                    </div>
                  </dl>
                  <dl
                    class="text-sm font-medium text-gray-500 space-y-6 border-t border-gray-200 pt-6 mt-2"
                  >
                    <div
                      class="flex items-center justify-between text-gray-900 pt-6"
                    >
                      <dt class="text-base">Total</dt>
                      <dd class="text-lg">
                        <span class="text-orange-400 text-sm">₦</span>
                        {{ order.total }}
                      </dd>
                    </div>
                  </dl>

                  <dl class="mt-16 text-gray-600">
                    <div>
                      <dt class="font-medium text-gray-900">
                        Delivery Address
                      </dt>
                      <dd class="mt-2">
                        <address class="not-italic">
                          <span class="block">{{ order.Address?.area }}</span>
                          <span class="block">{{ order.Address?.lodge }}</span>
                          <span class="block">{{
                            order.Address?.phoneNumber
                          }}</span>
                        </address>
                      </dd>
                    </div>
                  </dl>

                  <div class="mt-16 border-t border-gray-200 py-6 text-right">
                    <NuxtLink
                      to="/"
                      class="text-sm font-medium text-orange-700 hover:text-orange-600"
                      >Continue Shopping<span aria-hidden="true">
                        &rarr;</span
                      ></NuxtLink
                    >
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center h-screen w-full text-orange-600"
      >
        <div class="mb-6 text-xl">Processing Payment</div>
        <icon name="svg-spinners:blocks-wave" class="w-40 h-40" />
      </div>
    </div>
  </div>
</template>
