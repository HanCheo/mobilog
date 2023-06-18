import { notion } from '@/lib/notion-api'
import { NextApiRequest, NextApiResponse } from 'next'
import pMemoize from 'p-memoize'

const collectionDataMemo = pMemoize(notion.getCollectionData, {
  cacheKey: (...args) => JSON.stringify(args)
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  try {
    const collectionInfo = await collectionDataMemo(
      process.env.NEXT_PUBLIC_NOTION_COLLECTION_ID,
      process.env.NEXT_PUBLIC_NOTION_COLLECTION_VIEW_ID,
      {
        type: 'table'
      },
      { limit: 1 }
    )

    const key = Object.keys(collectionInfo.recordMap.collection)[0]

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
    )
    res
      .status(200)
      .json(collectionInfo.recordMap.collection[key].value.schema.FhBb)
  } catch (error) {
    res.status(500).send({ error: `Notion api error: ${error.message}` })
  }
}
