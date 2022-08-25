export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/mixins.js' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxt/http'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Environment Variables
  env: {
    strapiAPI: process.env.STRAPI_API || 'http://localhost:1337/api/',
    strapiURL: process.env.STRAPI_URL || 'http://localhost:1337',
  },

  // nuxt/http https://http.nuxtjs.org/API/options
  http: {
    baseURL: process.env.STRAPI_API || 'http://localhost:1337/api/',
    browserBaseURL: process.env.STRAPI_API || 'http://localhost:1337/api/',
  },

  // pwa config
  pwa: {
    workbox: {
      /* workbox options */
      runtimeCaching: [
        {
          urlPattern: 'https://res.cloudinary.com/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
        },
        {
          urlPattern: 'https://desolate-taiga-65056.herokuapp.com/.*',
          handler: 'networkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
        },
      ],
    },
  },
}
