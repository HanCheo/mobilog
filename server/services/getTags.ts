import { notion } from '@/server/infra'

type GetTagsResponse = {
  name: string
  options: {
    id: string
    color: string
    value: string
  }[]
  type: 'multi_select'
}

const NOTION_TAGS_ID_KEY = 'FhBb'

export const getTags = async (): Promise<GetTagsResponse> => {
  const collectionInfo = await notion.getCollectionData(
    process.env.NEXT_PUBLIC_NOTION_COLLECTION_ID,
    process.env.NEXT_PUBLIC_NOTION_COLLECTION_VIEW_ID,
    {
      type: 'table'
    },
    { limit: 1 }
  )

  const key = Object.keys(collectionInfo.recordMap.collection)[0]

  return collectionInfo.recordMap.collection[key].value.schema[
    NOTION_TAGS_ID_KEY
  ] as GetTagsResponse
}
