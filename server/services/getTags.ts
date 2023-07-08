import { notionhqClient } from '@/server/infra'
import { kv } from '@vercel/kv'

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

  const collectionInfo = await notionhqClient.databases.retrieve({
    database_id: process.env.NOTIONHQ_DATABASE_ID
  })

  if (collectionInfo.properties.Tags.type !== 'multi_select') {
    throw new Error('Tags is not multi-select type')
  }

  await kv.set('getTags', collectionInfo.properties.Tags.multi_select.options, {
    ex: 60 * 60
  })

  return collectionInfo.properties.Tags.multi_select.options
}
