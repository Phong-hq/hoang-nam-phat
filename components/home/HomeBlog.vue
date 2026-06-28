<template>
  <section class="py-14 bg-white">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <BaseSectionHeader label="Kiến thức công nghệ" title="Tin tức & Bài viết" to="/blog" />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="post in posts"
          :key="post.id"
          to="/blog"
          class="group bg-white rounded-xl border border-base-200 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
        >
          <!-- Thumbnail -->
          <div class="aspect-[16/9] overflow-hidden" :style="`background: ${post.bg};`">
            <div class="w-full h-full flex items-end p-4">
              <span class="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                {{ post.category }}
              </span>
            </div>
          </div>
          <!-- Content -->
          <div class="p-5">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-[10px] font-bold uppercase tracking-widest text-primary">{{ post.category }}</span>
              <span class="text-base-content/30 text-xs">·</span>
              <span class="text-xs text-base-content/40">{{ post.date }}</span>
            </div>
            <h3 class="font-bold text-base text-[#0F172A] line-clamp-2 leading-snug mb-2 group-hover:text-primary transition-colors">
              {{ post.title }}
            </h3>
            <p class="text-sm text-base-content/55 line-clamp-2 leading-relaxed">{{ post.excerpt }}</p>
            <div class="flex items-center gap-1 mt-4 text-primary text-sm font-semibold">
              Đọc thêm
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const posts = [
  {
    id: 1,
    category: 'Thiết bị mạng',
    date: '20 tháng 6, 2025',
    title: 'So sánh Mikrotik vs Cisco: Nên chọn router nào cho doanh nghiệp vừa và nhỏ?',
    excerpt: 'Phân tích chi tiết ưu nhược điểm của Mikrotik RouterOS và Cisco IOS để giúp bạn đưa ra quyết định phù hợp với ngân sách và nhu cầu triển khai.',
    bg: 'linear-gradient(135deg, #1E3A5F, #1D4ED8)',
  },
  {
    id: 2,
    category: 'Camera an ninh',
    date: '15 tháng 6, 2025',
    title: 'Hướng dẫn chọn camera IP cho nhà xưởng: 5 tiêu chí quan trọng không thể bỏ qua',
    excerpt: 'Từ độ phân giải, góc nhìn, khả năng chống bụi và nước đến tích hợp AI analytics — những yếu tố cần xem xét khi đầu tư hệ thống giám sát cho nhà xưởng.',
    bg: 'linear-gradient(135deg, #7C2D12, #EA580C)',
  },
  {
    id: 3,
    category: 'NAS Storage',
    date: '10 tháng 6, 2025',
    title: 'Synology DS923+ vs QNAP TS-433: NAS nào phù hợp cho văn phòng dưới 20 người?',
    excerpt: 'Review chi tiết hai dòng NAS phổ biến nhất 2025, so sánh hiệu năng, hệ sinh thái phần mềm và chi phí tổng thể cho môi trường doanh nghiệp nhỏ.',
    bg: 'linear-gradient(135deg, #4C1D95, #7C3AED)',
  },
]
</script>
