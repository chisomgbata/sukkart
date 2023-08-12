export default defineNuxtRouteMiddleware(async (to, _from) => {
  const user = useUserStore();
  if (!user) {
    return navigateTo("/auth/login");
  }
});
