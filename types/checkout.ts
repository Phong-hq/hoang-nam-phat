export interface CheckoutFormData {
  gender: 'mr' | 'ms'
  fullName: string
  email: string
  phone: string
  province: string
  provinceName: string
  ward: string
  wardName: string
  address: string
  notes: string
  invoiceRequested: boolean
  companyName: string
  taxCode: string
  companyAddress: string
}

export interface CartItem {
  id: number
  productId: number
  name: string
  thumbnail: string
  price: number
  originalPrice?: number
  discount?: number
  quantity: number
  slug: string
}

export interface OrderResult {
  orderId: string
  status: 'success' | 'error'
  message: string
}

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface CheckoutErrors {
  fullName?: string
  email?: string
  phone?: string
  province?: string
  address?: string
  companyName?: string
  taxCode?: string
  companyAddress?: string
}
