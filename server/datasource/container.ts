import { container } from 'tsyringe'
import { NotionRepositoryToken } from '@/server/services/repository'
import { NotionClient, NotionClientConfig } from './notion/notionClient'

if (!container.isRegistered(NotionClientConfig)) {
  container.register<NotionClientConfig>(NotionClientConfig, {
    useValue: new NotionClientConfig(
      'https://www.notion.so/api/v3',
      undefined,
      undefined,
      'GMT'
    )
  })
}

if (!container.isRegistered(NotionRepositoryToken)) {
  container.registerSingleton<NotionClient>(NotionRepositoryToken, NotionClient)
}

export { container }
