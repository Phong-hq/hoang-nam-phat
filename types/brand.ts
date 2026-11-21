// Brand domain types
// Defines the brand data structure returned by the ERP frontend API

export interface Brand {
  id: number
  name: string
  type: string | null
  code: string
  description: string
  icon: string[] | null
  images: unknown
  color: string | null
  priority: number
  parent_id: number | null
  show_on_home: number
  // Meta SEO admin nhập tay (null = tự sinh như cũ).
  meta_title?: string | null
  meta_description?: string | null
  // HTML giới thiệu -- chỉ API view trả (không có trong danh sách).
  seo_content?: string | null
}
