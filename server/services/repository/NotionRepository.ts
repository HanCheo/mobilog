import type { OptionsOfJSONResponseBody } from 'got'
import * as notion from 'notion-types'

export type GetPageOptions = {
  concurrency?: number
  fetchMissingBlocks?: boolean
  fetchCollections?: boolean
  signFileUrls?: boolean
  chunkLimit?: number
  chunkNumber?: number
  gotOptions?: OptionsOfJSONResponseBody
}

export interface PermissionRecord {
  table: string
  id: notion.ID
}

export interface SignedUrlRequest {
  permissionRecord: PermissionRecord
  url: string
}
export interface SignedUrlResponse {
  signedUrls: string[]
}

export interface NotionRepository {
  getPage: (
    pageId: string,
    _?: GetPageOptions
  ) => Promise<notion.ExtendedRecordMap>
  getPageRaw: (
    pageId: string,
    _: {
      chunkLimit?: number
      chunkNumber?: number
      gotOptions?: OptionsOfJSONResponseBody
    }
  ) => Promise<notion.PageChunk>
  getCollectionData: (
    collectionId: string,
    collectionViewId: string,
    collectionView: any,
    _: {
      sort?: {
        propertiy: string
        driection: 'decending'
      }
      type?: notion.CollectionViewType
      limit?: number
      searchQuery?: string
      userTimeZone?: string
      userLocale?: string
      loadContentCover?: boolean
      gotOptions?: OptionsOfJSONResponseBody
    }
  ) => Promise<notion.CollectionInstance>
  getUsers: (
    userIds: string[],
    gotOptions?: OptionsOfJSONResponseBody
  ) => Promise<notion.RecordValues<notion.User>>
  getBlocks: (
    blockIds: string[],
    gotOptions?: OptionsOfJSONResponseBody
  ) => Promise<notion.PageChunk>
  getSignedFileUrls: (
    urls: SignedUrlRequest[],
    gotOptions?: OptionsOfJSONResponseBody
  ) => Promise<SignedUrlResponse>
  search: (
    params: notion.SearchParams,
    gotOptions?: OptionsOfJSONResponseBody
  ) => Promise<notion.SearchResults>
}

export const NotionRepositoryToken = Symbol.for('notion-repository')
