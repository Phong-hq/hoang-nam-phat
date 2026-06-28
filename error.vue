<template>
  <div class="min-h-screen flex items-center justify-center bg-base-100">
    <div class="text-center p-8 max-w-lg">
      <div class="text-8xl font-bold text-primary mb-4">
        {{ error?.statusCode ?? 500 }}
      </div>
      <h1 class="text-2xl font-bold mb-2">
        {{ errorTitle }}
      </h1>
      <p class="text-base-content/70 mb-8">
        {{ error?.message ?? 'Da co loi xay ra' }}
      </p>
      <div class="flex gap-3 justify-center">
        <button class="btn btn-primary" @click="handleError">
          Ve trang chu
        </button>
        <button class="btn btn-ghost" @click="clearError({ redirect: '/' })">
          Thu lai
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number; message?: string } | null }>()

const errorTitle = computed(() => {
  if (props.error?.statusCode === 404) return 'Trang khong tim thay'
  if (props.error?.statusCode === 403) return 'Khong co quyen truy cap'
  return 'Loi he thong'
})

function handleError() {
  clearError({ redirect: '/' })
}

useSeoMeta({
  title: `Loi ${props.error?.statusCode ?? 500}`,
  robots: 'noindex, nofollow',
})
</script>
