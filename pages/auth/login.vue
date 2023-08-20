<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const formData = reactive({
  email: "",
  password: "",
});

const loginUser = async () => {
  try {
    loading.value = true;
    const validatedData = loginUserCheck.parse(formData);
    const { user, cart } = await $fetch("/api/auth/login", {
      method: "POST",
      body: validatedData,
    });
    toast.success("Login Successful", {
      description: "Welcome back " + user.firstName,
    });
    useTrackEvent("login");
    useUserStore().setUser(user);
    useCartStore().setCart(cart);
    const redirectCookie = useCookie("redirect");
    if (redirectCookie.value) {
      await navigateTo(redirectCookie.value);
      redirectCookie.value = "";
    } else {
      await navigateTo("/");
    }
  } catch (error: any) {
    loading.value = false;
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

const loading = ref(false);
</script>

<template>
  <div
    class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-3"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <NuxtLink to="/">
          <UiLogo />
        </NuxtLink>
      </div>
      <h2 class="mt-6 text-center text-2xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="bg-white py-8 px-4 shadow-xl shadow-orange-400 rounded-lg sm:px-10"
      >
        <form class="space-y-6" @submit.prevent="loginUser()">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                v-model="formData.email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
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
                v-model="formData.password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <NuxtLink
                to="/auth/register"
                class="font-medium text-orange-600 hover:text-orange-500"
              >
                Sign up
              </NuxtLink>
            </div>
            <!-- 
            <div class="text-sm">
              <NuxtLink
                to="/auth/forgot-password"
                class="font-medium text-orange-600  hover:text-orange-500"
              >
                Forgot your password?
              </NuxtLink>
            </div> -->
          </div>

          <div>
            <button
              :disabled="loading"
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium disabled:bg-orange-400 text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <p v-if="!loading">Sign in</p>
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

          <div class="mt-6">
            <div>
              <ClientOnly>
                <GoogleAuth />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
