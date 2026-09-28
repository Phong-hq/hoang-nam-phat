// Cart store -- Pinia setup store
// Persists cart items to localStorage so the cart survives page reloads

import { defineStore, skipHydrate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { CartItem } from '~/types'

export const useCartStore = defineStore('cart', () => {
  // The cart only exists in the browser. initOnMounted: read localStorage after
  // mount, so the server-rendered HTML (always an empty cart) and the first
  // client render match. skipHydrate (below): never overwrite the saved cart
  // with the server's empty state when the page hydrates.
  const items = useLocalStorage<CartItem[]>('hnp-cart', [], { initOnMounted: true })

  const totalQuantity = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  function addItem(item: Omit<CartItem, 'quantity'>, quantity = 1) {
    const existing = items.value.find((i) => i.id === item.id)
    console.log(item)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...item, quantity })
    }
  }

  function removeItem(id: number) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function updateQuantity(id: number, quantity: number) {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    const item = items.value.find((i) => i.id === id)
    if (item) item.quantity = quantity
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalQuantity,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
})
