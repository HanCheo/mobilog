import * as notionTypes from 'notion-types'

declare module 'notion-types' {
  notionTypes

  interface Collection {
    description?: string[]
  }
}
