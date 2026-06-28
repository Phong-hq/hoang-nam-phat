<template>
  <div class="dropdown" :class="{ 'dropdown-open': isOpen }">
    <button tabindex="0" class="btn" @click="isOpen = !isOpen">
      {{ label }}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
}
defineProps<Props>()
const isOpen = ref(false)
</script>
