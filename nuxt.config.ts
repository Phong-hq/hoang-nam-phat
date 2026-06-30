// Nuxt 3 Enterprise Configuration
// Centralizes all module, SSR, SEO, performance, and build settings
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  ssr: true,

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Hoang Nam Phat - Thiet bi cong nghe chinh hang',
      titleTemplate: '%s | Hoang Nam Phat',
      meta: [
        { name: 'description', content: 'Mua sam thiet bi cong nghe chinh hang tai Hoang Nam Phat.' },
        { name: 'keywords', content: 'dien thoai, laptop, tablet, phu kien, chinh hang' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#ffffff' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Hoang Nam Phat' },
        { property: 'og:image', content: '/images/og-default.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@hoangnamphat' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        {
          src: 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v23.0',
          async: true,
          defer: true,
          crossorigin: 'anonymous' as const,
        },
      ],
    },
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
  ],

  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
      },
    ],
    sitemap: '/sitemap_index.xml',
  },

  sitemap: {
    sitemaps: {
      products: {
        sources: ['/api/__sitemap__/products'],
      },
      pages: {
        sources: ['/api/__sitemap__/pages'],
      },
      categories: {
        sources: ['/api/__sitemap__/categories'],
      },
    },
  },

  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpeg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/products/**': { ssr: true, headers: { 'cache-control': 's-maxage=3600' } },
    '/admin/**': { ssr: false },
    '/api/**': { cors: true },
  },

  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://hoangnamphat.vn',
      siteName: 'Hoang Nam Phat',
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables" as *;',
        },
      },
    },
  },

  experimental: {
    payloadExtraction: true,
    treeshakeClientOnly: true,
    componentIslands: true,
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      failOnError: false,
      // crawlLinks: true,
      // routes: ['/sitemap.xml', '/robots.txt'],
    },
  },

  css: ['~/assets/scss/main.scss', 'swiper/css', 'swiper/css/navigation'],

  build: {
    transpile: ['swiper'],
  },
})
