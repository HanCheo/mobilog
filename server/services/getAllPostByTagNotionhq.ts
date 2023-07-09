import { notionhqClient } from '@/server/datasource'

import {
  GetPageablePostsByTagRequest,
  GetPageablePostsByTagResponse
} from '../types/GetAllPostByTagNotionhqType'

export const getPageablePostsByTag = async ({
  tag,
  limit,
  cursor
}: GetPageablePostsByTagRequest): Promise<GetPageablePostsByTagResponse> =>
  (await notionhqClient.databases.query({
    database_id: process.env.NOTIONHQ_DATABASE_ID,
    sorts: [{ property: 'Published', direction: 'descending' }],
    filter: {
      and: [
        {
          multi_select: {
            contains: tag
          },
          property: 'Tags',
          type: 'multi_select'
        }
      ]
    },
    start_cursor: cursor,
    page_size: limit
  })) as GetPageablePostsByTagResponse
