import { NotionAPI } from './notion-client'

export const notion = new NotionAPI({
  apiBaseUrl: process.env.NOTION_BASE_URL
})