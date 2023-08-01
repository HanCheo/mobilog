import { host } from '@/config/config'
import { GetPageablePostsResponse } from '@/server/types'
import { FC } from 'react'
import { PostItem, PostItemSkeleton } from '../PostItem'
import { useQuery } from '@tanstack/react-query'

const getRecentPostList = ({
  limit,
  cursor
}: {
  limit: number
  cursor?: string
}): Promise<GetPageablePostsResponse> => {
  return fetch(
    `${host}/api/posts?` +
      `limit=${limit}` +
      (cursor ? `&cursor=${cursor}` : '')
  ).then((response) => response.json())
}

const PER_PAGE_SIZE = 10

export const RecentPostList: FC = () => {
  const { data: postList, isLoading } = useQuery({
    queryKey: ['/api/posts', 'recent', PER_PAGE_SIZE],
    queryFn: ({ pageParam }) =>
      getRecentPostList({
        limit: PER_PAGE_SIZE,
        cursor: pageParam
      })
  })
  return (
    <div className='w-full'>
      <div className='notion-collection-header'>
        <div className='notion-collection-header-title'>Recent Posts</div>
      </div>
      <div className='notion-gallery-grid notion-gallery-grid-size-small'>
        {isLoading ? (
          <PostItemSkeleton count={10} />
        ) : (
          postList.results.map((post) => <PostItem key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}
