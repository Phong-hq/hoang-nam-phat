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
              <a :href="`tel:${phoneRaw}`" class="text-lg font-bold text-gray-800 hover:text-primary transition-colors block">
                {{ phoneDisplay }}
              </a>
              <p class="text-sm text-gray-500 mt-0.5">Thứ 2 – Thứ 7: 8:00 – 18:00</p>
            </div>
          </div>

          <!-- Zalo -->
          <!-- <div class="bg-white rounded-2xl border border-gray-200 shadow p-4 sm:p-6 flex items-start gap-4">
            <div class="bg-blue-100 rounded-xl p-3 flex-shrink-0">
              <span class="text-blue-600 text-sm font-extrabold">Zalo</span>
            </div>
            <div>
              <p class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Nhắn tin Zalo</p>
              <a
                :href="zaloHref"
                target="_blank"
                rel="noopener noreferrer"
                class="text-lg font-bold text-gray-800 hover:text-primary transition-colors block"
              >
                {{ phoneDisplay }}
              </a>
              <p class="text-sm text-gray-500 mt-0.5">Phản hồi trong vòng 15 phút</p>
            </div>
          </div> -->

          <!-- Email -->
          <div class="bg-white rounded-2xl border border-gray-200 shadow p-4 sm:p-6 flex items-start gap-4">
            <div class="bg-red-100 rounded-xl p-3 flex-shrink-0">
              <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Email</p>
              <a :href="`mailto:${emailValue}`" class="text-base font-bold text-gray-800 hover:text-primary transition-colors block break-all">
                {{ emailValue }}
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
              <p class="text-base font-bold text-gray-800">{{ addressParts[0] }}</p>
              <p v-for="(part, i) in addressParts.slice(1)" :key="i" class="text-sm text-gray-600">{{ part }}</p>
            </div>
          </div>

          <!-- Business hours -->
          <div class="bg-white rounded-2xl border border-gray-200 shadow p-4 sm:p-6">
            <p class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Giờ làm việc</p>
            <p class="text-sm font-semibold text-gray-800">{{ workingHourDisplay }}</p>
          </div>

          <!-- Social links -->
          <div v-if="socialItems.length" class="bg-white rounded-2xl border border-gray-200 shadow p-4 sm:p-6">
            <p class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Kết nối mạng xã hội</p>
            <div class="flex items-center gap-3">
              <a v-for="social in socialItems" :key="social.label"
                :href="social.href" target="_blank" rel="noopener noreferrer" :title="social.label"
                class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors"
              >
                <template v-if="social.type === 'text'">
                  <span class="text-xs font-extrabold">{{ social.label }}</span>
                </template>
                <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path :d="social.icon" />
                </svg>
              </a>
            </div>
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
                  <option v-for="s in SUBJECT_OPTIONS" :key="s.value" :value="s.value">{{ s.label }}</option>
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

              <!-- Error message -->
              <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2.5">
                <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zM12 15.75h.008" />
                </svg>
                <p class="text-sm text-red-700 font-medium">{{ errorMessage }}</p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Map – full width row -->
      <div class="bg-white rounded-2xl border border-gray-200 shadow overflow-hidden mt-4">
        <div class="p-5 border-b border-gray-100">
          <h2 class="text-base font-bold text-gray-800">Bản đồ</h2>
          <p class="text-sm text-gray-500">{{ addressParts.join(', ') }}</p>
        </div>
        <iframe
          :src="mapEmbedUrl"
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
              :href="`tel:${phoneRaw}`"
              class="bg-white text-primary font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Gọi ngay
            </a>
            <a
              :href="zaloHref"
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
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBusinessStore } from '~/stores/business.store'
import { useSocialStore } from '~/stores/social.store'

useSeo({
  title: 'Liên hệ',
  description:
    'Liên hệ Hoàng Nam Phát để được tư vấn thiết bị mạng, camera quan sát, laptop. Hotline: 0937.813.788 – Email: info@hoangnamphat.vn – 745/62/2 Quang Trung, Cần Thơ.',
})

const SUBJECT_OPTIONS = [
  { value: 'tuvan', label: 'Tư vấn sản phẩm' },
  { value: 'baogiaduan', label: 'Báo giá dự án' },
  { value: 'hotrokt', label: 'Hỗ trợ kỹ thuật' },
  { value: 'baohanh', label: 'Bảo hành / Sửa chữa' },
  { value: 'khac', label: 'Khác' },
]

const { createFeedback } = useFeedback()

const businessStore = useBusinessStore()
const { businessInfo } = storeToRefs(businessStore)

const socialStore = useSocialStore()
const { socialLinks: socialRecord } = storeToRefs(socialStore)

onMounted(() => {
  businessStore.fetchBusinessInfo()
  socialStore.fetchSocialLinks()
})

const phoneDisplay = computed(() => businessInfo.value?.phone?.[0] ?? '0937.813.788')
const phoneRaw = computed(() => phoneDisplay.value.replace(/\D/g, ''))
const zaloHref = computed(() => socialRecord.value?.zalo ?? `https://zalo.me/${phoneRaw.value}`)
const emailValue = computed(() => businessInfo.value?.email ?? 'info@hoangnamphat.vn')
const workingHourDisplay = computed(
  () => businessInfo.value?.working_hour ?? '08:00 – 18:00 (Thứ 2 – Thứ 7), Chủ nhật nghỉ',
)
const addressParts = computed(() =>
  (businessInfo.value?.address ?? '745/62/2 Quang Trung, Phường An Hội Tây, Quận Ninh Kiều, Thành phố Cần Thơ')
    .split(',')
    .map(part => part.trim()),
)
const mapEmbedUrl = computed(
  () =>
    businessInfo.value?.map,
)

const socialItems = computed(() => {
  const items = [
    { label: 'Zalo', href: socialRecord.value?.zalo, type: 'text' as const },
    {
      label: 'TikTok', href: socialRecord.value?.tiktok, type: 'svg' as const,
      icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
    },
    {
      label: 'YouTube', href: socialRecord.value?.youtube, type: 'svg' as const,
      icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    },
    {
      label: 'Instagram', href: socialRecord.value?.instagram, type: 'svg' as const,
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
    },
  ]
  return items.filter((item): item is typeof item & { href: string } => Boolean(item.href))
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
const errorMessage = ref('')

async function handleSubmit() {
  submitting.value = true
  errorMessage.value = ''
  try {
    await createFeedback({
      title: 'Customer Feedback Online',
      fullname: form.name,
      phone: form.phone,
      email: form.email,
      content: form.message,
      is_confirm_term: agreeTerms.value ? 1 : 0,
      subject: form.subject,
    })
    submitted.value = true
    form.name = ''
    form.phone = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    agreeTerms.value = false
  } catch {
    errorMessage.value = 'Gửi yêu cầu thất bại. Vui lòng thử lại sau.'
  } finally {
    submitting.value = false
  }
}
</script>
