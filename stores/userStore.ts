export const useUserStore = defineStore("UserStore", () => {
  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }

  const user = ref<User | null>(null);
  const setUser = (userInput: User) => {
    user.value = userInput;
  };
  const clearUser = () => {
    user.value = null;
  };

  const logout = async () => {
    await $fetch("/api/auth/logout");
    clearUser();
    useCartStore().clearCart();
  };
  return {
    user,
    setUser,
    clearUser,
    logout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
