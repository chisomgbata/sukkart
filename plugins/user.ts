export default defineNuxtPlugin(async (nuxtApp) => {
  const { data: user } = await useFetch("/api/auth/user", {
    credentials: "include",
    key: "fetch-user",
  });
  if (user.value) {
    useUserStore().setUser(user.value);
  }
});
