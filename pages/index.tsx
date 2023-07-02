import { NotionPage } from 'client/layouts'
import { domain } from '@/config/config'
import { resolveNotionPage } from '@/server/services/resolveNotionPage'
import { TextTypeAnimator } from '@/client/components'

export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage()

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function NotionDomainPage(props) {
  return (
    <div>
      <div className='max-w-1200 mx-auto px-6 pt-20 pb-10 font-extrabold text-3xl'>
        <div>Hello! </div>
        <div className='flex'>
          I&apos;m&nbsp;
          <TextTypeAnimator
            className='block text-green-600 dark:text-green-400'
            sequence={['Software Engineer', 2000, 'Problem Solver', 2000]}
          />
        </div>
      </div>
      <NotionPage {...props} />
      <div className='h-6' />
    </div>
  )
}
