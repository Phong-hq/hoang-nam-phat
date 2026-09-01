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
import { useCategoryStore } from '~/stores/category.store'

useSeo({
  title: 'Trang chủ',
  description:
    'Mua thiết bị mạng, camera quan sát, laptop chính hãng tại Hoàng Nam Phát. Router Mikrotik, Camera Hikvision, Switch Cisco, WiFi TP-Link – Giá tốt, bảo hành chính hãng, giao hàng toàn quốc.',
})

const categoryStore = useCategoryStore()

onMounted(() => {
  if (!categoryStore.categories.length) categoryStore.fetchCategories()
    console.log('c', categoryStore.categories)

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
    autoplayDelay?: number
  }
}

// Categories already come back in the correct display order (the store
// reverses the API's order once, on fetch) -- no re-sorting needed here.
const productSections = computed<SectionConfig[]>(() =>
  categoryStore.categories.map((c) => ({
    id: String(c.id),
    props: {
      label: c.description?.trim(),
      title: c.name,
      subtitle: c.description,
      to: `/products?category=${c.slug}`,
      autoplayDelay: 4000,
      categoryId: c.id,
    },
  })),
)
</script>
