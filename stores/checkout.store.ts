import { orderService } from '~/services/order.service'
import { validateCheckout, isCheckoutValid } from '~/validators/checkout.validator'
import { useCartStore } from '~/stores/cart.store'
import type { CheckoutFormData, CheckoutErrors, CheckoutStatus, OrderResult, OrderCreateRequest } from '~/types'

const CUSTOMER_INFO_KEY = 'checkout_customer_info'

type SavedCustomerInfo = Pick<
  CheckoutFormData,
  'gender' | 'fullName' | 'email' | 'phone' | 'province' | 'provinceName' | 'ward' | 'wardName' | 'address'
>

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
          product_variant_id: item.productVariantId,
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
      saveCustomerInfo()
      cartStore.clearCart()
    } catch {
      status.value = 'error'
    }
  }

  function retryAfterError() {
    status.value = 'idle'
  }

  function saveCustomerInfo() {
    const info: SavedCustomerInfo = {
      gender: form.gender,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      province: form.province,
      provinceName: form.provinceName,
      ward: form.ward,
      wardName: form.wardName,
      address: form.address,
    }
    localStorage.setItem(CUSTOMER_INFO_KEY, JSON.stringify(info))
  }

  function loadCustomerInfo() {
    const raw = localStorage.getItem(CUSTOMER_INFO_KEY)
    if (!raw) return

    try {
      const info = JSON.parse(raw) as SavedCustomerInfo
      Object.assign(form, info)
    } catch {
      localStorage.removeItem(CUSTOMER_INFO_KEY)
    }
  }

  function resetOrder() {
    form.gender = 'mr'
    form.fullName = ''
    form.email = ''
    form.phone = ''
    form.province = ''
    form.provinceName = ''
    form.ward = ''
    form.wardName = ''
    form.address = ''
    form.notes = ''
    form.invoiceRequested = false
    form.companyName = ''
    form.taxCode = ''
    form.companyAddress = ''

    Object.keys(touchedFields).forEach((key) => delete touchedFields[key])
    showAllErrors.value = false
    orderResult.value = null
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
    resetOrder,
    saveCustomerInfo,
    loadCustomerInfo,
  }
})
