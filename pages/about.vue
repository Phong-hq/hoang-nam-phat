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
        <h1 class="heading-1 mb-2">Giới thiệu Hoàng Nam Phát</h1>
        <p class="heading-2 max-w-2xl">
          Công ty TNHH Công Nghệ Hoàng Nam Phát – đơn vị phân phối thiết bị mạng, camera quan sát và laptop chính hãng uy tín tại Cần Thơ.
        </p>
      </div>
    </div>

    <!-- Same content as home -->
    <HomeCategories />
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
    <HomeNewsletter />
  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'Giới thiệu',
  description:
    'Công ty TNHH Công Nghệ Hoàng Nam Phát – đơn vị phân phối thiết bị mạng, camera quan sát, laptop và thiết bị công nghệ chính hãng uy tín tại Cần Thơ và toàn quốc.',
})
</script>
