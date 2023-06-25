import { host } from '@/lib/config'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

type GetCollectionInfoResponse = {
  name: 'Tags'
  options: {
    id: string
    color: string
    value: string
  }[]
  type: 'multi_select'
}

const getCollectionInfo = (): Promise<GetCollectionInfoResponse> => {
  return fetch(`${host}/api/tags`).then((response) => {
    return response.json() as unknown as GetCollectionInfoResponse
  })
}

export const Tags: FC = () => {
  const { data: collectionTags, isLoading } = useQuery({
    queryKey: ['collectionInfo'],
    queryFn: getCollectionInfo
  })

  return (
    <>
      {!isLoading &&
        collectionTags.options?.map(({ id, value }) => (
          <div
            key={id}
            className='notion-property-multi_select-item notion-item-default'
          >
            {value}
          </div>
        ))}
    </>
  )
}
