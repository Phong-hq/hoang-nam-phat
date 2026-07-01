<template>
  <section class="py-5">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div v-for="feat in features" :key="feat.title" class="flex items-center gap-3">
          <div class="bg-white/15 rounded-full p-2.5 flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" :d="feat.icon" />
            </svg>
          </div>
          <div>
            <p class="text-white text-sm font-bold leading-tight">{{ feat.title }}</p>
            <p class="text-white/60 text-xs mt-0.5">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Hàng chính hãng 100%',
    desc: 'Cam kết xuất xứ rõ ràng, có CO/CQ',
  },
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Bảo hành chính hãng',
    desc: 'Theo tiêu chuẩn nhà sản xuất',
  },
  {
    icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
    title: 'Giao hàng toàn quốc',
    desc: 'Nhanh chóng, đóng gói an toàn',
  },
  {
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
    title: 'Hỗ trợ kỹ thuật 24/7',
    desc: 'Tư vấn & cài đặt tận nơi',
  },
]
</script>
