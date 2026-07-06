<template>
  <section class="bg-[#0F172A] py-4">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <div class="flex gap-3 lg:h-[440px]">

        <!-- Category menu with flyout -->
        <div
          class="w-[230px] flex-shrink-0 hidden lg:flex flex-col relative z-30"
          @mouseleave="hoveredCat = null"
        >
          <div class="bg-white rounded-xl overflow-hidden flex flex-col h-full shadow-lg">
            <div class="bg-primary text-white text-sm font-bold px-4 py-3 flex items-center gap-2 flex-shrink-0">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Danh mục sản phẩm
            </div>
            <ul class="flex-1 py-1 overflow-hidden">
              <li v-for="cat in categoryStore.categories" :key="cat.id" @mouseenter="hoveredCat = cat">
                <NuxtLink
                  :to="`/products?category=${cat.slug}`"
                  :class="[
                    'flex items-center justify-between px-3.5 py-[9px] text-sm transition-colors',
                    hoveredCat?.id === cat.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-50',
                  ]"
                >
                  <span class="flex items-center gap-2 min-w-0">
                    <span class="w-4 h-4 flex-shrink-0 flex items-center justify-center text-primary">
                      <img v-if="cat.icon" :src="cat.icon" alt="" class="w-full h-full object-contain" />
                      <span v-else v-html="defaultCategoryIcon" />
                    </span>
                    <span class="truncate font-medium">{{ cat.name }}</span>
                  </span>
                  <svg
                    class="w-3.5 h-3.5 flex-shrink-0"
                    :class="hoveredCat?.id === cat.id ? 'opacity-80' : 'opacity-25'"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Flyout -->
          <Transition
            enter-active-class="transition-all duration-150"
            enter-from-class="opacity-0 translate-x-1"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition-all duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="hoveredCat"
              class="absolute top-0 left-full z-50 ml-1 w-72 bg-white shadow-2xl rounded-xl border border-gray-100 p-4"
            >
              <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span class="w-4 h-4 flex items-center justify-center text-primary">
                  <img v-if="hoveredCat.icon" :src="hoveredCat.icon" alt="" class="w-full h-full object-contain" />
                  <span v-else v-html="defaultCategoryIcon" />
                </span>
                {{ hoveredCat.name }}
              </p>
              <div class="grid grid-cols-1 gap-0.5">
                <NuxtLink
                  v-for="brand in hoveredCat.brands"
                  :key="brand.id"
                  :to="`/products?category=${hoveredCat.slug}&brand=${slugify(brand.name)}`"
                  class="flex items-center gap-1.5 px-2.5 py-2 text-sm text-gray-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-primary/30 flex-shrink-0" />
                  <span class="truncate">{{ brand.name }}</span>
                </NuxtLink>
              </div>
              <div class="border-t border-gray-100 mt-3 pt-3">
                <NuxtLink
                  :to="`/products?category=${hoveredCat.slug}`"
                  class="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
                >
                  Xem tất cả {{ hoveredCat.name }}
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Banner grid -->
        <div class="flex-1 min-w-0 grid grid-cols-3 gap-2.5">

          <!-- Main left column: 1 large + 2 small -->
          <div class="col-span-2 flex flex-col gap-2.5">

            <!-- Large hero banner -->
            <NuxtLink
              to="/products"
              class="flex-1 relative rounded-xl overflow-hidden group min-h-[200px]"
              style="background: linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%);"
            >
              <!-- Grid pattern overlay -->
              <div
                class="absolute inset-0 opacity-[0.07]"
                style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 24px 24px;"
              />
              <!-- Accent glow -->
              <div class="absolute right-0 top-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <!-- Content -->
              <div class="absolute inset-0 flex flex-col justify-center px-7 text-white z-10">
                <span class="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4 backdrop-blur-sm">
                  <span class="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Hàng chính hãng · Bảo hành toàn quốc
                </span>
                <h1 class="text-2xl xl:text-3xl font-extrabold leading-tight mb-2 tracking-tight">
                  Thiết Bị Mạng<br />
                  <span class="text-primary">& Camera</span> Chính Hãng
                </h1>
                <p class="text-sm text-white/60 mb-5 leading-relaxed">
                  Router Mikrotik · Camera Hikvision<br />
                  Switch Cisco · WiFi TP-Link
                </p>
                <span class="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-lg w-fit group-hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                  Khám phá ngay
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
              <!-- Stats strip -->
              <div class="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-white/5 backdrop-blur-sm px-7 py-3 flex gap-6 z-10">
                <div v-for="stat in stats" :key="stat.label" class="text-center">
                  <div class="text-white font-extrabold text-lg leading-none">{{ stat.value }}</div>
                  <div class="text-white/50 text-[10px] mt-0.5">{{ stat.label }}</div>
                </div>
              </div>
            </NuxtLink>

            <!-- Two small banners -->
            <div class="flex gap-2.5 h-[120px] flex-shrink-0">
              <NuxtLink
                to="/products?category=camera"
                class="flex-1 relative rounded-xl overflow-hidden group"
                style="background: linear-gradient(135deg, #7C3AED, #5B21B6);"
              >
                <div class="absolute inset-0 bg-black/10" />
                <div class="absolute inset-0 flex flex-col justify-end p-4 text-white z-10">
                  <p class="text-[10px] text-purple-200 font-medium mb-0.5 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                    Ưu đãi hôm nay
                  </p>
                  <p class="font-extrabold text-sm leading-tight">Camera Hikvision</p>
                  <p class="text-[10px] text-purple-200 mt-0.5">Giảm đến 20% · Bảo hành 2 năm</p>
                </div>
              </NuxtLink>
              <NuxtLink
                to="/products?category=router"
                class="flex-1 relative rounded-xl overflow-hidden group"
                style="background: linear-gradient(135deg, #0891B2, #0E7490);"
              >
                <div class="absolute inset-0 bg-black/10" />
                <div class="absolute inset-0 flex flex-col justify-end p-4 text-white z-10">
                  <p class="text-[10px] text-cyan-200 font-medium mb-0.5 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>
                    Mới nhập kho
                  </p>
                  <p class="font-extrabold text-sm leading-tight">Router Mikrotik</p>
                  <p class="text-[10px] text-cyan-200 mt-0.5">CCR2004 · RB4011 · hEX S</p>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Right column: 4 stacked banners -->
          <div class="flex flex-col gap-2.5">
            <NuxtLink
              v-for="b in sideBanners"
              :key="b.label"
              :to="b.href"
              class="flex-1 relative rounded-xl overflow-hidden group hover:opacity-90 transition-opacity"
              :style="`background: ${b.bg};`"
            >
              <div class="absolute inset-0 bg-black/20" />
              <div class="absolute inset-0 flex flex-col justify-end px-3.5 py-3 text-white z-10">
                <p class="text-[10px] text-white/60 font-medium leading-none mb-0.5 flex items-center gap-1">
                  <span class="w-3 h-3 flex items-center justify-center" v-html="b.tagIcon" />
                  {{ b.tagText }}
                </p>
                <p class="font-bold text-xs leading-snug">{{ b.label }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCategoryStore } from '~/stores/category.store'
import type { ProductCategory } from '~/types'

const categoryStore = useCategoryStore()
const hoveredCat = ref<ProductCategory | null>(null)

const defaultCategoryIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>`

onMounted(() => {
  if (!categoryStore.categories.length) categoryStore.fetchCategories()
})

const stats = [
  { value: '15+', label: 'Năm kinh nghiệm' },
  { value: '50K+', label: 'Sản phẩm' },
  { value: '200K+', label: 'Khách hàng' },
  { value: '24/7', label: 'Hỗ trợ kỹ thuật' },
]

const sideBanners = [
  {
    label: 'Switch Cisco & Ruijie',
    tagText: 'Bán chạy',
    tagIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" /></svg>`,
    href: '/products?category=switch',
    bg: 'linear-gradient(135deg, #1D4ED8, #1E40AF)',
  },
  {
    label: 'NAS Synology & QNAP',
    tagText: 'Lưu trữ NAS',
    tagIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>`,
    href: '/products?category=nas',
    bg: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
  },
  {
    label: 'Laptop Dell · HP · Lenovo',
    tagText: 'Chính hãng',
    tagIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" /></svg>`,
    href: '/products?category=laptop',
    bg: 'linear-gradient(135deg, #334155, #1E293B)',
  },
  {
    label: 'Phụ kiện & Cáp mạng',
    tagText: 'Đa dạng',
    tagIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>`,
    href: '/products?category=accessories',
    bg: 'linear-gradient(135deg, #D97706, #B45309)',
  },
]
</script>
