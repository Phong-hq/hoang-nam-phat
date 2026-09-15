// UI store -- manages global UI state (modals, toasts)

import { defineStore } from 'pinia'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  title?: string
  duration?: number
}

interface ToastTimer {
  timeoutId: ReturnType<typeof setTimeout>
  remaining: number
  start: number
}

export const useUiStore = defineStore('ui', () => {
  const toasts = ref<Toast[]>([])
  const isDrawerOpen = ref(false)
  const isMobileMenuOpen = ref(false)
  const timers = new Map<string, ToastTimer>()

  function addToast(toast: Omit<Toast, 'id'>) {
    const id = Math.random().toString(36).slice(2)
    const duration = toast.duration ?? 3500
    toasts.value.push({ ...toast, id, duration })
    if (duration > 0) {
      timers.set(id, { timeoutId: setTimeout(() => removeToast(id), duration), remaining: duration, start: Date.now() })
    }
    return id
  }

  function removeToast(id: string) {
    const timer = timers.get(id)
    if (timer) {
      clearTimeout(timer.timeoutId)
      timers.delete(id)
    }
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function pauseToast(id: string) {
    const timer = timers.get(id)
    if (!timer) return
    clearTimeout(timer.timeoutId)
    timer.remaining -= Date.now() - timer.start
  }

  function resumeToast(id: string) {
    const timer = timers.get(id)
    if (!timer) return
    timer.start = Date.now()
    timer.timeoutId = setTimeout(() => removeToast(id), Math.max(timer.remaining, 0))
  }

  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  return {
    toasts,
    isDrawerOpen,
    isMobileMenuOpen,
    addToast,
    removeToast,
    pauseToast,
    resumeToast,
    toggleDrawer,
    toggleMobileMenu,
  }
})
