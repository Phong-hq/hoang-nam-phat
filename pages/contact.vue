<template>
  <div class="bg-[#EEF2F7] min-h-screen">

    <!-- Page banner -->
    <div class="bg-white border-b border-gray-200 py-6 sm:py-8">
      <div class="container mx-auto px-4">
        <nav class="text-sm text-gray-400 mb-3 flex items-center gap-1.5">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Trang chủ</NuxtLink>
          <span>/</span>
          <span class="text-gray-600">Liên hệ</span>
        </nav>
        <h1 class="heading-1 mb-2">Liên hệ với chúng tôi</h1>
        <p class="heading-2 max-w-2xl">
          Hãy liên hệ ngay để được tư vấn miễn phí về sản phẩm, báo giá dự án hoặc hỗ trợ kỹ thuật từ đội ngũ chuyên gia Hoàng Nam Phát.
        </p>
      </div>
    </div>

    <!-- Contact content -->
    <div class="container mx-auto px-4 py-6 sm:py-12 space-y-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <!-- Contact info cards -->
        <div class="flex flex-col gap-4">

          <!-- Phone -->
          <div class="bg-white rounded-2xl border border-gray-200 shadow p-4 sm:p-6 flex items-start gap-4">
            <div class="bg-green-100 rounded-xl p-3 flex-shrink-0">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Điện thoại / Hotline</p>
              <a href="tel:0937813788" class="text-lg font-bold text-gray-800 hover:text-primary transition-colors block">
                0937.813.788
              </a>
              <p class="text-sm text-gray-500 mt-0.5">Thứ 2 – Thứ 7: 8:00 – 18:00</p>
            </div>
          </div>

          <!-- Zalo -->
          <div class="bg-white rounded-2xl border border-gray-200 shadow p-4 sm:p-6 flex items-start gap-4">
            <div class="bg-blue-100 rounded-xl p-3 flex-shrink-0">
              <span class="text-blue-600 text-sm font-extrabold">Zalo</span>
            </div>
            <div>
              <p class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Nhắn tin Zalo</p>
              <a
                href="https://zalo.me/0937813788"
                target="_blank"
                rel="noopener noreferrer"
                class="text-lg font-bold text-gray-800 hover:text-primary transition-colors block"
              >
                0937.813.788
              </a>
              <p class="text-sm text-gray-500 mt-0.5">Phản hồi trong vòng 15 phút</p>
            </div>
          </div>

          <!-- Email -->
          <div class="bg-white rounded-2xl border border-gray-200 shadow p-4 sm:p-6 flex items-start gap-4">
            <div class="bg-red-100 rounded-xl p-3 flex-shrink-0">
              <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Email</p>
              <a href="mailto:info@hoangnamphat.vn" class="text-base font-bold text-gray-800 hover:text-primary transition-colors block break-all">
                info@hoangnamphat.vn
              </a>
              <p class="text-sm text-gray-500 mt-0.5">Phản hồi trong 1–2 giờ làm việc</p>
            </div>
          </div>

          <!-- Address -->
          <div class="bg-white rounded-2xl border border-gray-200 shadow p-4 sm:p-6 flex items-start gap-4">
            <div class="bg-yellow-100 rounded-xl p-3 flex-shrink-0">
              <svg class="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Địa chỉ showroom</p>
              <p class="text-base font-bold text-gray-800">745/62/2 Quang Trung</p>
              <p class="text-sm text-gray-600">Phường An Hội Tây, Quận Ninh Kiều</p>
              <p class="text-sm text-gray-600">Thành phố Cần Thơ</p>
            </div>
          </div>

          <!-- Business hours -->
          <div class="bg-white rounded-2xl border border-gray-200 shadow p-4 sm:p-6">
            <p class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Giờ làm việc</p>
            <ul class="space-y-2 text-sm">
              <li class="flex justify-between">
                <span class="text-gray-600">Thứ 2 – Thứ 6</span>
                <span class="font-semibold text-gray-800">08:00 – 18:00</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-600">Thứ 7</span>
                <span class="font-semibold text-gray-800">08:00 – 17:00</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-600">Chủ nhật</span>
                <span class="font-semibold text-red-500">Nghỉ</span>
              </li>
            </ul>
          </div>

        </div>

        <!-- Contact form -->
        <div>
          <div class="bg-white rounded-2xl border border-gray-200 shadow p-5 sm:p-8">
            <h2 class="text-xl font-bold text-gray-800 mb-1">Gửi yêu cầu tư vấn</h2>
            <p class="text-sm text-gray-500 mb-6">Điền thông tin bên dưới, đội ngũ chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.</p>

            <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <!-- Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">
                    Họ và tên <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    required
                    class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <!-- Phone -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">
                    Số điện thoại <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="0937.813.788"
                    required
                    class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="example@gmail.com"
                  class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <!-- Subject -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Chủ đề</label>
                <select
                  v-model="form.subject"
                  class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-primary transition-colors bg-white"
                >
                  <option value="">-- Chọn chủ đề --</option>
                  <option value="tuvan">Tư vấn sản phẩm</option>
                  <option value="baogiaduan">Báo giá dự án</option>
                  <option value="hotrokt">Hỗ trợ kỹ thuật</option>
                  <option value="baohanh">Bảo hành / Sửa chữa</option>
                  <option value="khac">Khác</option>
                </select>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">
                  Nội dung <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  required
                  placeholder="Mô tả yêu cầu của bạn..."
                  class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <!-- Agree to terms -->
              <label class="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  v-model="agreeTerms"
                  type="checkbox"
                  required
                  class="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary flex-shrink-0"
                />
                <span class="text-sm text-gray-600">
                  Tôi đồng ý với <span class="font-medium text-gray-800">điều khoản</span> của Hoàng Nam Phát
                  <span class="text-red-500">*</span>
                </span>
              </label>

              <!-- Submit -->
              <button
                type="submit"
                :disabled="submitting || !agreeTerms"
                class="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
              >
                <svg v-if="submitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ submitting ? 'Đang gửi...' : 'Gửi yêu cầu' }}
              </button>

              <!-- Success message -->
              <div v-if="submitted" class="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2.5">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm text-green-700 font-medium">Gửi thành công! Chúng tôi sẽ liên hệ lại bạn sớm nhất.</p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Map – full width row -->
      <div class="bg-white rounded-2xl border border-gray-200 shadow overflow-hidden mt-4">
        <div class="p-5 border-b border-gray-100">
          <h2 class="text-base font-bold text-gray-800">Bản đồ</h2>
          <p class="text-sm text-gray-500">745/62/2 Quang Trung, P. An Hội Tây, Q. Ninh Kiều, TP. Cần Thơ</p>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841080097063!2d105.78200747498374!3d10.028521890097757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a41c9c3f9%3A0x22d2742d8a0aecac!2zUXVhbmcgVHJ1bmcsIE5pbmggS2nhu4F1LCBD4bqnbiBUaMah!5e0!3m2!1svi!2svn!4v1718000000000!5m2!1svi!2svn"
          width="100%"
          height="400"
          style="border:0;"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Bản đồ Hoàng Nam Phát"
          class="block"
        />
      </div>
    </div>

    <!-- Quick contact CTA bar -->
    <div class="bg-primary text-white py-6 sm:py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p class="text-lg font-bold">Cần hỗ trợ ngay?</p>
            <p class="text-primary-100 text-sm opacity-80">Đội ngũ kỹ thuật sẵn sàng tư vấn miễn phí cho bạn</p>
          </div>
          <div class="flex items-center gap-4 flex-shrink-0">
            <a
              href="tel:0937813788"
              class="bg-white text-primary font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Gọi ngay
            </a>
            <a
              href="https://zalo.me/0937813788"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              Chat Zalo
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'Liên hệ',
  description:
    'Liên hệ Hoàng Nam Phát để được tư vấn thiết bị mạng, camera quan sát, laptop. Hotline: 0937.813.788 – Email: info@hoangnamphat.vn – 745/62/2 Quang Trung, Cần Thơ.',
})

const form = reactive({
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
})

const submitting = ref(false)
const submitted = ref(false)
const agreeTerms = ref(false)

async function handleSubmit() {
  submitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 1200))
  submitting.value = false
  submitted.value = true
  form.name = ''
  form.phone = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  agreeTerms.value = false
}
</script>
