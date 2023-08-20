export default defineNuxtConfig({
  modules: [
    "nuxt-icon",
    "@pinia/nuxt",
    "@nuxtjs/plausible",
    "@nuxtjs/tailwindcss",
    "@nuxt/devtools",
    "@nuxt/image",
  ],
  imports: {
    dirs: ["./stores", "./zod", "composables/*/index.ts"],
  },
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  runtimeConfig: {
    public: {
      meilisearch: {
        host: "adsfaf",
        apiKey: "adfaf",
      },
      baseUrl: "",
    },
    jwtSecret: "",
    dbUrl: "",
    dbToken: "",
  },
  plausible: {
    domain: "sukkart.com",
    apiHost: "https://analytics.sukk.art",
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "page", mode: "out-in" },
  },

  typescript: {
    shim: false,
  },
  build: {
    transpile: ["vue-sonner"],
  },
  image: {
    provider: "imagekit",
    imagekit: {
      baseURL: "https://ik.imagekit.io/j4oeb7okg",
    },
  },
});
