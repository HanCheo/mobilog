import { notionhqClient } from '@/server/infra'

type GetTagsResponse = {
  id: string
  color: string
  name: string
}[]

export const getTags = async (): Promise<GetTagsResponse> => {
  const collectionInfo = await notionhqClient.databases.retrieve({
    database_id: process.env.NOTIONHQ_DATABASE_ID
  })

  if (collectionInfo.properties.Tags.type !== 'multi_select') {
    throw new Error('Tags is not multi-select type')
  }

  return collectionInfo.properties.Tags.multi_select.options
}
