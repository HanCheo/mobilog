import { NextApiRequest, NextApiResponse } from 'next'

import * as libConfig from '@/config/config'
import { NotionPageInfo } from '@/config/types'
import { mapImageUrl } from '@/server/libs/map-image-url'
import {
  NotionRepository,
  NotionRepositoryToken
} from '@/server/services/repository'
import got from 'got'
import { PageBlock } from 'notion-types'
import {
  getBlockIcon,
  getBlockTitle,
  getPageProperty,
  isUrl,
  parsePageId
} from 'notion-utils'
import { container } from '@/server/core'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  const pageId: string = parsePageId(req.body.pageId)
  if (!pageId) {
    throw new Error('Invalid notion page id')
  }

  const recordMap = await container
    .resolve<NotionRepository>(NotionRepositoryToken)
    .getPage(pageId)

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  if (!block) {
    throw new Error('Invalid recordMap for page')
  }

  const blockSpaceId = block.space_id

  if (
    blockSpaceId &&
    libConfig.rootNotionSpaceId &&
    blockSpaceId !== libConfig.rootNotionSpaceId
  ) {
    return res.status(400).send({
      error: `Notion page "${pageId}" belongs to a different workspace.`
    })
  }

  const title = getBlockTitle(block, recordMap) || libConfig.name
  const imageBlockUrl = mapImageUrl(
    getPageProperty<string>('Social Image', block, recordMap) ||
      (block as PageBlock).format?.page_cover,
    block
  )
  const imageFallbackUrl = mapImageUrl(libConfig.defaultPageCover, block)

  const blockIcon = getBlockIcon(block, recordMap)
  const authorImageBlockUrl = mapImageUrl(
    blockIcon && isUrl(blockIcon) ? blockIcon : null,
    block
  )
  const authorImageFallbackUrl = mapImageUrl(libConfig.defaultPageIcon, block)
  const [authorImage, image] = await Promise.all([
    getCompatibleImageUrl(authorImageBlockUrl, authorImageFallbackUrl),
    getCompatibleImageUrl(imageBlockUrl, imageFallbackUrl)
  ])

  const author =
    getPageProperty<string>('Author', block, recordMap) || libConfig.author

  const socialDescription =
    getPageProperty<string>('Description', block, recordMap) ||
    libConfig.description
  const lastEditedTime =
    getPageProperty<number>('Last edited time', block, recordMap) ?? new Date()
  const dateUpdated = lastEditedTime ? new Date(lastEditedTime) : undefined
  const publishedTime = getPageProperty<number>('Published', block, recordMap)
  const datePublished = publishedTime ? new Date(publishedTime) : undefined

  const pageInfo: NotionPageInfo = {
    pageId,
    title,
    image,
    publishedAt: datePublished ?? dateUpdated,
    author,
    authorImage,
    detail: socialDescription
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, max-age=3600, stale-while-revalidate=3600'
  )
  res.status(200).json(pageInfo)
}

async function isUrlReachable(url: string | null): Promise<boolean> {
  if (!url) {
    return false
  }

  try {
    await got.head(url)
    return true
  } catch (err) {
    return false
  }
}

async function getCompatibleImageUrl(
  url: string | null,
  fallbackUrl: string | null
): Promise<string | null> {
  const image = (await isUrlReachable(url)) ? url : fallbackUrl

  if (image) {
    const imageUrl = new URL(image)

    if (imageUrl.host === 'images.unsplash.com') {
      if (!imageUrl.searchParams.has('w')) {
        imageUrl.searchParams.set('w', '1200')
        imageUrl.searchParams.set('fit', 'max')
        return imageUrl.toString()
      }
    }
  }

  return image
}
