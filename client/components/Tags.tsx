import { host } from '@/config/config'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { TagPostList } from './TagPostList'

type GetTagsResponse = {
  name: 'Tags'
  options: {
    id: string
    color: string
    value: string
  }[]
  type: 'multi_select'
}

const getTags = (): Promise<GetTagsResponse> => {
  return fetch(`${host}/api/tags`).then((response) => {
    return response.json() as unknown as GetTagsResponse
  })
}

export const Tags: FC = () => {
  const [tag, setTag] = useState(null)
  const { data: tags, isLoading } = useQuery({
    queryKey: ['/api/tags'],
    queryFn: getTags
  })

  return (
    <div className='grid gap-3 mx-auto max-w-1200 px-6'>
      <div className='notion-collection-header-title'>Tags</div>
      <div className='flex gap-2'>
        {!isLoading &&
          tags.options?.map(({ id, value }) => (
            <div
              key={id}
              className='border-solid border rounded-3xl p-1 px-2 cursor-pointer hover:bg-bg-color-0 flex-wrap'
              onClick={() => setTag(value)}
            >
              {value}
            </div>
          ))}
      </div>
      {tag && <TagPostList tag={tag} />}
    </div>
  )
}
