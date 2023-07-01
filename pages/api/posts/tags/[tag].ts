import { getPageablePostsByTag } from '@/server/services/getAllPostByTagNotionhq'
import { NextApiRequest, NextApiResponse } from 'next'

type RequestType = NextApiRequest & {
  query: {
    tag: string
    limit: string
    cursor: string
  }
}

export default async (req: RequestType, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  const query = req.query
  const { tag, limit, cursor } = query

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
  )
  res.status(200).json(
    await getPageablePostsByTag({ tag, limit: Number(limit), cursor }).catch(
      (error) => {
        res.status(500).send({ error: `NotionHq api error: ${error.message}` })
      }
    )
  )
}
