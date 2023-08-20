<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const userStore = useUserStore();

const logout = async () => {
  useTrackEvent("logout");
  userStore.logout();
  open.value = false;
};
const user = computed(() => userStore.user);

const { data: categories } = await useCategories();

const open = ref(false);
</script>
<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="fixed inset-0 flex z-40" @close="open = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-500"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-500 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-500 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="relative max-w-xs md:max-w-sm w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto"
          >
            <div class="px-4 pt-5 pb-2 flex justify-between items-center">
              <button
                type="button"
                class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                @click="open = false"
              >
                <span class="sr-only">Close menu</span>
                <Icon
                  name="heroicons:x-mark"
                  class="w-6 h-6"
                  aria-hidden="true"
                />
              </button>
              <div>
                <UiLogo />
              </div>
            </div>

            <!-- Links -->
            <div class="mt-2">
              <div v-for="category in categories" class="pb-8 px-4 space-y-10">
                <NuxtLink
                  @click="open = false"
                  class="font-medium text-gray-900 flex gap-3 items-center"
                  :to="`/category/${category.slug}`"
                >
                  <p>{{ category.name }}</p>
                </NuxtLink>
              </div>
            </div>

            <div class="border-t border-gray-200 py-6 px-4 space-y-6">
              <NuxtLink
                @click="open = false"
                class="font-medium text-gray-900 flex gap-3 items-center"
                to="https://tawk.to/chat/642c607a31ebfa0fe7f67b83/1gt6lhom3"
              >
                <Icon name="mdi:chat" class="w-6 h-6 text-orange-600" />
                <p>Customer Support</p>
              </NuxtLink>
              <div
                v-if="!user"
                class="flex flex-col gap-6 font-medium text-gray-900"
              >
                <div class="flex gap-3 items-center">
                  <Icon
                    name="heroicons:arrow-left-on-rectangle"
                    class="w-6 h-6 text-orange-600"
                  />
                  <NuxtLink
                    @click="open = false"
                    to="/auth/login"
                    class="-m-2 p-2 block font-medium text-gray-900"
                    >Sign in</NuxtLink
                  >
                </div>
                <div class="flex gap-3 items-center">
                  <Icon name="heroicons:user" class="w-6 h-6 text-orange-600" />
                  <NuxtLink
                    @click="open = false"
                    to="/auth/register"
                    class="-m-2 p-2 block font-medium text-gray-900"
                    >Create Account</NuxtLink
                  >
                </div>
              </div>
              <div class="space-y-6" v-else>
                <NuxtLink
                  @click="open = false"
                  to="/orders"
                  class="-m-2 p-2 flex gap-3 items-center font-medium text-gray-900"
                >
                  <Icon name="mdi:package" class="w-6 h-6 text-orange-600" />
                  <p>My Orders</p>
                </NuxtLink>
                <div class="flex gap-2 items-center">
                  <Icon
                    v-if="user.avatar == 'default'"
                    name="heroicons:user"
                    class="w-8 h-8 text-orange-200 p-2 bg-orange-600 rounded-tr-lg rounded-bl-lg"
                  />
                  <img v-else :src="user.avatar" class="w-8 h-8 rounded-lg" />
                  <p class="-m-2 p-2 block font-medium text-gray-900">
                    {{ user.firstName }} {{ user.lastName }}
                  </p>
                </div>
                <div class="flex gap-2">
                  <button
                    class="text-orange-600 font-semibold"
                    @click="logout()"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 py-6 px-4">
              <div class="-m-2 p-2 flex items-center">
                <Icon name="twemoji:flag-nigeria" class="w-6 h-6" />
                <span class="ml-3 block text-base font-medium text-gray-900">
                  NGN
                </span>
                <span class="sr-only">, change currency</span>
              </div>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white">
      <nav aria-label="Top" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="h-16 flex items-center justify-between">
            <button
              type="button"
              class="bg-white p-2 rounded-md text-gray-400"
              @click="open = true"
            >
              <span class="sr-only">Open menu</span>
              <Icon
                name="heroicons:bars-3-bottom-left-20-solid"
                class="h-6 w-6"
                aria-hidden="true"
              />
            </button>

            <!-- Logo -->
            <NuxtLink @click="open = false" to="/" class="ml-3">
              <UiLogo />
            </NuxtLink>
            <div class="md:ml-auto flex items-center">
              <div
                class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
                v-if="!user"
              >
                <NuxtLink
                  @click="open = false"
                  to="/auth/login"
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >Sign in</NuxtLink
                >
                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                <NuxtLink
                  @click="open = false"
                  to="/auth/register"
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >Create account</NuxtLink
                >
              </div>
              <div v-else class="lg:flex gap-2 items-center hidden">
                <div>
                  <Icon name="heroicons:user" class="w-6 h-6" />
                </div>

                <p>{{ user?.firstName }} {{ user?.lastName }}</p>

                <button @click="logout()">
                  <p class="sr-only">Logout</p>
                  <Icon name="heroicons-outline:logout" class="w-6 h-6" />
                </button>
              </div>

              <!-- Cart -->
              <div class="flex gap-2 items-center">
                <UiSearchIcon />
                <UiCartIcon />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
