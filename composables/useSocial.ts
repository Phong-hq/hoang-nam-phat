// Social composable
// Thin layer that calls the service -- pages never call API directly

import type { SocialApiRecord } from '~/types'
import { socialService } from '~/services/social.service'

export function useSocial() {
  async function fetchSocialLinks(): Promise<SocialApiRecord[]> {
    return socialService.getList()
  }

  return { fetchSocialLinks }
}
