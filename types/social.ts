// Social links domain type
// Defines the data structure returned by the CMS "social" record API

export interface SocialApiRecord {
  id: number
  tiktok: string | null
  zalo: string | null
  facebook: string | null
  youtube: string | null
  instagram: string | null
  created_at: string
  updated_at: string
}
