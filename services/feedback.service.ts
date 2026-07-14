// Feedback service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { FeedbackCreateRequest, FeedbackCreateResponse } from '~/types'

const FEEDBACK_CREATE_API_URL = '/api/v1/frontend/feedback/site/create'

export const feedbackService = {
  async create(payload: FeedbackCreateRequest): Promise<FeedbackCreateResponse> {
    return httpClient.post<FeedbackCreateResponse>(FEEDBACK_CREATE_API_URL, payload)
  },
}
