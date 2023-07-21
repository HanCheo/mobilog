import { NotionHqRepository } from '@/server/services/repository'
import { Client } from '@notionhq/client'
import { singleton } from 'tsyringe'

export const notionhqClient = new Client({
  auth: process.env.NOTIONHQ_API_TOKENs
})

export class NotionHqClientConfig {
  constructor(public auth: string) {}
}

@singleton()
export class NotionHqClient extends Client implements NotionHqRepository {
  constructor({ auth }: NotionHqClientConfig) {
    super({
      auth
    })
  }
}
