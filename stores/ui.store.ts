// UI store -- manages global UI state (modals, toasts, theme)

import { defineStore } from 'pinia'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

export const useUiStore = defineStore('ui', () => {
  const toasts = ref<Toast[]>([])
  const isDrawerOpen = ref(false)
  const isMobileMenuOpen = ref(false)
  const theme = ref<'light' | 'dark'>('light')

  function addToast(toast: Omit<Toast, 'id'>) {
    const id = Math.random().toString(36).slice(2)
    toasts.value.push({ ...toast, id })
    const duration = toast.duration ?? 3000
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration)
    }
  }

  function removeToast(id: string) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  function setTheme(t: 'light' | 'dark') {
    theme.value = t
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', t)
    }
  }

  return {
    toasts,
    isDrawerOpen,
    isMobileMenuOpen,
    theme,
    addToast,
    removeToast,
    toggleDrawer,
    toggleMobileMenu,
    setTheme,
  }
})
