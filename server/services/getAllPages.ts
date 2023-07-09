import 'reflect-metadata'
import { SiteMap } from '@/config/types'
import { getAllPagesInSpace, uuidToId } from 'notion-utils'
import pMemoize from 'p-memoize'
import { container } from 'tsyringe'
import { getCanonicalPageId } from '../libs/get-canonical-page-id'
import {
  GetPageOptions,
  NotionRepository,
  NotionRepositoryToken
} from './repository'

const getPage = async (pageId: string, options?: GetPageOptions) => {
  console.log(`\n notion get page: ${uuidToId(pageId)} ${options}`)
  return container
    .resolve<NotionRepository>(NotionRepositoryToken)
    .getPage(pageId, options)
}
1
const getPageMemo = pMemoize(getPage, {
  cacheKey: (...args) => JSON.stringify(args)
})

const getAllPagesImpl = async (
  rootNotionPageId: string,
  rootNotionSpaceId: string
): Promise<Partial<SiteMap>> => {
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
