<script setup lang="ts">
import { RegisterUserCheck } from "~~/zod/authUser";
const { setUser } = useUserStore();
definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const formData = reactive({
  email: "",
  firstName: "",
  lastName: "",
  password: "",
});

const registerUser = async () => {
  try {
    loading.value = true;
    const fields = RegisterUserCheck.parse(formData);
    const user = await $fetch("/api/auth/register", {
      method: "POST",
      body: fields,
    });

    toast.success("Registration Successful", {
      description: "Welcome " + user.firstName,
    });
    useTrackEvent("register");
    setUser(user);
    useCartStore().fetchAndSetCart();
    await navigateTo("/");
  } catch (error: any) {
    loading.value = false;
    if (error.data?.errors[0].extensions.code == "RECORD_NOT_UNIQUE") {
      // return showToast("Error", "User already exists", "error");
      toast.error("Error", {
        description: "User already exists",
      });
      return;
    }
    if (error.errors) {
      toast.error("Error", {
        description: error.errors[0].message,
      });
      return;
    }
    toast.error("Error", {
      description: error.data.message,
    });
    return;
  }
};
const loading = ref(false);
</script>

<template>
  <div
    class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-3"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <NuxtLink to="/" class="flex justify-center">
        <UiLogo />
      </NuxtLink>
      <h2 class="mt-6 text-center text-2xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="bg-white py-8 px-4 shadow-lg shadow-orange-400 rounded-lg sm:px-10"
      >
        <form class="space-y-6" @submit.prevent="registerUser">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="formData.email"
                type="email"
                autocomplete="email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="firstname"
              class="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <div class="mt-1">
              <input
                v-model="formData.firstName"
                id="firstname"
                name="firstname"
                type="text"
                autocomplete="off"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="lastname"
              class="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <div class="mt-1">
              <input
                v-model="formData.lastName"
                id="lastname"
                name="lastname"
                type="text"
                autocomplete="off"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="formData.password"
                type="password"
                autocomplete="current-password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              :disabled="loading"
              type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:bg-orange-400 bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <p v-if="!loading">Register</p>
              <Icon
                v-else
                name="gg:spinner"
                class="w-6 h-6 animate-spin text-orange-600"
              />
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-4">
            <div>
              <GoogleAuth />
            </div>
          </div>

          <div class="flex items-center justify-between mt-4">
            <div class="text-sm">
              <NuxtLink
                to="/auth/login"
                class="font-medium text-orange-600 hover:text-orange-500"
              >
                Login instead
              </NuxtLink>
            </div>

            <!-- <div class="text-sm">
              <NuxtLink
                to="/auth/forgot-password"
                class="font-medium text-orange-600  hover:text-orange-500"
              >
                Forgot your password?
              </NuxtLink>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div></div>
  </div>
</template>
