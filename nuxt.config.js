import projectConfig from './project.config';
import * as prochazkyConfig from './prochazky.config';

const dev = process.env.NODE_ENV !== 'production';

const config = { dev, ...projectConfig, ...prochazkyConfig };

export default {
  globalName: config.name,
  target: 'static', // default is 'server'
  ssr: true,
  components: true,
  server: {
    port: 8000, // default: 3000
    host: 'localhost', // default: localhost
  },
  router: {
    trailingSlash: true,
  },
  publicRuntimeConfig: config,
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
    modules: [
      ['nuxt-i18n', {
        locales: [
          {code: 'cs', iso: 'cs-CZ', file: 'cs-CZ.js', dir: 'ltr'}
        ],
        lazy: true,
        langDir: '~lang/',
        defaultLocale: 'cs',
        vueI18n: {
          fallbackLocale: 'cs',
        },
      }],
      ['@nuxtjs/firebase', {
        config: config.firebaseConfig.apiConfig,
        services: {
          firestore: true, // Just as example. Can be any other service.
          storage: true,
          database: true,
        }
      }],
    ],
    firestore: {
      memoryOnly: false, // default
      chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
      enablePersistence: true,
      emulatorPort: 8080,
      emulatorHost: 'localhost',
      settings: {
        // Firestore Settings - currently only works in SPA mode
      }
    },
    content: {
      // Options
    },
    css: [
      '~assets/scss/main.sass',
    ],
    styleResources: {
      sass: [
        '~bulma/sass/utilities/all',
      ]
    },
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
            content: 'my website description'
          }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
      },
};
