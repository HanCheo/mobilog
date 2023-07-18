import { getTags } from '@/server/services'
import { Catch, Get, SetHeader, createHandler } from 'next-api-decorators'

class Tags {
  @Get()
  @SetHeader(
    'Cache-Control',
    'public, s-maxage=1800, stale-while-revalidate=1500'
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
