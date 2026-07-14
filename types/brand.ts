// Brand domain types
// Defines the brand data structure returned by the ERP frontend API

export interface Brand {
  id: number
  name: string
  type: string | null
  code: string
  description: string
  icon: unknown
  images: unknown
  color: string | null
  priority: number
  parent_id: number | null
}
