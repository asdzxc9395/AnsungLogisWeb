export default defineNuxtConfig({
  ssr: false,
  colorMode: {
    preference: 'light'
  },  
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
        debug: '',
        clientId: '',
        redirectUri: '',
        authUri: '',
        tokenUri: '',
        apiBaseUri: '',
        baseURL: process.env.API_URL_BROWSER,
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
  css: ['~/assets/css/main.css'],
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
  plugins: [
    "~/plugins/calendar"
  ],
  ui: {
    icons: ['mdi']
  }
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
