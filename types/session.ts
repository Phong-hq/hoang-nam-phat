// Session domain type
// Defines the data structure returned by the CMS "dashboard_session" record API

export interface SessionBrand {
  id: number
  name: string
  icon: unknown
  slug: string
}

export interface SessionCategory {
  id: number
  name: string
  icon: unknown
  slug: string
}

export interface SessionRecord {
  id: number
  title: string
  sub_title: string
  brand: SessionBrand[]
  category: SessionCategory
  created_at: string
  updated_at: string
  order: number | null
}
