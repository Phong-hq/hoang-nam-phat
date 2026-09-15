// News page service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, NewsPageApiRecord } from '~/types'

const NEWS_PAGE_API_URL = '/api/v1/frontend/cms/record/news_page'

export const newsPageService = {
  async getList(): Promise<NewsPageApiRecord[]> {
    const res = await httpClient.get<ApiListResponse<NewsPageApiRecord>>(NEWS_PAGE_API_URL)
    return res.items
  },
}
