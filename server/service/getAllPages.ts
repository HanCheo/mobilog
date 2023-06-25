import { getAllPagesInSpace, uuidToId } from 'notion-utils'
import pMemoize from 'p-memoize'
import { getCanonicalPageId } from '../lib/get-canonical-page-id'
import { notion } from '../lib/notion-api'
import * as types from '@/config/types'

const getPage = async (pageId: string, ...args) => {
  console.log(`\n notion get page: ${uuidToId(pageId)} ${args}`)
  return notion.getPage(pageId, ...args)
}

const getPageMemo = pMemoize(getPage, {
  cacheKey: (...args) => JSON.stringify(args)
})

const getAllPagesImpl = async (
  rootNotionPageId: string,
  rootNotionSpaceId: string
): Promise<Partial<types.SiteMap>> => {
  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    getPageMemo
  )

  const canonicalPageMap = Object.keys(pageMap).reduce(
    (map, pageId: string) => {
      const recordMap = pageMap[pageId]
      if (!recordMap) {
        throw new Error(`Error loading page "${pageId}"`)
      }

      const canonicalPageId = getCanonicalPageId(pageId)

      if (map[canonicalPageId]) {
        // you can have multiple pages in different collections that have the same id
        // TODO: we may want to error if neither entry is a collection page
        console.warn('error duplicate canonical page id', {
          canonicalPageId,
          pageId,
          existingPageId: map[canonicalPageId]
        })

        return map
      } else {
        return {
          ...map,
          [canonicalPageId]: pageId
        }
      }
    },
    {}
  )

  return {
    pageMap,
    canonicalPageMap
  }
}

export const getAllPages = pMemoize(getAllPagesImpl, {
  cacheKey: (...args) => JSON.stringify(args)
})
