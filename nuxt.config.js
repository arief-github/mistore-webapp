export default {
  // Rendering Mode SSR
  ssr: true,
  // Target Deployment
  target: 'server',
  loading: {
    color: 'white',
    height: '5px'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ecommerce-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/logo.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'}
    ],
    script: [
      { src: '/js/coreui.bundle.min.js' },
      { src: 'https://app.sandbox.midtrans.com/snap/snap.js', 'dataclient-key': 'paste_client_Key_midtrans_disini'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.min.css',
    '@/assets/css/custom.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/chart.js', mode: 'client' },
    { src: '~/plugins/mixins.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    'vue-sweetalert2/nuxt',
  ],
  auth: {
    strategies: {
      //strategy "admin"
      admin: {
        scheme: 'local',
        token: {
          property: 'token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: '/api/admin/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/api/admin/logout',
            method: 'post'
          },
          user: {
            url: '/api/admin/user',
            method: 'get',
            propertyName: 'user'
          }
        },
      },
      //strategy "customer"
      customer: {
        scheme: 'local',
        token: {
          property: 'token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: '/api/customer/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/api/customer/logout',
            method: 'post'
          },
          user: {
            url: '/api/customer/user',
            method: 'get',
            propertyName: 'user'
          }
        },
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  axios: {
    baseURL: 'http://127.0.0.1:8000'
  },
}
