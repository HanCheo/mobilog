import { kv } from '@vercel/kv'
import { container } from '@/server/core'
import { NotionHqRepository, NotionHqRepositoryToken } from './repository'

type GetTagsResponse = {
  id: string
  color: string
  name: string
}[]

export const getTags = async (): Promise<GetTagsResponse> => {
  const tagInfo = await kv.get<GetTagsResponse>('getTags')

  if (tagInfo) {
    return tagInfo
  }

  const collectionInfo = await container
    .resolve<NotionHqRepository>(NotionHqRepositoryToken)
    .databases.retrieve({
      database_id: process.env.NOTIONHQ_DATABASE_ID
    })

  if (collectionInfo.properties.Tags.type !== 'multi_select') {
    throw new Error('Tags is not multi-select type')
  }

  await kv.setex(
    'getTags',
    60 * 60,
    collectionInfo.properties.Tags.multi_select.options
  )

  return collectionInfo.properties.Tags.multi_select.options
}
