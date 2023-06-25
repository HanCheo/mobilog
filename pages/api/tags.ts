import { getTags } from '@/server/services/getTags'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  const tags = await getTags().catch((error) => {
    res.status(500).send({ error: `Notion api error: ${error.message}` })
  })

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
  )
  res.status(200).json(tags)
}
