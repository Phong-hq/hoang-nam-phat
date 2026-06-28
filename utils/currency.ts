// Currency formatting utilities

import { CURRENCY, CURRENCY_LOCALE } from '~/constants'

export function formatCurrency(amount: number, currency = CURRENCY): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE).format(value)
}

export function discountPercent(original: number, current: number): number {
  if (original <= 0) return 0
  return Math.round(((original - current) / original) * 100)
}
