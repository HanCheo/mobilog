import { getTags } from '@/server/services'
import { Get, SetHeader, createHandler } from 'next-api-decorators'


class Tags {
  @Get()
  @SetHeader(
    'Cache-Control',
    'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
  )
  async cursorPagiablePostListByTag() {
    return await getTags().catch((error) => {
      throw new Error( `Notion api error: ${error.message}`)
    })
  }
}

export default createHandler(Tags)
