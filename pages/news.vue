<template>
  <div class="bg-[#EEF2F7] min-h-screen">

    <!-- Page banner -->
    <div class="bg-white border-b border-gray-200 py-8">
      <div class="container mx-auto px-4">
        <nav class="text-sm text-gray-400 mb-3 flex items-center gap-1.5">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Trang chủ</NuxtLink>
          <span>/</span>
          <span class="text-gray-600">Tin tức</span>
        </nav>
        <h1 class="heading-1 mb-2">Tin tức & Thủ thuật</h1>
        <p class="heading-2 max-w-2xl">
          Cập nhật tin tức công nghệ mới nhất, hướng dẫn cài đặt thiết bị mạng, camera và các thủ thuật hữu ích từ đội ngũ kỹ thuật Hoàng Nam Phát.
        </p>
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
useSeo({
  title: 'Tin tức & Thủ thuật',
  description:
    'Cập nhật tin tức công nghệ mới nhất, hướng dẫn cài đặt thiết bị mạng, camera và các thủ thuật hữu ích từ đội ngũ kỹ thuật Hoàng Nam Phát.',
})
</script>
