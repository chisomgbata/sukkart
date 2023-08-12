export default defineNuxtRouteMiddleware(async (to, _from) => {
  const user = useUserStore().user;
  if (user) {
    return navigateTo("/");
  }
});
