// Currency formatting utilities

import { CURRENCY, CURRENCY_LOCALE } from '~/constants'

export function formatCurrency(amount: number, currency = CURRENCY): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Selling-price display: the ERP returns 0 (or nothing) for products whose price
// isn't published yet -- show a label instead of "0 ₫". Use formatCurrency for
// amounts where zero is a real value (cart subtotal, discount, order total).
export function formatPrice(amount?: number | null, currency = CURRENCY): string {
  if (amount == null || amount <= 0) return 'Giá thỏa thuận'
  return formatCurrency(amount, currency)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE).format(value)
}

export function discountPercent(original: number, current: number): number {
  if (original <= 0) return 0
  return Math.round(((original - current) / original) * 100)
}
