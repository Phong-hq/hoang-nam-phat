// Form validation utilities

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isPhone(value: string): boolean {
  return /^(0|\+84)[3-9]\d{8}$/.test(value.replace(/\s/g, ''))
}

export function isUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export function minLength(value: string, min: number): boolean {
  return value.trim().length >= min
}

export function maxLength(value: string, max: number): boolean {
  return value.trim().length <= max
}

export function required(value: unknown): boolean {
  if (typeof value === 'string') return value.trim().length > 0
  return value !== null && value !== undefined
}
