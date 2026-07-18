// Order domain type
// Defines the request/response structure for the site order creation API

export interface OrderCartItem {
  product_id: number
  product_variant_id: number
  quantity: number
  unit_price: number
}

export interface OrderCreateRequest {
  carts: OrderCartItem[]
  total_price: number
  discount: number
  email: string
  note: string
  shipping_address: string
  order_address: string
}

export interface OrderRecord {
  id: number
  carts: OrderCartItem[]
  total_price: number
  discount: number
  email: string
  note: string
  shipping_address: string
  order_address: string
  status: number
  user_id: number | null
  created_at: string
  updated_at: string
}

export interface OrderCreateResponse {
  order: OrderRecord
}
