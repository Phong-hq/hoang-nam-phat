<template>
  <div class="join">
    <button
      class="join-item btn btn-sm"
      :disabled="currentPage <= 1"
      @click="$emit('change', currentPage - 1)"
    >
      Prev
    </button>
    <button
      v-for="page in visiblePages"
      :key="page"
      :class="['join-item btn btn-sm', { 'btn-active': page === currentPage }]"
      @click="$emit('change', page)"
    >{{ page }}</button>
    <button
      class="join-item btn btn-sm"
      :disabled="currentPage >= totalPages"
      @click="$emit('change', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
}
const props = defineProps<Props>()
defineEmits<{ change: [page: number] }>()

const visiblePages = computed(() => {
  const range: number[] = []
  const delta = 2
  const left = Math.max(1, props.currentPage - delta)
  const right = Math.min(props.totalPages, props.currentPage + delta)
  for (let i = left; i <= right; i++) range.push(i)
  return range
})
</script>
