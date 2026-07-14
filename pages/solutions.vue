<template>
  <div class="bg-[#EEF2F7] min-h-screen">

    <!-- Page banner -->
    <div class="bg-white border-b border-gray-200 py-8">
      <div class="container mx-auto px-4">
        <nav class="text-sm text-gray-400 mb-3 flex items-center gap-1.5">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Trang chủ</NuxtLink>
          <span>/</span>
          <span class="text-gray-600">Giải pháp</span>
        </nav>
        <h1 class="heading-1 mb-2">Giải pháp công nghệ</h1>
        <p class="heading-2 max-w-2xl">
          Hoàng Nam Phát cung cấp giải pháp mạng, camera và công nghệ toàn diện cho doanh nghiệp và gia đình – từ tư vấn đến triển khai và bảo trì.
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
  title: 'Giải pháp công nghệ',
  description:
    'Hoàng Nam Phát cung cấp giải pháp mạng, camera quan sát và công nghệ toàn diện cho doanh nghiệp và gia đình. Tư vấn – triển khai – bảo trì chuyên nghiệp.',
})
</script>
