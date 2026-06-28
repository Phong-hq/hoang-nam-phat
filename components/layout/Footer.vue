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
              <li class="flex items-start gap-2.5">
                <svg class="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-gray-400 leading-relaxed">745/62/2 Quang Trung, P. An Hội Tây</span>
              </li>
              <li class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:0937813788" class="text-gray-300 hover:text-white transition-colors">
                  0937.813.788
                </a>
              </li>
              <li class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@hoangnamphat.vn" class="text-gray-300 hover:text-white transition-colors">
                  info@hoangnamphat.vn
                </a>
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
            <div class="space-y-3">
              <a
                href="tel:0937813788"
                class="flex items-center gap-3 bg-gray-700/50 hover:bg-gray-700 rounded-xl px-3.5 py-3 transition-colors group"
              >
                <div class="bg-green-600 rounded-full p-2 flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p class="text-[11px] text-gray-400 leading-none mb-0.5">Gọi ngay</p>
                  <p class="text-white text-sm font-bold leading-tight">0937.813.788</p>
                </div>
              </a>
              <a
                href="https://zalo.me/0937813788"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 bg-gray-700/50 hover:bg-gray-700 rounded-xl px-3.5 py-3 transition-colors group"
              >
                <div class="bg-blue-600 rounded-full px-3 py-2 flex-shrink-0">
                  <span class="text-white text-xs font-extrabold">Zalo</span>
                </div>
                <div>
                  <p class="text-[11px] text-gray-400 leading-none mb-0.5">Nhắn tin Zalo</p>
                  <p class="text-white text-sm font-bold leading-tight">0937.813.788</p>
                </div>
              </a>
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
</script>
