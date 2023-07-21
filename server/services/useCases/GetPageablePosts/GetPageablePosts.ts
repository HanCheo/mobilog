import {
  GetPageablePostsRequest,
  GetPageablePostsResponse
} from './GetPageablePostsType'
import { UseCase } from '@/server/types'
import { inject, singleton } from 'tsyringe'
import {
  type NotionHqRepository,
  NotionHqRepositoryToken
} from '../../repository'

@singleton()
export class GetPageablePosts
  implements
    UseCase<GetPageablePostsRequest, Promise<GetPageablePostsResponse>>
{
  constructor(
    @inject(NotionHqRepositoryToken)
    private notionHqRepositoy: NotionHqRepository
  ) {}

  public async execute({
    tag,
    limit,
    cursor
  }: GetPageablePostsRequest): Promise<GetPageablePostsResponse> {
    return (await this.notionHqRepositoy.databases.query({
      database_id: process.env.NOTIONHQ_DATABASE_ID,
      sorts: [{ property: 'Published', direction: 'descending' }],
      filter: {
        and: [
          tag && {
            multi_select: {
              contains: tag
            },
            property: 'Tags'
          },
          {
            select: {
              equals: 'Post'
            },
            property: 'type'
          },
          {
            date: {
              is_not_empty: true
            },
            property: 'Published'
          } as const
        ].filter(Boolean)
      },
      start_cursor: cursor,
      page_size: limit
    })) as GetPageablePostsResponse
  }
}
