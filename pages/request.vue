<script setup lang="ts">
const formData = reactive({
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
});

const request = async () => {
  try {
    const validData = requestSchema.parse(formData);
    const request = await $fetch("/api/request", {
      method: "POST",
      body: validData,
    });
    toast.success("Custom request received", {
      description: "We will get back to you as soon as we can",
    });
    formData.name = "";
    formData.email = "";
    formData.phoneNumber = "";
    formData.message = "";
  } catch (error: any) {
    if (error.errors) {
      return toast.error("Error", {
        description: error.errors[0].message,
      });
    }
    return toast.error("Error", {
      description: error.data.message,
    });
  }
};
</script>

<template>
  <div>
    <div class="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div class="relative max-w-xl mx-auto">
        <svg
          class="absolute left-full transform translate-x-1/2"
          width="404"
          height="404"
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="404"
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
          />
        </svg>
        <svg
          class="absolute right-full bottom-0 transform -translate-x-1/2"
          width="404"
          height="404"
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="404"
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
          />
        </svg>
        <div class="text-center">
          <h2
            class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            Make a custom request
          </h2>
          <p class="mt-4 text-lg leading-6 text-gray-500">
            Request a custom order and we will get back to you as soon as we
            can.
          </p>
        </div>
        <div class="mt-12">
          <form
            class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            @submit.prevent="request"
          >
            <div>
              <label
                for="full-name"
                class="block text-sm font-medium text-gray-700"
                >First name</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autocomplete="name"
                  v-model="formData.name"
                  class="py-3 px-4 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  v-model="formData.email"
                  autocomplete="email"
                  class="py-3 px-4 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="phone" class="block text-sm font-medium text-gray-700"
                >Phone</label
              >
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  v-model="formData.phoneNumber"
                  autocomplete="tel"
                  class="py-3 px-4 block w-full focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="message"
                class="block text-sm font-medium text-gray-700"
                >Message</label
              >
              <div class="mt-1">
                <textarea
                  id="message"
                  name="message"
                  v-model="formData.message"
                  rows="4"
                  class="py-3 px-4 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 border border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>

            <div class="sm:col-span-2">
              <button
                type="submit"
                class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Make Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
