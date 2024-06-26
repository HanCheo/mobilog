import 'reflect-metadata'
import { Get, Query, SetHeader, createHandler } from 'next-api-decorators'
import { container } from '@/server/core'
import { GetPageablePosts, GetPopulerPosts } from '@/server/services/useCases'
import { hoursToSeconds, minutesToSeconds } from 'date-fns'

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
    `s-maxage=${hoursToSeconds(1)}, stale-while-revalidate=${minutesToSeconds(
      40
    )}`
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
    `s-maxage=${hoursToSeconds(1)}, stale-while-revalidate=${minutesToSeconds(
      40
    )}`
  )
  async papulerPostList(@Query() request: PapulerPostListRequest) {
    return container.resolve(GetPopulerPosts).execute({
      limit: Number(request.limit) ?? 0
    })
  }
}

export default createHandler(PostController)
