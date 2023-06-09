import { host } from '@/config/config'
import { GetPageablePostsByTagResponse } from '@/server/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { FC, useCallback, useEffect, useRef } from 'react'
import * as Icon from '../icons'
import { PostItem } from '../PostItem'

const getTagPostList = ({
  tag,
  limit,
  cursor
}: {
  tag: string
  limit: number
  cursor?: string
}): Promise<GetPageablePostsByTagResponse> => {
  return fetch(
    `${host}/api/posts/tags/${tag}?limit=${limit}` +
      (cursor ? `&cursor=${cursor}` : '')
  ).then((response) => response.json())
}

const PER_PAGE_SIZE = 10

export const TagPostList: FC<{ tag: string }> = ({ tag }: { tag: string }) => {
  const {
    data: postList,
    isLoading,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: [tag, PER_PAGE_SIZE],
    queryFn: ({ pageParam }) =>
      getTagPostList({
        tag,
        limit: PER_PAGE_SIZE,
        cursor: pageParam
      }),
    getNextPageParam: (currentData) => {
      return currentData.has_more && currentData.next_cursor
    }
  })
  const lastRef = useRef<HTMLDivElement>(undefined)

  const handler = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])

  useEffect(() => {
    const sentinelEl = lastRef.current
    const observer = new window.IntersectionObserver(handler, {
      rootMargin: '0px'
    })
    sentinelEl && observer.observe(sentinelEl)

    return () => {
      sentinelEl && observer.unobserve(sentinelEl)
    }
  }, [handler])

  return (
    <div className='w-full'>
      <div className='notion-collection-header'>
        <div className='notion-collection-header-title'>{tag}</div>
      </div>
      {isLoading ? (
        <div className='flex w-full py-20 items-center justify-center'>
          <Icon.Loading />
        </div>
      ) : postList.pages[0].results.length === 0 ? (
        <div className='w-full text-center py-8'>
          {tag}에 작성된 Post가 없습니다.
        </div>
      ) : (
        <div className='notion-gallery-grid notion-gallery-grid-size-small'>
          {postList.pages.map((list) =>
            list.results.map((post) => <PostItem key={post.id} post={post} />)
          )}
        </div>
      )}
      <div ref={lastRef} />
    </div>
  )
}
