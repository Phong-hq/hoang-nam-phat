<template>
  <footer>

    <!-- Floating contact buttons -->
    <div class="fixed bottom-6 right-5 z-50 flex flex-col gap-3">
      <a
        href="https://zalo.me/0937813788"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat Zalo"
        class="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white text-xs font-extrabold hover:scale-110 transition-all"
      >
        Zalo
      </a>
      <a
        href="tel:0937813788"
        title="Gọi điện"
        class="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-all"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </a>
    </div>

    <!-- Main footer body -->
    <div class="bg-gray-800 text-gray-300 pt-10 pb-6">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          <!-- Company info -->
          <div>
            <div class="mb-4">
              <p class="text-white text-xl font-extrabold tracking-tight">Hoàng Nam Phát</p>
              <p class="text-gray-500 text-xs mt-0.5">Thiết bị mạng &amp; Camera chính hãng</p>
            </div>
            <ul class="space-y-2.5 text-sm">
              <li v-for="item in contactInfo" :key="item.text"
                :class="['flex gap-2.5', item.align]">
                <svg class="w-4 h-4 text-gray-500 flex-shrink-0"
                  :class="{ 'mt-0.5': item.align === 'items-start' }"
                  :fill="item.icon.mode === 'fill' ? 'currentColor' : 'none'"
                  :viewBox="item.icon.viewBox"
                  :stroke="item.icon.mode === 'stroke' ? 'currentColor' : undefined"
                  :stroke-width="item.icon.mode === 'stroke' ? 2 : undefined">
                  <path v-for="(d, i) in item.icon.paths" :key="i" :d="d"
                    :stroke-linecap="item.icon.mode === 'stroke' ? 'round' : undefined"
                    :stroke-linejoin="item.icon.mode === 'stroke' ? 'round' : undefined" />
                </svg>
                <a v-if="item.href" :href="item.href" class="text-gray-300 hover:text-white transition-colors">
                  {{ item.text }}
                </a>
                <span v-else class="text-gray-400 leading-relaxed">{{ item.text }}</span>
              </li>
            </ul>
          </div>

          <!-- Product categories -->
          <div>
            <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-4">Sản phẩm</h4>
            <ul class="space-y-2 text-sm">
              <li v-for="link in productLinks" :key="link.label">
                <NuxtLink :to="link.href" class="text-gray-400 hover:text-white transition-colors">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-4">Hỗ trợ</h4>
            <ul class="space-y-2 text-sm">
              <li v-for="link in supportLinks" :key="link.label">
                <NuxtLink :to="link.href" class="text-gray-400 hover:text-white transition-colors">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact CTA -->
          <div>
            <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-4">Liên hệ</h4>
            <div class="space-y-4">

              <!-- Social icons -->
              <div class="flex items-center gap-3">
                <a v-for="social in socialLinks" :key="social.label"
                  :href="social.href" target="_blank" rel="noopener noreferrer" :title="social.label"
                  :class="[
                    'flex items-center justify-center text-gray-400 hover:text-white transition-colors',
                    social.type === 'text' ? 'h-9 px-1 text-sm font-extrabold tracking-tight' : 'w-9 h-9'
                  ]">
                  <template v-if="social.type === 'text'">{{ social.label }}</template>
                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path :d="social.icon" />
                  </svg>
                </a>
              </div>

              <!-- Facebook embed -->
              <div class="fb-page block h-[200px] overflow-hidden rounded-lg"
                data-href="https://www.facebook.com/thietbimanghoangnamphat/?ref=embed_page#"
                data-tabs=""
                data-width="380"
                data-height="250"
                data-small-header="true"
                data-adapt-container-width="true"
                data-hide-cover="true"
                data-show-facepile="true">
              </div>

              

            </div>
          </div>

        </div>

        <!-- Copyright bar -->
        <div class="border-t border-gray-700 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p class="text-xs text-gray-500 text-center sm:text-left">
            © {{ new Date().getFullYear() }} Công Ty TNHH Công Nghệ Hoàng Nam Phát. Tất cả quyền được bảo lưu.
          </p>
          <div class="flex items-center gap-4 text-xs text-gray-600">
            <NuxtLink to="/warranty" class="hover:text-gray-400 transition-colors">Chính sách bảo hành</NuxtLink>
            <NuxtLink to="/returns" class="hover:text-gray-400 transition-colors">Đổi trả</NuxtLink>
          </div>
        </div>
      </div>
    </div>

  </footer>
</template>

<script setup lang="ts">
const contactInfo = [
  {
    href: null,
    text: '745/62/2 Quang Trung, Phường An Hội Tây, Thành Phố Hồ Chí Minh',
    align: 'items-start',
    icon: {
      viewBox: '0 0 24 24', mode: 'stroke',
      paths: [
        'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
        'M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      ],
    },
  },
  {
    href: 'tel:0937813788',
    text: '09378.13788 - 0964.526.281',
    align: 'items-center',
    icon: {
      viewBox: '0 0 20 20', mode: 'fill',
      paths: [
        'M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z',
      ],
    },
  },
  {
    href: 'mailto:info.hoangnamphat@gmail.com',
    text: 'info.hoangnamphat@gmail.com',
    align: 'items-center',
    icon: {
      viewBox: '0 0 24 24', mode: 'stroke',
      paths: [
        'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      ],
    },
  },
  {
    href: null,
    text: 'MST: 0319225382',
    align: 'items-center',
    icon: {
      viewBox: '0 0 24 24', mode: 'stroke',
      paths: [
        'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      ],
    },
  },
  // {
  //   href: null,
  //   text: 'Giờ làm việc: 8:00 - 18:00',
  //   align: 'items-center',
  //   icon: {
  //     viewBox: '0 0 24 24', mode: 'stroke',
  //     paths: [
  //       'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  //     ],
  //   },
  // },
]

const productLinks = [
  { label: 'Thiết bị Router', href: '/products?category=router' },
  { label: 'WiFi / Access Point', href: '/products?category=wifi' },
  { label: 'Switch & Thiết bị mạng', href: '/products?category=switch' },
  { label: 'Camera quan sát', href: '/products?category=camera' },
  { label: 'NAS Storage', href: '/products?category=nas' },
  { label: 'Laptop & Máy tính', href: '/products?category=laptop' },
]

const supportLinks = [
  { label: 'Giới thiệu', href: '/about' },
  { label: 'Liên hệ', href: '/contact' },
  { label: 'Chính sách bảo hành', href: '/warranty' },
  { label: 'Hướng dẫn mua hàng', href: '/guide' },
  { label: 'Chính sách đổi trả', href: '/returns' },
  { label: 'Tin tức & Thủ thuật', href: '/blog' },
]

const socialLinks = [
  { label: 'Zalo', href: '#', type: 'text' },
  {
    label: 'TikTok', href: '#', type: 'svg',
    icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  {
    label: 'YouTube', href: '#', type: 'svg',
    icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    label: 'Instagram', href: '#', type: 'svg',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  },
]
</script>
