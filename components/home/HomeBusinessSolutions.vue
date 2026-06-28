<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <div class="rounded-2xl overflow-hidden grid lg:grid-cols-2" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);">

        <!-- Left: content -->
        <div class="p-8 lg:p-12 flex flex-col justify-center">
          <span class="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Giải pháp doanh nghiệp
          </span>

          <h2 class="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
            Hạ tầng CNTT<br />
            <span class="text-primary">toàn diện</span> cho doanh nghiệp
          </h2>

          <p class="text-white/55 leading-relaxed mb-8">
            Từ thiết kế hạ tầng mạng, triển khai hệ thống camera an ninh, đến giải pháp lưu trữ NAS — chúng tôi cung cấp dịch vụ end-to-end với đội ngũ kỹ thuật chuyên nghiệp 15+ năm kinh nghiệm.
          </p>

          <div class="grid grid-cols-2 gap-4 mb-8">
            <div v-for="feat in features" :key="feat.label" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-base leading-none">{{ feat.icon }}</span>
              </div>
              <div>
                <p class="text-white font-semibold text-sm">{{ feat.label }}</p>
                <p class="text-white/40 text-xs mt-0.5 leading-snug">{{ feat.desc }}</p>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <NuxtLink to="/contact" class="btn btn-primary px-6 text-white font-semibold">
              Liên hệ tư vấn
            </NuxtLink>
            <NuxtLink to="/products" class="btn btn-ghost border border-white/20 text-white hover:bg-white/10 px-6 font-semibold">
              Xem sản phẩm
            </NuxtLink>
          </div>
        </div>

        <!-- Right: stats + partners -->
        <div class="p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-center gap-6">
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="rounded-xl p-5 border border-white/8"
              style="background: rgba(255,255,255,0.04);"
            >
              <div class="text-3xl font-extrabold text-white tracking-tight">{{ stat.value }}</div>
              <div class="text-white/45 text-sm mt-1">{{ stat.label }}</div>
            </div>
          </div>

          <div class="border-t border-white/10 pt-6">
            <p class="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Đối tác tin cậy</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="p in partners"
                :key="p"
                class="text-xs font-semibold text-white/50 bg-white/6 border border-white/10 px-3 py-1.5 rounded-full"
              >
                {{ p }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  { icon: '🌐', label: 'Thiết kế hạ tầng mạng', desc: 'LAN, WAN, VPN, SD-WAN' },
  { icon: '📹', label: 'Hệ thống camera', desc: 'IP, PTZ, AI analytics' },
  { icon: '💾', label: 'Lưu trữ NAS/SAN', desc: 'Synology, QNAP, NetApp' },
  { icon: '🛡️', label: 'Bảo mật & Firewall', desc: 'Fortinet, Cisco, Palo Alto' },
]
const stats = [
  { value: '500+', label: 'Dự án đã triển khai' },
  { value: '15+', label: 'Năm kinh nghiệm' },
  { value: '200+', label: 'Doanh nghiệp đang dùng' },
  { value: '24/7', label: 'Hỗ trợ kỹ thuật' },
]
const partners = ['Mikrotik Partner', 'Cisco Reseller', 'Hikvision Certified', 'Synology Reseller', 'TP-Link Gold']
</script>
