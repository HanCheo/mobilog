import { getAllPages } from './get-all-pages'
import * as types from './types'
import * as config from './config'

const TYPE_PROPERTIES_NAME = 'xnm['

const isPostType = (page: types.Block) => {
  return page?.properties[TYPE_PROPERTIES_NAME]?.[0][0] === 'Post'
}

export const getPostsCanonical = async () => {
  const partialSiteMap = await getAllPages(
    config.rootNotionPageId,
    config.rootNotionSpaceId
  )
  const allPages = Object.entries(partialSiteMap.canonicalPageMap)

  const allPosts = allPages.filter(([, pageId]) => {
    const page = partialSiteMap.pageMap[pageId].block[pageId].value

    return isPostType(page)
  })

  return allPosts
}
