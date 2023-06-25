import { host } from '@/config/config'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

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
  const { data: tags, isLoading } = useQuery({
    queryKey: ['/api/tags'],
    queryFn: getTags
  })

  return (
    <>
      {!isLoading &&
        tags.options?.map(({ id, value }) => (
          <div key={id} className='br-1'>
            {value}
          </div>
        ))}
    </>
  )
}
