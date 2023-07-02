import { host } from '@/config/config'
import { useQuery } from '@tanstack/react-query'
import { FC, useCallback } from 'react'
import { useRouter } from 'next/router'

type GetTagsResponse = {
  id: string
  color: string
  name: string
}[]

type TagsProps = {
  tag?: string
}

const getTags = (): Promise<GetTagsResponse> => {
  return fetch(`${host}/api/tags`).then((response) => {
    return response.json() as unknown as GetTagsResponse
  })
}

export const Tags: FC<TagsProps> = () => {
  const router = useRouter()
  const tag = router.query.tag as string
  const { data: tags, isLoading } = useQuery({
    queryKey: ['/api/tags'],
    queryFn: getTags
  })

  const changeTag = useCallback(
    (nextTag: string) => {
      router.push({
        query: { tag: nextTag }
      })
    },
    [router]
  )

  return (
    <div className='w-full'>
      <div className='notion-collection-header-title'>Tags</div>
      <div className='flex gap-2 flex-wrap mt-3'>
        {!isLoading &&
          tags?.map(({ id, name }) => (
            <button
              key={id}
              disabled={name === tag}
              className='border-solid border rounded-3xl p-1 px-2 cursor-pointer hover:bg-bg-color-0 flex-wrap disabled:bg-bg-color-0'
              onClick={() => changeTag(name)}
            >
              {name}
            </button>
          ))}
      </div>
    </div>
  )
}
