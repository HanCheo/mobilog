import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

export type GetPageablePostsByTagRequest = {
  tag: string
  limit: number
  cursor?: string
}

export type GetPageablePostsByTagResponse = Omit<
  QueryDatabaseResponse,
  'results'
> & {
  results: Array<Post>
}

export type Post = {
  object: 'page'
  id: string
  created_time: string // ISOString
  last_edited_time: string // ISOString
  created_by: {
    object: 'user'
    id: string
  }
  last_edited_by: {
    object: 'user'
    id: string
  }
  cover: {
    type: 'file'
  } & (
    | {
        file: {
          url: string
          expiry_time: string // ISOString
        }
        external?: never
      }
    | {
        external: {
          url: string
          expiry_time: string // ISOString
        }
        file?: never
      }
  )
  icon?: string
  parent: {
    type: 'database_id'
    database_id: string
  }
  archived: boolean
  properties: {
    Tags: {
      id: string
      type: 'multi_select'
      multi_select: {
        id: string
        name: string
        color: string
      }[]
    }
    Published: {
      id: string
      type: 'date'
      date: {
        start?: string // yyyy-MM-dd
        end?: string // yyyy-MM-dd
        time_zone?: string
      }
    }
    'Last edited time': {
      id: string
      type: 'last_edited_time'
      last_edited_time: string // ISOString
    }
    Created: {
      id: string
      type: 'created_time'
      created_time: string // ISOString
    }
    type: {
      id: string
      type: 'select'
      select: {
        id: string
        name: string // type name
        color: string
      }
    }
    Description: {
      id: string
      type: 'rich_text'
      rich_text: [
        {
          type: 'text'
          text: {
            content: string
            link?: string
          }
          annotations: {
            bold: boolean
            italic: boolean
            strikethrough: boolean
            underline: boolean
            code: boolean
            color: string
          }
          plain_text?: string
          href?: string
        }
      ]
    }
    Name: {
      id: 'title'
      type: 'title'
      title: {
        type: 'text'
        text: {
          content?: string // 제목
          link?: null
        }
        annotations: {
          bold: boolean
          italic: boolean
          strikethrough: boolean
          underline: boolean
          code: boolean
          color: string
        }
        plain_text?: string // 제목
        href?: string
      }[]
    }
    url: string // notion url
    public_url: string // public access url
  }
}
