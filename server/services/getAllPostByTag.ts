import { notionhqClient } from '@/server/datasource'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

type GetAllPostByTag = {
  tag: string
  limit: number
  cursor?: string
}

export const getAllPostByTag = async ({
  tag,
  limit,
  cursor
}: GetAllPostByTag): Promise<QueryDatabaseResponse> => {
  return await notionhqClient.databases.query({
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
  })
}
