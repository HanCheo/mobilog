import 'reflect-metadata'
import { Get, Query, SetHeader, createHandler } from 'next-api-decorators'
import { container } from '@/server/core'
import { GetPageablePosts } from '@/server/services/useCases'

type CursorPagiablePostListByTagRequestType = {
  tag?: string
  limit: string
  cursor?: string
}

class PostController {
  @Get()
  @SetHeader(
    'Cache-Control',
    'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
  )
  async cursorPagiablePostList(
    @Query() request: CursorPagiablePostListByTagRequestType
  ) {
    return container.resolve(GetPageablePosts).execute({
      tag: request.tag,
      limit: Number(request.limit),
      cursor: request.cursor
    })
  }
}

export default createHandler(PostController)
