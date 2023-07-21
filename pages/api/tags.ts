import { getTags } from '@/server/services'
import { hoursToSeconds } from 'date-fns'
import { Catch, Get, SetHeader, createHandler } from 'next-api-decorators'

class Tags {
  @Get()
  @SetHeader(
    'Cache-Control',
    `s-maxage=${hoursToSeconds(24)}, stale-while-revalidate=${hoursToSeconds(
      18
    )}`
  )
  @Catch<Error>((error, _, res) => {
    res.status(500).send({ error: `Internal Server Error: ${error.message}` })
  })
  async cursorPagiablePostListByTag() {
    return await getTags().catch((error) => {
      throw new Error(`Notion api error: ${error.message}`)
    })
  }
}

export default createHandler(Tags)
