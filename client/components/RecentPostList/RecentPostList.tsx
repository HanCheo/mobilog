import { host } from '@/config/config'
import { GetPageablePostsResponse } from '@/server/types'
import { FC } from 'react'
import { PostItem, PostItemSkeleton } from '../PostItem'
import { useQuery } from '@tanstack/react-query'

const RECENT_POSTLIST_SIZE = 10
const getRecentPostList = (): Promise<GetPageablePostsResponse> => {
  return fetch(`${host}/api/posts?limit=${RECENT_POSTLIST_SIZE}`).then(
    (response) => response.json()
  )
}

export const RecentPostList: FC = () => {
  const { data: postList, isLoading } = useQuery({
    queryKey: ['/api/posts', 'recent', RECENT_POSTLIST_SIZE],
    queryFn: getRecentPostList
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
