import { siteConfig } from '@/config/siteConfig'
import { Head, Tags } from 'client/components'
import { useRouter } from 'next/router'
import { TagPostList } from '../components/TagPostList/TagPostList'

export const TagPage: React.FC = () => {
  const router = useRouter()
  const tag = router.query.tag as string

  return (
    <>
      <Head title={`${siteConfig.name + (tag ? ' | ' + tag : '')}`} />
      <div className='flex flex-col gap-3 mt-6 px-6 w-full max-w-1200'>
        <Tags />
        {tag && <TagPostList tag={tag} />}
      </div>
    </>
  )
}
