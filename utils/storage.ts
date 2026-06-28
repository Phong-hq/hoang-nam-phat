// Local/session storage utilities with SSR safety

function safeStorage(type: 'localStorage' | 'sessionStorage') {
  if (typeof window === 'undefined') return null
  return window[type]
}

export const storage = {
  get<T>(key: string): T | null {
    const store = safeStorage('localStorage')
    if (!store) return null
    try {
      const item = store.getItem(key)
      return item ? (JSON.parse(item) as T) : null
    } catch {
      return null
    }
  },
  set<T>(key: string, value: T): void {
    const store = safeStorage('localStorage')
    if (!store) return
    store.setItem(key, JSON.stringify(value))
  },
  remove(key: string): void {
    const store = safeStorage('localStorage')
    if (!store) return
    store.removeItem(key)
  },
  clear(): void {
    const store = safeStorage('localStorage')
    if (!store) return
    store.clear()
  },
}
