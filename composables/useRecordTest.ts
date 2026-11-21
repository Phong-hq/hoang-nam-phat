// Record test composable
// Thin layer that calls the service -- pages never call API directly

import { recordTestService } from '~/services/recordTest.service'

export function useRecordTest() {
  async function fetchRecordTest(recordType?: string): Promise<Record<string, unknown>[]> {
    return recordTestService.getList(recordType)
  }

  return { fetchRecordTest }
}
