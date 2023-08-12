<script setup lang="ts">
const cartStore = useCartStore();
const loading = computed(() => cartStore.loading);
const { isInCart, changeQuantity, productQuantity, addToCart, removeItem } =
  cartStore;

const props = defineProps<{
  product: {
    id: number;
    name: string;
    image: string;
    slug: string;
    price: number;
  };
  productName: string;
  slug: string;
}>();
const useStore = useUserStore();
const user = computed(() => useStore.user);
const add = async () => {
  if (!user.value) {
    useTrackEvent("Wants To Add To Cart", {
      props: {
        product: props.productName,
        id: props.product.id,
      },
    });

    toast.error("Login Required", {
      description: "You need to login to add to cart",
    });
    const cookie = useCookie("redirect");
    cookie.value = "/product/" + props.slug;
    setTimeout(async () => {
      await navigateTo("/auth/login");
    }, 1000);
  } else {
    try {
      useTrackEvent("Add To Cart", {
        props: {
          product: props.productName,
          id: props.product.id,
        },
      });
      const addedtocart = await addToCart(props.product);
      if (addedtocart) {
        toast.success("Added To Cart", {
          description: `${props.productName} has being added to your cart`,
        });
        return;
      }
    } catch (error: any) {
      toast.error("Error", {
        description: error.data.message,
      });
      return;
    }
  }
};
</script>

<template>
  <div>
    <!-- Item is in cart -->
    <div v-if="isInCart(product.id)" class="flex items-center">
      <div class="flex justify-between items-center w-full">
        <UiButton
          @click="changeQuantity(product.id, productQuantity(product.id) - 1)"
          :disabled="productQuantity(product.id) < 1"
          class="bg-orange-600 w-min p-1"
        >
          <Icon name="heroicons:minus" class="w-6 h-6" />
        </UiButton>
        <div class="text-center">
          <Icon v-if="loading" name="fontisto:spinner" class="animate-spin" />
          <p class="font-bold" v-else>
            {{ productQuantity(product.id) }}
          </p>
        </div>
        <UiButton
          @click="changeQuantity(product.id, productQuantity(product.id) + 1)"
          class="bg-orange-600 w-min p-1"
        >
          <Icon name="heroicons:plus" class="w-6 h-6" />
        </UiButton>
      </div>

      <!-- remove from cart button  -->
      <UiButton
        class="bg-orange-600 text-orange-600 w-min p-1 ml-2"
        @click="removeItem(product.id)"
      >
        <Icon name="heroicons:trash" class="w-6 h-6 mx-1" />
      </UiButton>
    </div>

    <!-- Item is not in cart -->
    <UiButton @click="add()" v-else class="bg-orange-600 py-3">
      <Icon v-if="loading" name="fontisto:spinner" class="animate-spin" />
      <p v-else>Add To Cart</p>
    </UiButton>
  </div>
</template>
