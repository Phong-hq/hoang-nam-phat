// News page domain type
// Defines the data structure returned by the CMS "news_page" record API

export interface NewsPageApiRecord {
  id: number
  title: string
  // Admin nhập tay trong CMS; để trống (null) thì FE dựng từ title (xem utils/routes.ts).
  slug?: string | null
  description: string | null
  banner: string | null
  info: string | null
  created_at: string
  updated_at: string
}
