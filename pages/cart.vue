<script setup lang="ts">
// import { z } from "zod";
import { useGetNextDeliveryBatch } from "~/composables/batch";
// import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { storeToRefs } from "pinia";

const { initialLoading, loading, cart, orderPrice } = storeToRefs(
  useCartStore()
);
const { clearCart } = useCartStore();

const { user } = storeToRefs(useUserStore());

const checkout = async () => {
  checkingout.value = true;
  const address = useAddressStore().selectedAddress;
  try {
    const order = await $fetch(`/api/order`, {
      method: "POST",
      body: {
        addressId: address.id,
      },
    });

    if (order) {
      checkingout.value = false;
      useCartStore().clearCart();
      useCartStore().clearCoupon();
      couponCode.value = "";

      return await navigateTo(order, { external: true });
    } else {
      toast.error("error", {
        description: "An error occured while processing your order",
      });
      checkingout.value = false;
    }
  } catch (error: any) {
    toast.error("error", {
      description: error.data.message,
    });
    checkingout.value = false;
  }
};

const payOnDelivery = async () => {
  checkingout.value = true;
  const address = useAddressStore().selectedAddress;
  const response = await $fetch(`/api/order/cus/pod`, {
    method: "POST",
    body: {
      addressId: address.id,
    },
  });
  if (response) {
    checkingout.value = false;
    clearCart();
    return await navigateTo(`/order/${response.id}`);
  } else {
    checkingout.value = false;
    toast.error("error", {
      description: "An error occured while processing your order",
    });
  }
};

let checkingout = ref(false);

const couponCode = ref("");

const loginToProceed = () => {
  const redirectCookie = useCookie("redirect");
  redirectCookie.value = "/cart";
  navigateTo("/auth/login");
};
</script>

<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto pt-4 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1
        class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
      >
        Shopping Cart
      </h1>

      <div v-if="!initialLoading">
        <form
          v-if="cart.length > 0"
          @submit.prevent="checkout()"
          class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16"
        >
          <MoleculesCart />

          <!-- Order summary -->
          <section
            aria-labelledby="summary-heading"
            class="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl class="mt-6 space-y-4">
              <!-- <div
                class="border-t border-gray-200 pt-4 flex items-center justify-between"
                v-if="discount > 0"
              >
                <dt class="flex items-center text-sm text-gray-600">
                  <span>Discount</span>
                </dt>
                <dd class="text-sm font-medium text-gray-900">
                  <Icon
                    v-if="loading"
                    name="fontisto:spinner"
                    class="animate-spin"
                  />
                  <span v-else>
                    <Currency :value="discount" class="text-green-600" />
                  </span>
                </dd>
              </div> -->

              <div
                class="border-gray-200 pt-4 flex items-center justify-between"
              >
                <dt class="text-base font-medium text-gray-900">Order total</dt>
                <dd class="text-base font-medium text-gray-900">
                  <Icon
                    v-if="loading"
                    name="fontisto:spinner"
                    class="animate-spin"
                  />
                  <span v-else>
                    <Currency :value="orderPrice" />
                  </span>
                </dd>
              </div>
              <!-- <Disclosure>
                <DisclosureButton class="py-2 text-orange-600">
                  I have a coupon
                </DisclosureButton>
                <DisclosurePanel class="text-gray-500 transition-all">
                  <div class="flex gap-3 w-full items-center">
                    <input
                      type="text"
                      v-model="couponCode"
                      class="rounded-lg appearance-none outline-none border-orange-600"
                      placeholder="I have a coupon"
                    />
                    <button
                      type="button"
                      @click="useCoupon()"
                      class="bg-orange-600 p-2 rounded-tr-md rounded-bl-md w-full text-white font-bold"
                    >
                      Apply
                    </button>
                  </div>
                </DisclosurePanel>
              </Disclosure> -->
            </dl>

            <div class="">
              <div v-if="user">
                <MoleculesAddress />
                <div class="my-2 mb-4">
                  <ClientOnly>
                    <p class="text-gray-600">
                      Your Order will be dispatched on
                      {{ useGetNextDeliveryBatch(new Date()) }}
                    </p>
                  </ClientOnly>
                </div>
                <UiButton
                  :disabled="checkingout || !useAddressStore().selectedAddress"
                  class="bg-orange-600 py-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Icon
                    v-if="checkingout"
                    name="fontisto:spinner"
                    class="animate-spin"
                  />
                  <p v-else>checkout online</p>
                </UiButton>
                <UiButton
                  type="button"
                  :disabled="checkingout || !useAddressStore().selectedAddress"
                  @click="payOnDelivery()"
                  class="bg-orange-600 py-3 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
                >
                  <Icon
                    v-if="checkingout"
                    name="fontisto:spinner"
                    class="animate-spin"
                  />
                  <p v-else>Pay on Delivery</p>
                </UiButton>
              </div>
              <div v-else>
                <button
                  @click="loginToProceed()"
                  class="mt-8 w-full bg-orange-600 border border-transparent rounded-tr-lg rounded-bl-lg py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-900"
                >
                  Login To Proceed
                </button>
              </div>
            </div>
          </section>
        </form>
        <div v-else class="mt-12 text-center">
          <p class="text-xl font-semibold text-gray-600">Your cart is empty</p>

          <Icon
            name="carbon:shopping-cart-clear"
            class="w-20 h-20 text-gray-400 my-12"
          />
          <NuxtLink
            to="/"
            class="mt-8 w-full bg-orange-600 border border-transparent rounded-tr-lg rounded-bl-lg py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-700"
          >
            Continue Shopping
          </NuxtLink>
        </div>
      </div>
      <div v-else>The Cart is loading</div>
    </div>

    <div>
      <h2 class="px-4 text-lg container mx-auto md:px-8">
        Check Some Other Products
      </h2>
      <div>
        <ProductList :take="8" :skip="1" />
      </div>
    </div>
  </div>
</template>
