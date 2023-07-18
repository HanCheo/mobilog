import 'reflect-metadata'
import { Get, SetHeader, createHandler } from 'next-api-decorators'
import { container } from '@/server/core'
import { GetVisitorCount } from '@/server/services'

class Visitor {
  @Get()
  @SetHeader(
    'Cache-Control',
    'public, s-maxage=1800, stale-while-revalidate=1500'
  )
  async cursorPagiablePostListByTag() {
    return await container.resolve(GetVisitorCount).execute()
  }
}

export default createHandler(Visitor)
