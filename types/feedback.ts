// Feedback domain type
// Defines the request/response structure for the site feedback API

export interface FeedbackCreateRequest {
  title: string
  fullname: string
  phone: string
  email: string
  content: string
  is_confirm_term: number
}

export interface FeedbackRecord {
  id: number
  subject: string
  title: string
  fullname: string
  phone: string
  email: string
  content: string
  is_confirm_term: number
  status: number
  user_id: number | null
  created_at: string
  updated_at: string
}

export interface FeedbackCreateResponse {
  feedback: FeedbackRecord
}
