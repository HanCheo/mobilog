import * as config from '@/config/config'
import {
  isPreviewImageSupportEnabled,
  navigationLinks,
  navigationStyle,
  pageUrlAdditions,
  pageUrlOverrides,
  site
} from '@/config/config'
import * as types from '@/config/types'
import { ExtendedRecordMap, PageError, Site, SiteMap } from '@/config/types'
import { getCanonicalPageId } from '@/lib/get-canonical-page-id'
import { getAllPagesInSpace, mergeRecordMaps, parsePageId } from 'notion-utils'
import pMap from 'p-map'
import { pMemoizeDecorator } from 'p-memoize'
import { inject, singleton } from 'tsyringe'
import * as acl from '../libs/acl'
import { getPreviewImageMap } from './getPreviewImage'
import type { NotionRepository } from './repository'
import { NotionRepositoryToken } from './repository'

@singleton()
export class NotionService {
  constructor(
    @inject(NotionRepositoryToken) private notionRepository: NotionRepository
  ) {}

  private async getNavigationLinkPages(): Promise<ExtendedRecordMap[]> {
    const navigationLinkPageIds = (navigationLinks || [])
      .map((link) => link.pageId)
      .filter(Boolean)

    if (navigationStyle !== 'default' && navigationLinkPageIds.length) {
      return pMap(
        navigationLinkPageIds,
        async (navigationLinkPageId) =>
          this.notionRepository.getPage(navigationLinkPageId, {
            chunkLimit: 1,
            fetchMissingBlocks: false,
            fetchCollections: false,
            signFileUrls: false
          }),
        {
          concurrency: 4
        }
      )
    }

    return []
  }

  @pMemoizeDecorator()
  public async getPage(pageId: string): Promise<ExtendedRecordMap> {
    let recordMap = await this.notionRepository.getPage(pageId)

    if (navigationStyle !== 'default') {
      // ensure that any pages linked to in the custom navigation header have
      // their block info fully resolved in the page record map so we know
      // the page title, slug, etc.
      const navigationLinkRecordMaps = await this.getNavigationLinkPages()

      if (navigationLinkRecordMaps?.length) {
        recordMap = navigationLinkRecordMaps.reduce(
          (map, navigationLinkRecordMap) =>
            mergeRecordMaps(map, navigationLinkRecordMap),
          recordMap
        )
      }
    }

    if (isPreviewImageSupportEnabled) {
      const previewImageMap = await getPreviewImageMap(recordMap)
      ;(recordMap as any).preview_images = previewImageMap
    }

    return recordMap
  }

  @pMemoizeDecorator()
  public async getAllPages(
    rootNotionPageId: string,
    rootNotionSpaceId: string
  ): Promise<Partial<SiteMap>> {
    const pageMap = await getAllPagesInSpace(
      rootNotionPageId,
      rootNotionSpaceId,
      this.notionRepository.getPage
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

  private TYPE_PROPERTIES_NAME = 'xnm['

  private isPostType = (page: types.Block) => {
    return page?.properties?.[this.TYPE_PROPERTIES_NAME]?.[0][0] === 'Post'
  }

  @pMemoizeDecorator()
  public async getAllPosts() {
    const partialSiteMap = await this.getAllPages(
      config.rootNotionPageId,
      config.rootNotionSpaceId
    )
    const allPages = Object.entries(partialSiteMap.canonicalPageMap)

    const allPosts = allPages.filter(([, pageId]) => {
      const page = partialSiteMap.pageMap[pageId].block[pageId].value

      return this.isPostType(page)
    })

    return allPosts
  }

  @pMemoizeDecorator()
  public async getSiteMap(): Promise<types.SiteMap> {
    const partialSiteMap = await this.getAllPages(
      config.rootNotionPageId,
      config.rootNotionSpaceId
    )

    return {
      site: config.site,
      ...partialSiteMap
    } as types.SiteMap
  }

  @pMemoizeDecorator()
  public async resolveNotionPage(rawPageId?: string): Promise<
    | {
        error: {
          message: string
          statusCode: number
        }
      }
    | {
        site: Site
        recordMap: ExtendedRecordMap
        pageId: string
        error?: PageError
      }
  > {
    let pageId: string
    let recordMap: ExtendedRecordMap

    if (rawPageId && rawPageId !== 'index') {
      pageId = parsePageId(rawPageId)

      if (!pageId) {
        // check if the site configuration provides an override or a fallback for
        // the page's URI
        const override =
          pageUrlOverrides[rawPageId] || pageUrlAdditions[rawPageId]

        if (override) {
          pageId = parsePageId(override)
        }
      }

      if (pageId) {
        recordMap = await this.getPage(pageId)
      } else {
        // handle mapping of user-friendly canonical page paths to Notion page IDs
        // e.g., /developer-x-entrepreneur versus /71201624b204481f862630ea25ce62fe
        const siteMap = await this.getSiteMap()
        pageId = siteMap?.canonicalPageMap[rawPageId]

        if (pageId) {
          // TODO: we're not re-using the page recordMap from siteMaps because it is
          // cached aggressively
          // recordMap = siteMap.pageMap[pageId]

          recordMap = await this.getPage(pageId)
        } else {
          // note: we're purposefully not caching URI to pageId mappings for 404s
          return {
            error: {
              message: `Not found "${rawPageId}"`,
              statusCode: 404
            }
          }
        }
      }
    } else {
      pageId = site.rootNotionPageId

      recordMap = await this.getPage(pageId)
    }

    const props = { site, recordMap, pageId }
    return { ...props, ...acl.pageAcl(props) }
  }
}
