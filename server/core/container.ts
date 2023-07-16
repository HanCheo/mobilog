import 'reflect-metadata'
import { container } from 'tsyringe'
import {
  NotionRepositoryToken,
  AnalyticsRepository,
  AnalyticsRepositoryToken
} from '@/server/services/repository'
import {
  NotionClient,
  NotionClientConfig
} from '../datasource/notion/notionClient'
import {
  GoogleAnalitycsConfig,
  GoogleAnalytics
} from '../datasource/google/googleAnalytics'

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

if (!container.isRegistered(GoogleAnalitycsConfig)) {
  container.register<GoogleAnalitycsConfig>(GoogleAnalitycsConfig, {
    useValue: new GoogleAnalitycsConfig(
      process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
      process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
      process.env.GOOGLE_ANALYTICE_PROPERTIY_ID
    )
  })
}

if (!container.isRegistered(AnalyticsRepositoryToken)) {
  container.registerSingleton<AnalyticsRepository>(
    AnalyticsRepositoryToken,
    GoogleAnalytics
  )
}

export { container }
