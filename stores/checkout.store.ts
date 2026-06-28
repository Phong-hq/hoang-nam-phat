import { submitOrder } from '~/services/checkout.service'
import { validateCheckout, isCheckoutValid } from '~/validators/checkout.validator'
import type { CartItem, CheckoutFormData, CheckoutErrors, CheckoutStatus, OrderResult } from '~/types'

const MOCK_CART: CartItem[] = [
  {
    id: 1,
    productId: 1,
    name: 'iPhone 16 Pro Max 256GB - Titan Đen',
    thumbnail: '/images/products/iphone-16-pro-max.jpg',
    price: 30000000,
    originalPrice: 33000000,
    discount: 9,
    quantity: 1,
    slug: 'iphone-16-pro-max',
  },
  {
    id: 2,
    productId: 2,
    name: 'Samsung Galaxy S25 Ultra 512GB',
    thumbnail: '/images/products/galaxy-s25-ultra.jpg',
    price: 28000000,
    originalPrice: 30000000,
    discount: 7,
    quantity: 1,
    slug: 'samsung-galaxy-s25-ultra',
  },
]

export const useCheckoutStore = defineStore('checkout', () => {
  const form = reactive<CheckoutFormData>({
    gender: 'mr',
    fullName: '',
    email: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    address: '',
    notes: '',
    invoiceRequested: false,
    companyName: '',
    taxCode: '',
    companyAddress: '',
  })

  const touchedFields = reactive<Record<string, boolean>>({})
  const showAllErrors = ref(false)

  const allErrors = computed<CheckoutErrors>(() => validateCheckout(form))

  const errors = computed<CheckoutErrors>(() => {
    if (showAllErrors.value) return allErrors.value
    return Object.fromEntries(
      Object.entries(allErrors.value).filter(([key]) => touchedFields[key]),
    ) as CheckoutErrors
  })

  const items = ref<CartItem[]>([...MOCK_CART])
  const status = ref<CheckoutStatus>('idle')
  const orderResult = ref<OrderResult | null>(null)

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )
  const shippingFee = computed(() => (subtotal.value >= 10000000 ? 0 : 30000))
  const discount = computed(() => 0)
  const total = computed(() => subtotal.value + shippingFee.value - discount.value)

  function touch(field: string) {
    touchedFields[field] = true
  }

  function validateAll(): boolean {
    showAllErrors.value = true
    return isCheckoutValid(allErrors.value)
  }

  function updateQuantity(id: number, quantity: number) {
    const item = items.value.find((i) => i.id === id)
    if (item) item.quantity = Math.max(1, quantity)
  }

  function removeItem(id: number) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  async function submit() {
    if (!validateAll() || !items.value.length) return

    status.value = 'submitting'
    try {
      const result = await submitOrder({
        form: { ...form },
        items: items.value,
        summary: {
          subtotal: subtotal.value,
          shippingFee: shippingFee.value,
          discount: discount.value,
          total: total.value,
        },
      })
      orderResult.value = result
      status.value = 'success'
    } catch {
      status.value = 'error'
    }
  }

  function retryAfterError() {
    status.value = 'idle'
  }

  return {
    form,
    errors,
    allErrors,
    items,
    status,
    orderResult,
    subtotal,
    shippingFee,
    discount,
    total,
    touch,
    validateAll,
    updateQuantity,
    removeItem,
    submit,
    retryAfterError,
  }
})
