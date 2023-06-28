import { NotionAPI } from './notionClient'

export const notion = new NotionAPI({
  apiBaseUrl: process.env.NOTION_BASE_URL
})
