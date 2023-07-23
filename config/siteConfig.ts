import * as types from './types'

export type SiteConfigType = {
  rootNotionPageId: string
  rootNotionSpaceId?: string
  pageCollectionId?: string

  name: string
  domain: string
  author: string
  description?: string
  language?: string

  github?: string
  linkedin?: string
  newsletter?: string
  youtube?: string

  defaultPageIcon?: string | null
  defaultPageCover?: string | null
  defaultPageCoverPosition?: number | null

  isPreviewImageSupportEnabled?: boolean
  isTweetEmbedSupportEnabled?: boolean
  isSearchEnabled?: boolean

  includeNotionIdInUrls?: boolean
  pageUrlOverrides?: types.PageUrlOverridesMap
  pageUrlAdditions?: types.PageUrlOverridesMap

  navigationStyle?: types.NavigationStyle
  navigationLinks?: Array<NavigationLink>
}

export interface NavigationLink {
  title: string
  pageId?: string
  url?: string
}

export const siteConfig: SiteConfigType = {
  // the site's root Notion page (required)
  rootNotionPageId: process.env.NEXT_PUBLIC_NOTION_PAGE_ID,

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: process.env.NEXT_PUBLIC_NOTION_ROOT_SPACE_ID,
  pageCollectionId: process.env.NEXT_PUBLIC_NOTION_COLLECTION_ID,

  // basic site info (required)
  name: 'Mobilog',
  domain: 'mobilog.me',
  author: 'Moby',

  // open graph metadata (optional)
  description: 'Moby Blog',

  // social usernames (optional)
  github: 'HanCheo',
  linkedin: 'hancheol-kim-ba56b31b7',
  // newsletter: '#', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: '/default_page_cover.png',
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  pageUrlOverrides: {
    '/about': process.env.NEXT_PUBLIC_ABOUT_PAGE_ID,
    '/contact': process.env.NEXT_PUBLIC_CONTACT_PAGE_ID
  },

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  navigationStyle: 'custom',
  // navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'Posts',
      url: '/posts'
    },
    {
      title: 'About',
      url: '/about'
    },
    {
      title: 'Contact',
      url: '/contact'
    }
  ]
}
