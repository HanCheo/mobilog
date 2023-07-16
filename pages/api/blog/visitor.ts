import 'reflect-metadata'
import { Get, SetHeader, createHandler } from 'next-api-decorators'
import { container } from '@/server/core'
import { GetVisitorCount } from '@/server/services'

class Visitor {
  @Get()
  @SetHeader(
    'Cache-Control',
    'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
  )
  async cursorPagiablePostListByTag() {
    return await container.resolve(GetVisitorCount).execute()
  }
}

export default createHandler(Visitor)
