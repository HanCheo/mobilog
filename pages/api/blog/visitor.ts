import 'reflect-metadata'
import { Get, SetHeader, createHandler } from 'next-api-decorators'
import { container } from '@/server/core'
import { GetVisitorCount } from '@/server/services'
import { hoursToSeconds } from 'date-fns'

class Visitor {
  @Get()
  @SetHeader(
    'Cache-Control',
    `s-maxage=${hoursToSeconds(1)}, stale-while-revalidate=60`
  )
  async cursorPagiablePostListByTag() {
    return await container.resolve(GetVisitorCount).execute()
  }
}

export default createHandler(Visitor)
