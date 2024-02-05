import { getIconCollections } from '@egoist/tailwindcss-icons'

export default defineNuxtConfig({
  ssr: false,
  spaLoadingTemplate: 'spa-loading-template.html',
  colorMode: {
    preference: 'light'
  }, 
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      debug: "",
      clientId: "",
      redirectUri: "",
      authUri: "",
      tokenUri: "",
      apiBaseUri: "",
      baseURL: process.env.API_URL_BROWSER,
    },
  },

  build: {
    // You can extend webpack config here
    transpile: ["vue-bundle"],
  },
  app: {
    head: {
      title: process.env.APP_NAME,
    },
  },
  css: ["~/assets/css/main.css"],
  // postcss: {
  //     plugins: {
  //         // tailwindcss: {},
  //         autoprefixer: {},
  //     },
  // },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    '@pinia/nuxt'
  ],
  plugins: [
    "~/plugins/calendar",
    "~/plugins/error-handler"
  ],
  ui: {
    icons: {
      // might solve stretch bug on generate, see https://github.com/egoist/tailwindcss-icons/issues/23
      // extraProperties: {
      //   'mask-size': 'contain',
      //   'mask-position': 'center'
      // },        
      collections: {
        custom: {
          icons: {
            "bars-arrow": {
              // svg body
              body: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 2.75C2 2.33579 2.33579 2 2.75 2H12.25C12.6642 2 13 2.33579 13 2.75C13 3.16421 12.6642 3.5 12.25 3.5H2.75C2.33579 3.5 2 3.16421 2 2.75Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 6.25C2 5.83579 2.33579 5.5 2.75 5.5H8.25C8.66421 5.5 9 5.83579 9 6.25C9 6.66421 8.66421 7 8.25 7H2.75C2.33579 7 2 6.66421 2 6.25ZM2 9.75C2 9.33579 2.33579 9 2.75 9H6.25C6.66421 9 7 9.33579 7 9.75C7 10.1642 6.66421 10.5 6.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.21967 11.4372C9.51256 11.1443 9.98744 11.1443 10.2803 11.4372L12 13.1569L13.7197 11.4372C14.0126 11.1443 14.4874 11.1443 14.7803 11.4372C15.0732 11.7301 15.0732 12.205 14.7803 12.4979L12.5303 14.7479C12.2374 15.0408 11.7626 15.0408 11.4697 14.7479L9.21967 12.4979C8.92678 12.205 8.92678 11.7301 9.21967 11.4372Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.7803 9.53033C14.4874 9.82322 14.0126 9.82322 13.7197 9.53033L12 7.81066L10.2803 9.53033C9.98744 9.82322 9.51256 9.82322 9.21967 9.53033C8.92678 9.23744 8.92678 8.76256 9.21967 8.46967L11.4697 6.21967C11.7626 5.92678 12.2374 5.92678 12.5303 6.21967L14.7803 8.46967C15.0732 8.76256 15.0732 9.23744 14.7803 9.53033Z"/></svg>',// svg width and height, optional
              width: 20,
              height: 20
            },
            'arrow-left': {
              // svg body
              body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />',
              // svg width and height, optional
              width: 24,
              height: 24
            }              
          }
        },
        ...getIconCollections(['heroicons', 'mdi'])
      }
    }
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
});
