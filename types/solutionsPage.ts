// Solutions page domain type
// Defines the data structure returned by the CMS "solutions_page" record API

export interface SolutionsPageApiRecord {
  id: number
  title: string
  description: string | null
  banner: string | null
  info: string | null
  created_at: string
  updated_at: string
}
