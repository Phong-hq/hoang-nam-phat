<template>
  <div class="toast toast-top toast-end z-50">
    <TransitionGroup name="toast">
      <div
        v-for="toast in uiStore.toasts"
        :key="toast.id"
        :class="['alert', alertClass(toast.type)]"
      >
        <span>{{ toast.message }}</span>
        <button class="btn btn-xs btn-ghost" @click="uiStore.removeToast(toast.id)">x</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '~/stores/ui.store'
const uiStore = useUiStore()
function alertClass(type: string) {
  const map: Record<string, string> = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info',
  }
  return map[type] ?? 'alert-info'
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
