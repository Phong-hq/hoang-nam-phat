<template>
  <div class="layout-default flex flex-col min-h-screen">
    <LayoutHeader />
    <main class="flex-1 flex items-center justify-center bg-base-100">
      <div class="text-center p-8 max-w-lg">
        <div class="text-8xl font-bold text-primary mb-4">
          {{ error?.statusCode ?? 500 }}
        </div>
        <h1 class="text-2xl font-bold mb-2">
          {{ errorTitle }}
        </h1>
        <p class="text-base-content/70 mb-8">
          {{ error?.message ?? 'Đã có lỗi xảy ra' }}
        </p>
        <div class="flex gap-3 justify-center">
          <button class="btn btn-primary" @click="handleError">
            Về trang chủ
          </button>
          <button class="btn btn-ghost" @click="clearError({ redirect: '/' })">
            Thử lại
          </button>
        </div>
      </div>
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number; message?: string } | null }>()

const errorTitle = computed(() => {
  if (props.error?.statusCode === 404) return 'Không tìm thấy trang'
  if (props.error?.statusCode === 403) return 'Không có quyền truy cập'
  return 'Lỗi hệ thống'
})

function handleError() {
  clearError({ redirect: '/' })
}

useSeoMeta({
  title: `Lỗi ${props.error?.statusCode ?? 500}`,
  robots: 'noindex, nofollow',
})
</script>
