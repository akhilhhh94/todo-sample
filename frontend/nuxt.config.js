export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'myapp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],
  loading: {
    color: '#3280ce',
    height: '8px'
  },

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
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000/api/'
  },
  toast: {
    position: 'top-right',
    duration: 450,
    theme: "outline",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  auth: {
    cookie: {
      options: {
        expires: 1
      }
    },
    strategies: {
      local: {
        token: {
          property: 'data.token',
          required: true,
          type: 'Bearer'
        },
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            property: 'data.token'
          },
          logout: { url: '/logout', method: 'get' },
          user: { url: '/todo', method: 'get', property: false, propertyName: false }
        },
        user: {
          property: 'data',
          autoFetch: true
        },
      }
    },
    rewriteRedirects: false,

    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      // home: '/'
    }
  },

  router: {
    middleware: ['auth']
  },
  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
   
  }
}
