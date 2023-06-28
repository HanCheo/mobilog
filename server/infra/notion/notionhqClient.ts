import { Client } from '@notionhq/client'

export const notionhqClient = new Client({
  auth: process.env.NOTIONHQ_API_TOKEN
})
