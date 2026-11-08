// Nuxt 3 Enterprise Configuration
// Centralizes all module, SSR, SEO, performance, and build settings
import { SITE_URL, DEFAULT_OG_IMAGE } from './constants'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  // Bind the dev server to IPv4 -- on Windows `localhost` can resolve to the
  // IPv6 loopback (::1), and nuxt-site-config's origin detection doesn't
  // handle bracketed IPv6 hosts, which corrupts sitemap <loc> URLs
  // (e.g. `http://[:3000/products/...`).
  devServer: {
    host: process.env.NUXT_HOST || '127.0.0.1',
  },

  ssr: true,

  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Thiết Bị Mạng & Camera Chính Hãng',
      meta: [
        { name: 'description', content: 'Hoàng Nam Phát cung cấp router, switch, WiFi, camera, tổng đài IP và thiết bị mạng chính hãng; giá tốt, tư vấn tận tâm, giao hàng toàn quốc.' },
        { name: 'keywords', content: 'thiết bị mạng chính hãng, router, switch, wifi, camera, tổng đài ip' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#ffffff' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Hoàng Nam Phát' },
        { property: 'og:image', content: `${SITE_URL}${DEFAULT_OG_IMAGE}` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@hoangnamphat' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap',
        },
      ],
      // Facebook SDK is NOT loaded here: it is ~250KB of JS that blocked the main
      // thread on every page. Footer.vue injects it only when the Page plugin
      // scrolls into view.
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

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://hoangnamphat.vn',
  },

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
      categories: {
        sources: ['/api/__sitemap__/categories'],
      },
    },
  },

  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpeg'],
    // Ảnh sản phẩm nằm trên server ERP. Domain phải có trong danh sách này thì
    // <NuxtImg> mới resize + đổi sang webp qua /_ipx; nếu thiếu, nó trả nguyên
    // file gốc (có ảnh PNG 2MB hiển thị trong ô 300px).
    domains: ['hoangnamphat-be.captain2.thanhtoan24on7.xyz'],
    // Ảnh đã resize được trình duyệt giữ 1 năm (ảnh mới upload lên ERP có tên file
    // mới nên URL cũng mới). Mặc định IPX chỉ cho cache 5 phút.
    ipx: {
      http: { maxAge: 60 * 60 * 24 * 365 },
      fs: { maxAge: 60 * 60 * 24 * 365 },
    },
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
    // Trang chủ giống nhau với mọi khách (giỏ hàng nằm ở localStorage, không có
    // dữ liệu riêng từng người trong HTML) -> cache HTML 5 phút trên server thay vì
    // gọi API ERP ở mỗi lượt truy cập (TTFB ~1.4s). Hết 5 phút vẫn trả bản cũ ngay
    // và làm mới ở nền, nên khách không bao giờ phải chờ.
    '/': { swr: 300 },
    '/products/**': { ssr: true, headers: { 'cache-control': 's-maxage=3600' } },
    '/admin/**': { ssr: false },
    '/api/**': { cors: true },
  },

  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      erpApiBaseUrl: process.env.NUXT_PUBLIC_ERP_API_BASE_URL || 'https://hoangnamphat-be.captain2.thanhtoan24on7.xyz/',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://hoangnamphat.vn',
      siteName: 'Hoàng Nam Phát',
      // Mã đo lường -- để trống thì không nạp (xem plugins/analytics.client.ts).
      gtmId: process.env.NUXT_PUBLIC_GTM_ID || '',
      ga4Id: process.env.NUXT_PUBLIC_GA4_ID || '',
      fbPixelId: process.env.NUXT_PUBLIC_FB_PIXEL_ID || '',
      // Bật (=true) trên bản staging / bản test để Google không index trùng với site thật.
      noIndex: process.env.NUXT_PUBLIC_NO_INDEX === 'true',
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

  css: ['~/assets/scss/main.scss', 'swiper/css', 'swiper/css/navigation', 'swiper/css/pagination'],

  build: {
    transpile: ['swiper'],
  },
})
