import { Post } from '@/server/types'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

export type GetPageablePostsRequest = {
  tag?: string
  limit: number
  cursor?: string
}

export type GetPageablePostsResponse = Omit<
  QueryDatabaseResponse,
  'results'
> & {
  results: Array<Post>
}
