import projectConfig from './project.config';
const dev = process.env.NODE_ENV !== 'production';

const config = { dev, ...projectConfig };

export default {
  globalName: config.name,
  target: 'server', // default is 'server'
  ssr: false, // SPA behaviour, only client-side
  components: true,
  server: {
    port: 8000, // default: 3000
    host: 'localhost', // default: localhost
  },
  router: {
    trailingSlash: true,
  },
  publicRuntimeConfig: { ...config },
  render: {
    static: {
      // Add CORS header to static files.
      setHeaders(res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        );
      },
    },
  },
  generate: {
    fallback: true,
    exclude: [/^\/objekt/],
  },
  build: {
    analyze: false,
    extend(config) {
      // Find the rule which contains a assets file extension
      const assetsLoader = config.module.rules.find((rule) =>
        rule.test.test('.png')
      );

      // Overwrite the test regex and add `pdf`
      assetsLoader.test = /\.(png|jpe?g|gif|svg|webp|pdf)$/i;

      return config;
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyElements: true,
      },
    },
    loaders: {
      sass: { sourceMap: false },
      scss: { sourceMap: false },
      vue: { cacheBusting: false },
    },
  },
  buildModules: [
    [
      '@nuxtjs/style-resources',
      {
        // your settings here
        sass: ['~assets/scss/defs/_all.sass'],
        scss: [],
        hoistUseStatements: true, // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
      },
    ],
  ],
  modules: [
    [
      'nuxt-i18n',
      {
        locales: [{ code: 'cs', iso: 'cs-CZ', file: 'cs-CZ.js', dir: 'ltr' }],
        lazy: true,
        langDir: '~lang/',
        defaultLocale: 'cs',
        vueI18n: {
          fallbackLocale: 'cs',
        },
      },
    ],
    [
      '@nuxtjs/firebase',
      {
        config: config.firebaseConfig.apiConfig,
        services: {
          firestore: true, // Just as example. Can be any other service.
          storage: true,
          database: true,
          auth: true,
        },
      },
    ],
  ],
  firestore: {
    memoryOnly: false, // default
    chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
    enablePersistence: true,
    emulatorPort: 8080,
    emulatorHost: 'localhost',
    settings: {
      // Firestore Settings - currently only works in SPA mode
    },
  },
  auth: {
    persistence: 'local', // default
    initialize: {
      onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
      onAuthStateChangedAction: 'onAuthStateChangedAction',
      subscribeManually: false,
    },
    ssr: false, // default
    emulatorPort: 9099,
    emulatorHost: 'http://localhost',
  },
  content: {
    // Options
  },
  css: ['@/assets/scss/main.sass'],
  head: {
    title: projectConfig.globalName,
    htmlAttrs: {
      lang: 'cs',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
};
