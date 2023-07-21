import 'reflect-metadata'
import { Get, Query, SetHeader, createHandler } from 'next-api-decorators'
import { container } from '@/server/core'
import { GetPageablePosts, GetPopulerPosts } from '@/server/services/useCases'

type CursorPagiablePostListByTagRequest = {
  tag?: string
  limit: string
  cursor?: string
}

type PapulerPostListRequest = {
  limit: string
}

class PostController {
  @Get()
  @SetHeader(
    'Cache-Control',
    'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
  )
  async cursorPagiablePostList(
    @Query() request: CursorPagiablePostListByTagRequest
  ) {
    return container.resolve(GetPageablePosts).execute({
      tag: request.tag,
      limit: Number(request.limit),
      cursor: request.cursor
    })
  }

  @Get('/populer')
  @SetHeader(
    'Cache-Control',
    'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
  )
  async papulerPostList(@Query() request: PapulerPostListRequest) {
    return container.resolve(GetPopulerPosts).execute({
      limit: Number(request.limit) ?? 0
    })
  }
}

export default createHandler(PostController)
