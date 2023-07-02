import { Post } from '@/server/types'
import Image from 'next/image'
import { FC, useCallback } from 'react'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import { Page } from '../icons'

export const PostItem: FC<{ post: Post }> = ({ post }: { post: Post }) => {
  const router = useRouter()

  const goToPost = useCallback(() => {
    router.push(`/posts/${post.id.replace(/-/g, '')}`)
  }, [post.id, router])

  return (
    <div
      className='notion-collection-card notion-collection-card-size-small'
      onClick={goToPost}
    >
      <div className='notion-collection-card-cover'>
        {post.cover.file?.url ? (
          <Image
            alt={post.properties.Name.title[0].plain_text}
            loading='lazy'
            width='300'
            height='300'
            src={post.cover.file?.url}
            decoding='async'
            data-nimg='1'
          />
        ) : (
          <img
            alt={post.properties.Name.title[0].plain_text}
            loading='lazy'
            width='300'
            height='300'
            src={post.cover.external?.url}
            decoding='async'
            data-nimg='1'
          />
        )}
      </div>
      <div className='notion-collection-card-body'>
        <div className='notion-collection-card-property'>
          <span className='notion-property notion-property-title'>
            <span className='notion-page-link'>
              <span className='notion-page-title'>
                <div className='notion-page-icon-inline notion-page-icon-image'>
                  {post.icon?.file.url ? (
                    <img
                      src={post.icon?.file.url}
                      alt={post.properties.Name.title[0].plain_text}
                    />
                  ) : (
                    <Page />
                  )}
                </div>
                <span className='notion-page-title-text'>
                  {post.properties.Name.title[0].plain_text ?? ''}
                </span>
              </span>
            </span>
          </span>
        </div>
        <div className='notion-collection-card-property'>
          <span className='notion-property notion-property-date'>
            {format(
              new Date(post.properties.Published.date.start),
              'yyyy-MM-dd'
            ) ?? ''}
          </span>
        </div>
        <div className='notion-collection-card-property'>
          <span className='notion-property notion-property-text'>
            {post.properties.Description.rich_text[0]?.plain_text ?? ''}
          </span>
        </div>
        <div className='notion-collection-card-property'>
          <span className='notion-property notion-property-multi_select'>
            {post.properties.Tags.multi_select.map((tag, index) => (
              <div
                key={index}
                className={`notion-property-multi_select-item notion-item-${tag.color}`}
              >
                {tag.name}
              </div>
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}
