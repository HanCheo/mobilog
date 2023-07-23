import { getTags } from '@/server/services'
import { hoursToSeconds, minutesToSeconds } from 'date-fns'
import { Catch, Get, SetHeader, createHandler } from 'next-api-decorators'

class Tags {
  @Get()
  @SetHeader(
    'Cache-Control',
    `s-maxage=${hoursToSeconds(1)}, stale-while-revalidate=${minutesToSeconds(
      40
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
