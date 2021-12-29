export default {
  //serverMiddleware
  serverMiddleware: [{ path: '/api', handler: '~/api/auth.js' }],
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Njs',
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
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/content',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:3000/api',
  },
  auth: {
    strategies: {
      local: {
        // token: {
        //   property: 'token', //property name that the Back-end sends for you as a access token for saving on localStorage and cookie of user browser
        //   global: true,
        //   required: true,
        //   type: 'Bearer',
        // },
        // user: {
        //   property: 'user',
        //   autoFetch: true,
        // },
        endpoints: {
          login: {
            url: 'login',
            method: 'post',
            propertyName: 'token',
          },
          user: {
            url: 'me',
            method: 'get',
            propertyName: 'user',
          },
          register: {
            method: 'post',
            url: 'register',
          },
          update: {
            method: 'post',
            url: 'update',
          },
          logout: false,
        },
      },
    },
    redirect: {
      login: '/profile',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  //google front
  googleFonts: {
    families: {},
  },
  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true,
  },
}
