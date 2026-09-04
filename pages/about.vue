<template>
  <div class="bg-[#EEF2F7] min-h-screen">

    <!-- Page banner -->
    <div class="bg-white border-b border-gray-200 py-8">
      <div class="container mx-auto px-4">
        <nav class="text-sm text-gray-400 mb-3 flex items-center gap-1.5">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Trang chủ</NuxtLink>
          <span>/</span>
          <span class="text-gray-600">Giới thiệu</span>
        </nav>
        <!-- <h1 class="heading-1 mb-2">Giới thiệu Hoàng Nam Phát</h1>
        <p class="heading-2 max-w-2xl">
          Công ty TNHH Công Nghệ Hoàng Nam Phát – đơn vị phân phối thiết bị mạng, camera quan sát và laptop chính hãng uy tín tại Cần Thơ.
        </p> -->
      </div>
    </div>

    <!-- Introduce content (CMS HTML) + best-selling sidebar -->
    <div class="container mx-auto px-4 py-8">
      <div class="flex gap-8 items-start">
        <!-- Main content -->
        <div class="flex-1 min-w-0">
          <div v-if="introduceInfo?.info" class="bg-white rounded-2xl border border-gray-200 shadow p-5 sm:p-8">
            <div class="cms-content" v-html="introduceInfoHtml" />
          </div>
        </div>

        <!-- Right sidebar: best-selling products (desktop only) -->
        <ProductBestSellingSidebar />
      </div>
    </div>

    <!-- Same content as home -->
    <!-- <HomeCategories />
    <HomeBestSellers />
    <HomeFlashSale />
    <HomeCameraSection />
    <HomeLaptopSection />
    <HomeNetworkingSection />
    <HomeNasSection />
    <HomeBrands />
    <HomeBusinessSolutions />
    <HomeTrustFeatures />
    <HomeReviews />
    <HomeBlog />
    <HomeNewsletter /> -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useIntroducePageStore } from '~/stores/introducePage'
import { resolveOembedTags } from '~/utils'

useSeo({
  title: 'Giới thiệu',
  description:
    'Công ty TNHH Công Nghệ Hoàng Nam Phát – đơn vị phân phối thiết bị mạng, camera quan sát, laptop và thiết bị công nghệ chính hãng uy tín tại Cần Thơ và toàn quốc.',
})

const introducePageStore = useIntroducePageStore()
const { introduceInfo } = storeToRefs(introducePageStore)
const introduceInfoHtml = computed(() => (introduceInfo.value?.info ? resolveOembedTags(introduceInfo.value.info) : ''))

onMounted(() => {
  introducePageStore.fetchIntroduceInfo()
})
</script>

<!-- <style scoped>
/* Nội dung CMS (v-html) không dùng plugin @tailwindcss/typography nên cần style
   trực tiếp để đảm bảo cỡ chữ, khoảng cách và bảng responsive trên mobile. */
.cms-content {
  font-size: 1.0625rem;
  line-height: 1.625;
  color: rgba(31, 41, 55, 0.8);
}

.cms-content :deep(h1),
.cms-content :deep(h2),
.cms-content :deep(h3),
.cms-content :deep(h4) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
  color: #1f2937;
}
.cms-content :deep(h1:first-child),
.cms-content :deep(h2:first-child),
.cms-content :deep(h3:first-child),
.cms-content :deep(h4:first-child) {
  margin-top: 0;
}
.cms-content :deep(h3) {
  font-size: 1.5rem;
}
.cms-content :deep(h4) {
  font-size: 1.25rem;
}

.cms-content :deep(p) {
  margin-bottom: 1rem;
}

.cms-content :deep(strong) {
  font-weight: 600;
  color: #1f2937;
}

.cms-content :deep(a) {
  color: #e52020;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.cms-content :deep(a:hover) {
  color: rgba(229, 32, 32, 0.8);
}

.cms-content :deep(ul),
.cms-content :deep(ol) {
  margin-bottom: 1rem;
  margin-left: 1.25rem;
}
.cms-content :deep(li + li) {
  margin-top: 0.375rem;
}
.cms-content :deep(ul) {
  list-style-type: disc;
}
.cms-content :deep(ol) {
  list-style-type: decimal;
}

.cms-content :deep(img) {
  margin: 1rem 0;
  height: auto;
  max-width: 100%;
  border-radius: 0.5rem;
}

.cms-content :deep(figure.table) {
  margin: 1rem 0;
  overflow-x: auto;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}
.cms-content :deep(figure.table table) {
  margin: 0;
  width: 100%;
  min-width: 420px;
  border-collapse: collapse;
  text-align: left;
}
.cms-content :deep(figure.table td) {
  padding: 0.75rem 1rem;
  vertical-align: top;
  color: rgba(31, 41, 55, 0.8);
  width: auto !important;
}
.cms-content :deep(figure.table tr) {
  border-bottom: 1px solid #e5e7eb;
}
.cms-content :deep(figure.table tr:last-child) {
  border-bottom: none;
}
.cms-content :deep(figure.table td:first-child) {
  width: 40% !important;
  background-color: #f5f7fa;
  font-weight: 500;
  color: #1f2937;
}
</style> -->
