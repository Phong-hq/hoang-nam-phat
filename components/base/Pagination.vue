<template>
  <nav class="join" aria-label="Phân trang">
    <component
      :is="tagFor(currentPage - 1)"
      v-bind="attrsFor(currentPage - 1)"
      class="join-item btn btn-sm"
      :class="{ 'btn-disabled': currentPage <= 1 }"
      :disabled="currentPage <= 1 || undefined"
      rel="prev"
      @click="go($event, currentPage - 1)"
    >
      Prev
    </component>
    <component
      :is="tagFor(page)"
      v-for="page in visiblePages"
      :key="page"
      v-bind="attrsFor(page)"
      :class="['join-item btn btn-sm', { 'btn-active': page === currentPage }]"
      :aria-current="page === currentPage ? 'page' : undefined"
      @click="go($event, page)"
    >{{ page }}</component>
    <component
      :is="tagFor(currentPage + 1)"
      v-bind="attrsFor(currentPage + 1)"
      class="join-item btn btn-sm"
      :class="{ 'btn-disabled': currentPage >= totalPages }"
      :disabled="currentPage >= totalPages || undefined"
      rel="next"
      @click="go($event, currentPage + 1)"
    >
      Next
    </component>
  </nav>
</template>

<script setup lang="ts">
// Khi truyền `pageHref`, mỗi nút là một link <a href> thật để Google đi được sang
// trang 2, 3... (Google không bấm <button>). Bấm vẫn chạy qua sự kiện `change` như cũ,
// nên trang dùng component này không phải đổi cách xử lý.
interface Props {
  currentPage: number
  totalPages: number
  pageHref?: (page: number) => string
}
const props = defineProps<Props>()
const emit = defineEmits<{ change: [page: number] }>()

const visiblePages = computed(() => {
  const range: number[] = []
  const delta = 2
  const left = Math.max(1, props.currentPage - delta)
  const right = Math.min(props.totalPages, props.currentPage + delta)
  for (let i = left; i <= right; i++) range.push(i)
  return range
})

function isValid(page: number) {
  return page >= 1 && page <= props.totalPages
}

function tagFor(page: number) {
  return props.pageHref && isValid(page) ? 'a' : 'button'
}

function attrsFor(page: number) {
  if (props.pageHref && isValid(page)) return { href: props.pageHref(page) }
  return { type: 'button' }
}

function go(event: MouseEvent, page: number) {
  // Giữ Ctrl/Cmd + click để mở tab mới như link bình thường.
  if (event.ctrlKey || event.metaKey || event.shiftKey) return
  event.preventDefault()
  if (!isValid(page) || page === props.currentPage) return
  emit('change', page)
}
</script>
