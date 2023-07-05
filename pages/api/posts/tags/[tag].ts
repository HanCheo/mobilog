import { getPageablePostsByTag } from '@/server/services/getAllPostByTagNotionhq'
import { Get, Query, SetHeader, createHandler } from 'next-api-decorators'

type CursorPagiablePostListByTagRequestType = {
  tag: string
  limit: string
  cursor: string
}

class TagPosts {
  @Get()
  @SetHeader(
    'Cache-Control',
    'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
  )
  async cursorPagiablePostListByTag(
    @Query() request: CursorPagiablePostListByTagRequestType
  ) {
    return await getPageablePostsByTag({
      tag: request.tag,
      limit: Number(request.limit),
      cursor: request.cursor
    })
  }
}

export default createHandler(TagPosts)
