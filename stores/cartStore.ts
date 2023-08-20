import { OrderCoupon } from "~/composables/order";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
}
interface Cart {
  id: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
  slug: string;
}
export const useCartStore = defineStore("CartStore", () => {
  const cart = ref<Cart[]>([]);
  const initialLoading = ref(true);
  const loading = ref(false);

  const fetchAndSetCart = async () => {
    const { data: getCart } = await useFetch("/api/cart", {
      key: "getCart",
    });
    if (!getCart.value) return (initialLoading.value = false);
    cart.value = getCart.value;
    initialLoading.value = false;
  };

  const setCart = (newCart: Cart[]) => {
    cart.value = newCart;
  };


  const addToCart = async (product: Product) => {
    loading.value = true;
    if (isInCart(product.id)) {
      loading.value = false;
      throw new Error("Product already in cart");
    }
    await $fetch("/api/cart", {
      method: "POST",
      body: { productId: product.id },
    });
    cart.value.push({
      ...product,
      quantity: 1,
    });
    loading.value = false;
    return true;
  };

  const isInCart = (productId: number) => {
    return cart.value.some((item) => item.id === productId);
  };

  const changeQuantity = async (productId: number, quantity: number) => {
    loading.value = true;
    await $fetch("/api/cart", {
      method: "PUT",
      body: { productId, quantity },
    });
    const index = cart.value.findIndex((item) => item.id === productId);
    cart.value[index].quantity = quantity;
    loading.value = false;
    return quantity;
  };

  const productQuantity = (productId: number) => {
    const item = cart.value.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const removeItem = async (productId: number) => {
    loading.value = true;
    await $fetch("/api/cart", {
      method: "DELETE",
      body: { productId },
    });
    cart.value = cart.value.filter((item) => item.id !== productId);
    loading.value = false;
  };

  const coupon: Ref<OrderCoupon | undefined> = ref(undefined);

  const orderPrice = computed(() => {
    return useOrderPrice(
      cart.value.map((e) => {
        return {
          sellingPrice: e.price,
          quantity: e.quantity,
        };
      })
    );
  });

  const clearCart = () => {
    cart.value = [];
  };

  const setCoupon = (newCoupon: OrderCoupon) => {
    coupon.value = newCoupon;
  };

  const getCoupon = () => {
    return coupon?.value;
  };

  const clearCoupon = () => {
    coupon.value = undefined;
  };

  return {
    cart,
    loading,
    addToCart,
    isInCart,
    changeQuantity,
    productQuantity,
    removeItem,
    orderPrice,
    initialLoading,
    fetchAndSetCart,
    clearCart,
    setCoupon,
    getCoupon,
    clearCoupon,
    setCart,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
