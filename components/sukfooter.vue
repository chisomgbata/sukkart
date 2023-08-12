<script setup lang="ts">
const navigation = {
  main: [
    { name: "About", href: "about" },
    // { name: "Jobs", href: "#" },
    // { name: "Partners", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: "bi:facebook",
    },
    {
      name: "Whatsapp",
      href: "#",
      icon: "bi:whatsapp",
    },
    {
      name: "Mail",
      href: "#",
      icon: "heroicons:at-symbol",
    },
    {
      name: "Phone",
      href: "#",
      icon: "heroicons:phone",
    },
    {
      name: "Twitter",
      href: "#",
      icon: "ph:twitter-logo-fill",
    },
  ],
};
</script>

<template>
  <footer class="bg-white">
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav
        class="-mx-5 -my-2 flex flex-wrap justify-center"
        aria-label="Footer"
      >
        <div v-for="item in navigation.main" :key="item.name" class="px-5 py-2">
          <NuxtLink
            :to="item.href"
            class="text-base text-gray-500 hover:text-gray-900"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </nav>
      <div class="mt-8 flex justify-center space-x-6">
        <a
          v-for="item in navigation.social"
          :key="item.name"
          :href="item.href"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">{{ item.name }}</span>
          <Icon :name="item.icon" class="w-6 h-6" />
        </a>
      </div>
      <p class="mt-8 text-center text-base text-gray-400">
        &copy; {{ new Date().getFullYear() }} Sukkart. All rights reserved.
      </p>
    </div>
  </footer>
</template>
