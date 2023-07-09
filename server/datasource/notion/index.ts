import 'reflect-metadata'
import { NotionRepositoryToken } from '@/server/services/repository'
import { container } from 'tsyringe'

import { NotionClient, NotionClientConfig } from './notionClient'

export { NotionClient as NotionAPI } from './notionClient'
export { notionhqClient } from './notionhqClient'

console.log('container-register')

container.register<NotionClientConfig>(NotionClientConfig, {
  useValue: new NotionClientConfig(
    'https://www.notion.so/api/v3',
    undefined,
    undefined,
    'GMT'
  )
})

container.register<NotionClient>(NotionRepositoryToken, {
  useValue: new NotionClient(container.resolve(NotionClientConfig))
})
