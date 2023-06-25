import { parsePageId } from 'notion-utils'

import { inversePageUrlOverrides } from '@/config/config'

export function getCanonicalPageId(pageId: string): string | null {
  const cleanPageId = parsePageId(pageId, { uuid: false })
  if (!cleanPageId) {
    return null
  }

  const override = inversePageUrlOverrides[cleanPageId]
  if (override) {
    return override
  } else {
    return cleanPageId
  }
}
