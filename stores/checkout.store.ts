import { orderService } from '~/services/order.service'
import { validateCheckout, isCheckoutValid } from '~/validators/checkout.validator'
import { useCartStore } from '~/stores/cart.store'
import type { CheckoutFormData, CheckoutErrors, CheckoutStatus, OrderResult, OrderCreateRequest } from '~/types'

export const useCheckoutStore = defineStore('checkout', () => {
  const cartStore = useCartStore()
  const form = reactive<CheckoutFormData>({
    gender: 'mr',
    fullName: '',
    email: '',
    phone: '',
    province: '',
    provinceName: '',
    ward: '',
    wardName: '',
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

  const items = computed(() => cartStore.items)
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
    cartStore.updateQuantity(id, Math.max(1, quantity))
  }

  function removeItem(id: number) {
    cartStore.removeItem(id)
  }

  async function submit() {
    if (!validateAll() || !items.value.length) return
console.log(form);

    status.value = 'submitting'
    try {
      const fullAddress = [form.address, form.wardName, form.provinceName].filter(Boolean).join(', ')
      const address = JSON.stringify({
        name: form.fullName,
        phone: form.phone,
        address: fullAddress,
      })

      const payload: OrderCreateRequest = {
        carts: items.value.map((item) => ({
          product_id: item.productId,
          product_variant_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
        })),
        total_price: subtotal.value - discount.value,
        discount: discount.value,
        email: form.email,
        note: form.notes,
        shipping_address: address,
        order_address: address,
      }

      const { order } = await orderService.create(payload)
      orderResult.value = {
        orderId: String(order.id),
        status: 'success',
        message: 'Đặt hàng thành công',
      }
      status.value = 'success'
      cartStore.clearCart()
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
