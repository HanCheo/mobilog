import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: process.env.NEXT_PUBLIC_NOTION_PAGE_ID,

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Mobilog',
  domain: 'https://mobilog.vercel.app/',
  author: 'Moby',

  // open graph metadata (optional)
  description: 'Moby Blog',

  // social usernames (optional)
  // twitter: '#'
  github: 'HanCheo',
  linkedin: 'hancheol-kim-ba56b31b7',
  // mastodon: '#', // optional mastodon profile URL, provides link verification
  // newsletter: '#', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

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
      title: 'About',
      pageId: process.env.NEXT_PUBLIC_ABOUT_PAGE_ID
    },
    {
      title: 'Contact',
      pageId: process.env.NEXT_PUBLIC_CONTACT_PAGE_ID
    }
  ]
})
