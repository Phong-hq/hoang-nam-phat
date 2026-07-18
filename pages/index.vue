<template>
  <div class="bg-[#EEF2F7] min-h-screen">
    <HomeHero />
    <HomeFlashSale />
    <HomeBestSellers />

    <!-- Product sections: đổi thứ tự / thêm / xóa tùy ý, bg tự xen kẽ -->
    <div v-for="(s, i) in productSections" :key="s.id" :class="altBgs[i % 2]">
      <HomeProductSection v-bind="s.props" />
    </div>

    <div :class="altBgs[productSections.length % 2]"><HomeBrands /></div>
    <div class="bg-primary"><HomeTrustFeatures /></div>
    <!-- <HomeNewsletter /> -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { SessionBrand } from '~/types'
import { useSessionStore } from '~/stores/session.store'

useSeo({
  title: 'Trang chủ',
  description:
    'Mua thiết bị mạng, camera quan sát, laptop chính hãng tại Hoàng Nam Phát. Router Mikrotik, Camera Hikvision, Switch Cisco, WiFi TP-Link – Giá tốt, bảo hành chính hãng, giao hàng toàn quốc.',
})

const sessionStore = useSessionStore()

onMounted(() => {
  sessionStore.fetchRecords()
})

const altBgs = ['bg-[#EEF2F7]', 'bg-white']

interface SectionConfig {
  id: string
  props: {
    label: string
    title: string
    subtitle?: string
    to: string
    categoryId: number
    brands: SessionBrand[]
    autoplayDelay?: number
  }
}

const sortedSessions = computed(() =>
  [...sessionStore.session].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)),
)

const productSections = computed<SectionConfig[]>(() =>
  sortedSessions.value.map((s) => ({
    id: String(s.id),
    props: {
      label: s.sub_title.trim(),
      title: s.title,
      to: `/products?category=${s.category.slug}`,
      autoplayDelay: 4000,
      categoryId: s.category.id,
      brands: s.brand,
    },
  })),
)
</script>
