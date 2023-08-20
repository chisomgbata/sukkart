<script setup lang="ts">
useHead({
  link: [
    {
      rel: "dns-prefetch",
      href: "https://analytics.sukk.art",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
    // add default language
  ],
});
const isDev = process.env.NODE_ENV === "development";
</script>

<template>
  <div class="bg-white font-sans">
    <Navbar />

    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 w-full px-2">
      <slot />
    </div>

    <Search />
    <sukfooter />
    <Toaster :duration="3000" richColors />

    <ClientOnly v-if="!isDev">
      <TawkTo />
    </ClientOnly>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translate(-100px, 0);
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
