<template>
  <section class="py-14 bg-white">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <div class="max-w-2xl mx-auto text-center">
        <span class="inline-block text-primary text-xs font-bold uppercase tracking-widest mb-3">Bản tin công nghệ</span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-3">
          Nhận ưu đãi & tin tức mới nhất
        </h2>
        <p class="text-base-content/55 text-sm leading-relaxed mb-8">
          Đăng ký nhận bản tin để không bỏ lỡ các chương trình flash sale, sản phẩm mới và bài viết kỹ thuật từ đội ngũ chuyên gia của chúng tôi.
        </p>

        <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" @submit.prevent="handleSubmit">
          <input
            v-model="email"
            type="email"
            placeholder="Nhập địa chỉ email của bạn"
            required
            class="input input-bordered flex-1 focus:input-primary text-sm"
            :disabled="submitted"
          />
          <button
            type="submit"
            class="btn btn-primary text-white font-semibold px-6 flex-shrink-0"
            :disabled="submitted"
          >
            <template v-if="submitted">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Đã đăng ký
            </template>
            <template v-else>Đăng ký</template>
          </button>
        </form>

        <p class="text-xs text-base-content/35 mt-4">
          Bằng cách đăng ký, bạn đồng ý với
          <NuxtLink to="/privacy" class="text-primary hover:underline">Chính sách bảo mật</NuxtLink>
          của chúng tôi. Hủy đăng ký bất kỳ lúc nào.
        </p>

        <div class="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-base-200">
          <div v-for="s in stats" :key="s.label" class="text-center">
            <div class="text-xl font-extrabold text-[#0F172A]">{{ s.value }}</div>
            <div class="text-xs text-base-content/40 mt-0.5">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const email = ref('')
const submitted = ref(false)

const handleSubmit = () => {
  if (!email.value) return
  submitted.value = true
}

const stats = [
  { value: '12,000+', label: 'Người đăng ký' },
  { value: '2× / tuần', label: 'Tần suất gửi' },
  { value: '0', label: 'Spam' },
]
</script>
