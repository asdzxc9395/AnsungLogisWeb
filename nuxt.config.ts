export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    secretToken: "",
    public: {
      googleAnalyticsId: "",
    },
  },
  build: {
    // You can extend webpack config here
    transpile: ['vue-bundle'],
  },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  tailwindcss: {
    config: './tailwindcss.config.js',
  },
  // modules: ["@nuxt/ui", "@nuxtjs/eslint-module"],
  // components: [
  //   {
  //     path: '~/components',
  //     pathPrefix: true
  //   },
  //   {
  //     path: '~/components/web',
  //     perfix: 'Special',
  //     extensions: ['.vue']
  //   },
  // ],
})
