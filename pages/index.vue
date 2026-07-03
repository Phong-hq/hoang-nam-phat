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
import type { HomeProduct } from '~/types'

useSeo({
  title: 'Trang chủ',
  description:
    'Mua thiết bị mạng, camera quan sát, laptop chính hãng tại Hoàng Nam Phát. Router Mikrotik, Camera Hikvision, Switch Cisco, WiFi TP-Link – Giá tốt, bảo hành chính hãng, giao hàng toàn quốc.',
})

const altBgs = ['bg-[#EEF2F7]', 'bg-white']

interface SectionConfig {
  id: string
  props: {
    label: string
    title: string
    subtitle?: string
    to: string
    products: HomeProduct[]
    autoplayDelay?: number
  }
}

const productSections: SectionConfig[] = [
  {
    id: 'camera',
    props: {
      label: 'An ninh & Giám sát',
      title: 'Camera quan sát',
      subtitle: 'Hikvision · Dahua · Kbvision · Ezviz · Imou',
      to: '/products?category=camera',
      autoplayDelay: 4000,
      products: [
        { id: 1, name: 'Hikvision DS-2CD2T47G2-L 4MP ColorVu Bullet', brand: 'Hikvision', price: 1890000, originalPrice: 2290000, discount: 17, rating: 4.9, ratingCount: 318, image: 'https://placehold.co/300x300/FFF7ED/EA580C?text=2CD2T47' },
        { id: 2, name: 'Dahua IPC-HFW2849S-S-IL 8MP Smart Dual Light', brand: 'Dahua', price: 1490000, originalPrice: 1890000, discount: 21, rating: 4.7, ratingCount: 205, image: 'https://placehold.co/300x300/FFF7ED/C2410C?text=HFW2849' },
        { id: 3, name: 'Kbvision KX-C8001 8MP Full Color IP Camera', brand: 'Kbvision', price: 890000, originalPrice: 1190000, discount: 25, rating: 4.5, ratingCount: 143, image: 'https://placehold.co/300x300/FEF9C3/A16207?text=KX-C8001' },
        { id: 4, name: 'Imou Bullet 2E 4MP Wi-Fi Smart Camera', brand: 'Imou', price: 790000, originalPrice: 990000, discount: 20, rating: 4.6, ratingCount: 421, image: 'https://placehold.co/300x300/ECFDF5/047857?text=Bullet+2E' },
        { id: 5, name: 'Ezviz C3X Pro 4MP Dual Lens Color Night Vision', brand: 'Ezviz', price: 1290000, originalPrice: 1590000, discount: 19, rating: 4.7, ratingCount: 289, image: 'https://placehold.co/300x300/FFF7ED/D97706?text=C3X+Pro' },
        { id: 6, name: 'Hikvision DS-2DE4425IWG-E 4MP PTZ Network', brand: 'Hikvision', price: 4590000, originalPrice: 5490000, discount: 16, rating: 4.8, ratingCount: 97, image: 'https://placehold.co/300x300/FFF7ED/EA580C?text=PTZ+4MP' },
      ],
    },
  },
  {
    id: 'laptop',
    props: {
      label: 'Làm việc & Di động',
      title: 'Laptop chính hãng',
      to: '/products?category=laptop',
      autoplayDelay: 3800,
      products: [
        { id: 1, name: 'Dell Latitude 3540 Core i5-1345U 8GB 256GB SSD', brand: 'Dell', price: 14500000, originalPrice: 17000000, discount: 15, rating: 4.7, ratingCount: 87, image: 'https://placehold.co/300x300/F8FAFC/334155?text=Latitude+3540' },
        { id: 2, name: 'HP ProBook 440 G10 Core i7-1355U 16GB 512GB', brand: 'HP', price: 22500000, originalPrice: 26000000, discount: 13, rating: 4.8, ratingCount: 64, image: 'https://placehold.co/300x300/F0FDF4/15803D?text=ProBook+440' },
        { id: 3, name: 'Lenovo ThinkPad E14 Gen 5 Ryzen 5 7530U 16GB', brand: 'Lenovo', price: 18900000, originalPrice: 22000000, discount: 14, rating: 4.7, ratingCount: 112, image: 'https://placehold.co/300x300/EFF6FF/1D4ED8?text=ThinkPad+E14' },
        { id: 4, name: 'Asus VivoBook 15 OLED K3504VA Core i5-1340P', brand: 'ASUS', price: 16500000, originalPrice: 19500000, discount: 15, rating: 4.6, ratingCount: 156, image: 'https://placehold.co/300x300/FFF7ED/C2410C?text=VivoBook+15' },
        { id: 5, name: 'Acer Aspire 5 A514-56M Core i5-1335U 16GB 512GB', brand: 'Acer', price: 14900000, originalPrice: 17500000, discount: 15, rating: 4.5, ratingCount: 203, image: 'https://placehold.co/300x300/ECFEFF/0E7490?text=Aspire+5' },
        { id: 6, name: 'Dell Inspiron 15 3520 Core i3-1215U 8GB 256GB', brand: 'Dell', price: 10900000, originalPrice: 12900000, discount: 16, rating: 4.5, ratingCount: 178, isNew: true, image: 'https://placehold.co/300x300/F8FAFC/475569?text=Inspiron+15' },
      ],
    },
  },
  {
    id: 'network',
    props: {
      label: 'Hạ tầng mạng',
      title: 'Router · Switch · WiFi',
      to: '/products?category=router',
      autoplayDelay: 4200,
      products: [
        { id: 1, name: 'Mikrotik CCR2004-1G-12S+2XS Cloud Core Router', brand: 'MikroTik', price: 18900000, originalPrice: 22500000, discount: 16, rating: 4.9, ratingCount: 67, image: 'https://placehold.co/300x300/EEF2FF/1E40AF?text=CCR2004' },
        { id: 2, name: 'Ubiquiti UniFi Dream Machine Pro UDM-Pro', brand: 'Ubiquiti', price: 12500000, originalPrice: 14900000, discount: 16, rating: 4.8, ratingCount: 89, image: 'https://placehold.co/300x300/ECFEFF/0E7490?text=UDM-Pro' },
        { id: 3, name: 'Cisco SG110-16HP 16-Port PoE Unmanaged Switch', brand: 'Cisco', price: 5900000, originalPrice: 7200000, discount: 18, rating: 4.8, ratingCount: 134, image: 'https://placehold.co/300x300/EEF2FF/4338CA?text=SG110' },
        { id: 4, name: 'TP-Link ER7206 Omada Multi-WAN VPN Router', brand: 'TP-Link', price: 3290000, originalPrice: 3990000, discount: 18, rating: 4.7, ratingCount: 198, image: 'https://placehold.co/300x300/EEF2FF/1D4ED8?text=ER7206' },
        { id: 5, name: 'Ruijie RG-EG105GW-E Wireless Enterprise Gateway', brand: 'Ruijie', price: 2490000, originalPrice: 2990000, discount: 17, rating: 4.6, ratingCount: 156, image: 'https://placehold.co/300x300/EFF6FF/2563EB?text=EG105GW' },
        { id: 6, name: 'Grandstream GWN7664 AX3600 Wi-Fi 6 Access Point', brand: 'Grandstream', price: 4190000, originalPrice: 4990000, discount: 16, rating: 4.7, ratingCount: 72, isNew: true, image: 'https://placehold.co/300x300/F5F3FF/7C3AED?text=GWN7664' },
      ],
    },
  },
  {
    id: 'nas',
    props: {
      label: 'Lưu trữ chuyên nghiệp',
      title: 'NAS & Storage',
      to: '/products?category=nas',
      autoplayDelay: 4500,
      products: [
        { id: 1, name: 'Synology DiskStation DS923+ 4-Bay NAS Enclosure', brand: 'Synology', price: 14900000, originalPrice: 17500000, discount: 15, rating: 4.9, ratingCount: 112, image: 'https://placehold.co/300x300/F5F3FF/6D28D9?text=DS923+' },
        { id: 2, name: 'QNAP TS-433 4-Bay Quad-core NAS', brand: 'QNAP', price: 8900000, originalPrice: 10500000, discount: 15, rating: 4.7, ratingCount: 78, image: 'https://placehold.co/300x300/EFF6FF/2563EB?text=TS-433' },
        { id: 3, name: 'WD My Cloud EX2 Ultra 8TB NAS', brand: 'WD', price: 7500000, originalPrice: 8900000, discount: 16, rating: 4.6, ratingCount: 134, image: 'https://placehold.co/300x300/F0FDF4/166534?text=EX2+Ultra' },
        { id: 4, name: 'Synology DS223+ 2-Bay NAS DiskStation', brand: 'Synology', price: 8900000, originalPrice: 10500000, discount: 15, rating: 4.8, ratingCount: 93, image: 'https://placehold.co/300x300/F5F3FF/7C3AED?text=DS223+' },
        { id: 5, name: 'TerraMaster F4-423 4-Bay High-Performance NAS', brand: 'TerraMaster', price: 9500000, originalPrice: 11200000, discount: 15, rating: 4.5, ratingCount: 47, isNew: true, image: 'https://placehold.co/300x300/FFF7ED/B45309?text=F4-423' },
        { id: 6, name: 'Seagate IronWolf Pro 4TB NAS Internal HDD', brand: 'Seagate', price: 2890000, originalPrice: 3490000, discount: 17, rating: 4.7, ratingCount: 265, image: 'https://placehold.co/300x300/FEF2F2/B91C1C?text=IronWolf' },
      ],
    },
  },
]
</script>
