<template>
  <TransitionGroup tag="div" name="toast" class="toast toast-top toast-end z-[100] gap-3 p-4">
    <div
      v-for="toast in uiStore.toasts"
      :key="toast.id"
      class="toast-card relative flex w-80 max-w-[90vw] items-start gap-3 overflow-hidden rounded-xl border-l-4 bg-base-100 p-4 shadow-lg ring-1 ring-base-300/60"
      :class="borderClass(toast.type)"
      @mouseenter="onEnter(toast.id)"
      @mouseleave="onLeave(toast.id)"
    >
      <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" :class="iconBgClass(toast.type)">
        <svg v-if="toast.type === 'success'" viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5" :class="iconColorClass(toast.type)">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
        </svg>
        <svg v-else-if="toast.type === 'error'" viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5" :class="iconColorClass(toast.type)">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 10-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
        </svg>
        <svg v-else-if="toast.type === 'warning'" viewBox="0 0 24 24" fill="currentColor" class="h-3.5 w-3.5" :class="iconColorClass(toast.type)">
          <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.598 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
        </svg>
        <svg v-else viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5" :class="iconColorClass(toast.type)">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
        </svg>
      </span>

      <div class="min-w-0 flex-1 pt-0.5">
        <p v-if="toast.title" class="text-sm font-semibold leading-tight text-base-content">{{ toast.title }}</p>
        <p class="text-sm leading-snug text-base-content/80" :class="{ 'font-medium text-base-content': !toast.title }">
          {{ toast.message }}
        </p>
      </div>

      <button
        class="btn btn-ghost btn-xs btn-circle shrink-0 text-base-content/40 hover:bg-base-200 hover:text-base-content"
        aria-label="Đóng thông báo"
        @click="uiStore.removeToast(toast.id)"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>

      <div
        v-if="(toast.duration ?? 0) > 0"
        class="toast-progress absolute inset-x-0 bottom-0 h-1 origin-left"
        :class="progressClass(toast.type)"
        :style="{ animationDuration: `${toast.duration}ms`, animationPlayState: pausedIds.has(toast.id) ? 'paused' : 'running' }"
      />
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useUiStore } from '~/stores/ui.store'

const uiStore = useUiStore()
const pausedIds = reactive(new Set<string>())

function onEnter(id: string) {
  pausedIds.add(id)
  uiStore.pauseToast(id)
}

function onLeave(id: string) {
  pausedIds.delete(id)
  uiStore.resumeToast(id)
}

function borderClass(type: string) {
  const map: Record<string, string> = {
    success: 'border-success',
    error: 'border-error',
    warning: 'border-warning',
    info: 'border-info',
  }
  return map[type] ?? 'border-info'
}

function iconBgClass(type: string) {
  const map: Record<string, string> = {
    success: 'bg-success/10',
    error: 'bg-error/10',
    warning: 'bg-warning/10',
    info: 'bg-info/10',
  }
  return map[type] ?? 'bg-info/10'
}

function iconColorClass(type: string) {
  const map: Record<string, string> = {
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
    info: 'text-info',
  }
  return map[type] ?? 'text-info'
}

function progressClass(type: string) {
  const map: Record<string, string> = {
    success: 'bg-success/50',
    error: 'bg-error/50',
    warning: 'bg-warning/50',
    info: 'bg-info/50',
  }
  return map[type] ?? 'bg-info/50'
}
</script>

<style scoped>
.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(2rem) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(1rem) scale(0.95);
}
.toast-leave-active {
  position: absolute;
  width: 20rem;
}

.toast-progress {
  animation-name: toast-shrink;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes toast-shrink {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}
</style>
