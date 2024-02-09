import { Post } from '@/server/types'
import Image from 'next/image'
import { FC } from 'react'
import { format } from 'date-fns'
import { Page } from '../icons'
import { Badge, Text, Card, Flex, Inset } from '@radix-ui/themes'
import Link from 'next/link'

export const PostItem: FC<{ post: Post }> = ({ post }: { post: Post }) => {
  const postPage = `/posts/${post.id.replace(/-/g, '')}`

  return (
    <Card asChild>
      <Link href={postPage}>
        <Inset clip='border-box' side='top'>
          {post.cover.file?.url ? (
            <Image
              alt={post.properties.Name.title[0].plain_text}
              loading='lazy'
              width='300'
              height='140'
              src={post.cover.file?.url}
              decoding='async'
              style={{ width: '100%', maxHeight: '140px', height: 140 }}
            />
          ) : (
            <img
              alt={post.properties.Name.title[0].plain_text}
              loading='lazy'
              style={{ width: '100%', maxHeight: '140px', height: 140 }}
              src={post.cover.external?.url}
              decoding='async'
            />
          )}
        </Inset>
        <Flex direction='column' pt='2' gap='1' align={'stretch'}>
          <Flex direction='column' gap='1' mb='2'>
            <Flex direction='row' gap='1'>
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
              <Text weight='medium' size='2'>
                {post.properties.Name.title[0].plain_text ?? ''}
              </Text>
            </Flex>
            <Text weight='regular' size='1'>
              {post.properties.Description.rich_text[0]?.plain_text ?? ''}
            </Text>
          </Flex>
          <Text weight='regular' size='2'>
            {format(
              new Date(post.properties.Published.date.start),
              'yyyy-MM-dd'
            ) ?? ''}
          </Text>
          <Flex gap={'1'}>
            {post.properties.Tags.multi_select.map((tag, index) => (
              <Badge
                key={index}
                color={tag.color as typeof Badge.defaultProps.color}
              >
                {tag.name}
              </Badge>
            ))}
          </Flex>
        </Flex>
      </Link>
    </Card>
  )
}
