export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
        debug: '',
        clientId: '',
        redirectUri: '',
        authUri: '',
        tokenUri: '',
        apiBaseUri: '',
    }
  },
  build: {
    // You can extend webpack config here
    transpile: ['vue-bundle'],
  },
  app: {
    head: {
        title: process.env.APP_NAME
    }
  },
  // css: ['@/assets/css/main.css'],
  // postcss: {
  //     plugins: {
  //         // tailwindcss: {},
  //         autoprefixer: {},
  //     },
  // },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    '@pinia/nuxt',
],  
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
