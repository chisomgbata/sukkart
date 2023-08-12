<script setup lang="ts">
const baseUrl = useRuntimeConfig().public.baseUrl;
const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const googleClientId =
  "629319720255-tmknbjp73la50vq1fckg3evd3t0sc0s4.apps.googleusercontent.com";
const googleRedirectUri = `${baseUrl}/auth/login`;
const signInUrl = `${googleAuthUrl}?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=openid%20email%20profile`;

const signInWithGoogle = async () => {
  useTrackEvent("google-login");
  await navigateTo(signInUrl, {
    external: true,
  });
};

const code = useRoute().query.code?.toString();

onMounted(async () => {
  if (code) {
    const user = await $fetch("/api/auth/google", {
      method: "POST",
      body: {
        code,
      },
    });
    if (user) useUserStore().setUser(user);
    const redirectCookie = useCookie("redirect");
    if (redirectCookie.value) {
      await navigateTo(redirectCookie.value);
      redirectCookie.value = null;
    } else {
      await navigateTo("/");
    }
  }
});
</script>

<template>
  <div>
    <button
      @click="signInWithGoogle"
      class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <span class="sr-only">Sign in with Google</span>
      <Icon name="ci:google" class="w-6 h-6" />
    </button>
  </div>
</template>
