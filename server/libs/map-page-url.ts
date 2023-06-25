import { parsePageId, uuidToId } from 'notion-utils'
import { getCanonicalPageId } from './get-canonical-page-id'
import { Site } from '@/config/types'

// include UUIDs in page URLs during local development but not in production
// (they're nice for debugging and speed up local dev)

export const mapPageUrl =
  (site: Site, searchParams: URLSearchParams) =>
  (pageId = '') => {
    const pageUuid = parsePageId(pageId, { uuid: true })

    if (uuidToId(pageUuid) === site.rootNotionPageId) {
      return createUrl('/', searchParams)
    } else {
      return createUrl(`/posts/${getCanonicalPageId(pageUuid)}`, searchParams)
    }
  }

export const getCanonicalPageUrl =
  (site: Site) =>
  (pageId = '') => {
    const pageUuid = parsePageId(pageId, { uuid: true })

    if (uuidToId(pageId) === site.rootNotionPageId) {
      return `https://${site.domain}`
    } else {
      return `https://${site.domain}/posts/${getCanonicalPageId(pageUuid)}`
    }
  }

function createUrl(path: string, searchParams: URLSearchParams) {
  return [path, searchParams.toString()].filter(Boolean).join('?')
}
