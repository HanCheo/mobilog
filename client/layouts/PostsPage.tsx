import { siteConfig } from '@/config/siteConfig'
import { Head, PostList, Tags } from 'client/components'
import { useRouter } from 'next/router'

export const PostsPage: React.FC = () => {
  const router = useRouter()
  const tag = router.query.tag as string

  return (
    <>
      <Head title={`${siteConfig.name + (tag ? ' | ' + tag : '')}`} />
      <div className='flex flex-col mx-auto gap-3 mt-6 px-6 w-full max-w-1200'>
        <Tags />
        <PostList tag={tag} />
      </div>
    </>
  )
}
