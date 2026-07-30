// Introduce page composable
// Thin layer that calls the service -- pages never call API directly

import type { IntroducePageApiRecord } from '~/types'
import { introducePageService } from '~/services/introducePage.service'

export function useIntroducePage() {
  async function fetchIntroducePage(): Promise<IntroducePageApiRecord[]> {
    return introducePageService.getList()
  }

  return { fetchIntroducePage }
}
