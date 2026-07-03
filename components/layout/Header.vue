<template>
  <div class="sticky top-0 z-40 shadow-md">

    <!-- Top announcement bar -->
    <div class="bg-[#8b0000] text-white py-1.5 text-sm">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <span class="hidden sm:block text-red-200">
          Giải pháp kết nối toàn diện cho doanh nghiệp &amp; gia đình
        </span>
        <a
          href="tel:0937813788"
          class="flex items-center gap-1.5 font-semibold hover:text-yellow-300 transition-colors ml-auto"
        >
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          0937.813.788 – Mua hàng online
        </a>
      </div>
    </div>

    <!-- Main header: logo + search + cart + phone -->
    <header class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-1 flex items-center justift-center gap-4">

        <!-- Logo image -->
        <NuxtLink to="/" class="flex-shrink-0">
          <img
            src="~/assets/images/logo.png"
            alt="Hoàng Nam Phát"
            class="h-24 w-auto object-contain"
          />
        </NuxtLink>

        <!-- Search bar -->
        <div class="flex-1 min-w-0 max-w-2xl mx-auto">
          <div class="flex rounded-lg overflow-hidden border border-gray-300 focus-within:border-primary transition-colors">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, thương hiệu..."
              class="flex-1 min-w-0 px-4 py-2.5 text-base outline-none text-gray-700 bg-white placeholder:text-gray-400"
            />
            <button
              class="bg-primary text-white px-5 flex-shrink-0 flex items-center justify-center hover:bg-primary/90 transition-colors"
              aria-label="Tìm kiếm"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Right: Cart + Hotline -->
        <div class="flex items-center gap-5 flex-shrink-0">

          <!-- Cart -->
          <NuxtLink to="/cart" class="flex items-center gap-2 group">
            <div class="relative">
              <svg
                class="w-7 h-7 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                0
              </span>
            </div>
            <div class="hidden lg:block text-left">
              <p class="text-xs text-gray-400 leading-none">Giỏ hàng</p>
              <p class="text-base font-bold text-gray-800 leading-tight">0₫</p>
            </div>
          </NuxtLink>

          <!-- Hotline -->
          <a href="tel:0937813788" class="hidden xl:flex items-center gap-2.5">
            <div class="bg-primary/10 rounded-full p-2">
              <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <div class="text-left">
              <p class="text-xs text-gray-400 leading-none">Hotline hỗ trợ</p>
              <p class="text-base font-bold text-primary leading-tight">0937.813.788</p>
            </div>
          </a>

        </div>
      </div>
    </header>

    <!-- Main site navigation -->
    <nav class="bg-primary" aria-label="Điều hướng chính">
      <div class="container mx-auto px-4">
        <ul class="flex items-center overflow-x-auto justify-center">
          <li v-for="item in navItems" :key="item.label" class="relative">
            <NuxtLink
              :to="item.href"
              class="text-white/85 hover:text-white hover:bg-white/15 px-5 py-2.5 text-base font-medium whitespace-nowrap block transition-colors"
              :exact-active-class="item.exact ? 'text-white bg-white/20 font-bold' : ''"
              active-class="text-white bg-white/20 font-bold"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

  </div>
</template>

<script setup lang="ts">
const navItems = [
  { label: 'Trang chủ',  href: '/',          exact: true },
  { label: 'Sản phẩm',   href: '/products',  exact: false },
  { label: 'Giải pháp',  href: '/solutions', exact: false },
  { label: 'Tin tức',    href: '/news',      exact: false },
  { label: 'Giới thiệu', href: '/about',     exact: false },
  { label: 'Liên hệ',    href: '/contact',   exact: false },
]
</script>
