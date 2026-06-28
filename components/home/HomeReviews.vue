<template>
  <section class="py-14 bg-white">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <BaseSectionHeader label="Khách hàng nói gì" title="Đánh giá từ khách hàng" center>
        <div class="flex items-center justify-center gap-2 mt-3">
          <div class="flex gap-0.5">
            <svg v-for="i in 5" :key="i" class="w-5 h-5 fill-warning text-warning" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <span class="text-[#0F172A] font-bold">4.9</span>
          <span class="text-base-content/40 text-sm">/ 5 · dựa trên 2,400+ đánh giá</span>
        </div>
      </BaseSectionHeader>

      <div class="relative">
        <ClientOnly>
          <Swiper
            :modules="swiperModules"
            :breakpoints="breakpoints"
            :autoplay="autoplay"
            :loop="true"
            @swiper="onSwiper"
          >
            <SwiperSlide v-for="review in reviews" :key="review.id" class="!h-auto pb-1">
              <div class="bg-white rounded-xl border border-base-200 p-5 flex flex-col gap-4 h-full hover:shadow-md transition-shadow">
                <!-- Stars -->
                <div class="flex gap-0.5">
                  <svg v-for="i in 5" :key="i" class="w-4 h-4"
                    :class="i <= review.rating ? 'fill-warning text-warning' : 'fill-base-200 text-base-200'"
                    viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <!-- Content -->
                <p class="text-sm text-base-content/70 leading-relaxed flex-1">"{{ review.content }}"</p>
                <!-- Author -->
                <div class="flex items-center gap-3 pt-3 border-t border-base-100">
                  <div class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                    {{ review.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-base-content">{{ review.name }}</p>
                    <p class="text-xs text-base-content/40">{{ review.role }} · {{ review.product }}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <button @click="swiper?.slidePrev()" aria-label="Trước" class="absolute -left-4 top-1/2 -translate-y-6 z-10 w-9 h-9 bg-white rounded-full shadow-md border border-base-200 items-center justify-center text-base-content/60 hover:text-primary hover:border-primary transition-colors hidden md:flex">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button @click="swiper?.slideNext()" aria-label="Tiếp" class="absolute -right-4 top-1/2 -translate-y-6 z-10 w-9 h-9 bg-white rounded-full shadow-md border border-base-200 items-center justify-center text-base-content/60 hover:text-primary hover:border-primary transition-colors hidden md:flex">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>

          <template #fallback>
            <div class="flex gap-4 overflow-x-auto pb-2 snap-x">
              <div v-for="r in reviews" :key="r.id" class="flex-shrink-0 w-[300px] snap-start bg-white rounded-xl p-5 border border-base-200">
                <p class="text-sm text-base-content/70">"{{ r.content }}"</p>
                <p class="font-semibold mt-3 text-sm">{{ r.name }}</p>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

const swiper = ref<SwiperType | null>(null)
const onSwiper = (s: SwiperType) => { swiper.value = s }
const swiperModules = [Autoplay]
const breakpoints = {
  320: { slidesPerView: 1.1, spaceBetween: 12 },
  640: { slidesPerView: 2, spaceBetween: 16 },
  1024: { slidesPerView: 3, spaceBetween: 20 },
}
const autoplay = { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }

const reviews = [
  { id: 1, rating: 5, content: 'Đặt Router Mikrotik CCR2004, giao hàng nhanh hơn dự kiến. Sản phẩm chính hãng, seal đầy đủ. Đội kỹ thuật hỗ trợ cài đặt tận tình. Sẽ tiếp tục mua hàng tại đây.', name: 'Nguyễn Văn Minh', role: 'IT Manager', product: 'MikroTik CCR2004' },
  { id: 2, rating: 5, content: 'Camera Hikvision 4MP mua về lắp đặt rất dễ, hình ảnh ban đêm cực kỳ sắc nét. Giá tốt hơn nhiều so với các nơi khác. Bảo hành 2 năm, an tâm lắm.', name: 'Trần Thị Lan', role: 'Chủ doanh nghiệp', product: 'Hikvision DS-2CD2143G2' },
  { id: 3, rating: 5, content: 'Mua NAS Synology DS923+ để làm backup server cho công ty. Tư vấn viên giải thích rõ ràng, setup xong trong vài tiếng. Hệ thống chạy ổn định tuyệt vời.', name: 'Lê Hoàng Phúc', role: 'System Admin', product: 'Synology DS923+' },
  { id: 4, rating: 5, content: 'Switch Cisco SG350-28P hoạt động ổn định từ ngày lắp đặt. Đội ngũ kỹ thuật đến tận nơi cấu hình VLAN, rất chuyên nghiệp và đúng hẹn.', name: 'Phạm Văn Hùng', role: 'Network Engineer', product: 'Cisco SG350-28P' },
  { id: 5, rating: 5, content: 'Laptop Dell Latitude 3540 mua cho văn phòng, máy chạy mượt mà, pin trâu. Xuất hóa đơn đỏ nhanh, thủ tục đơn giản. Chắc chắn sẽ mua thêm cho toàn bộ nhân viên.', name: 'Vũ Thu Hương', role: 'HR Manager', product: 'Dell Latitude 3540' },
  { id: 6, rating: 5, content: 'Hệ thống WiFi Ubiquiti UniFi cho 3 tầng văn phòng, phủ sóng cực tốt không có điểm chết. Đội kỹ thuật tư vấn nhiệt tình và triển khai đúng tiến độ.', name: 'Đỗ Quang Trung', role: 'CTO', product: 'Ubiquiti UniFi' },
]
</script>
