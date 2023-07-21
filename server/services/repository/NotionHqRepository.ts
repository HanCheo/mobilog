import { Client } from '@notionhq/client'

export type NotionHqRepository = Client

export const NotionHqRepositoryToken = Symbol.for('notionhq-repository')
