// Feedback composable
// Thin layer that calls the service -- pages never call API directly

import { feedbackService } from '~/services/feedback.service'
import type { FeedbackCreateRequest } from '~/types'

export function useFeedback() {
  async function createFeedback(payload: FeedbackCreateRequest) {
    return feedbackService.create(payload)
  }

  return { createFeedback }
}
