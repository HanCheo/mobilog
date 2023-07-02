import { NotionPage } from 'client/layouts'
import { domain } from '@/config/config'
import { resolveNotionPage } from '@/server/services/resolveNotionPage'
import { Tags } from '@/client/components'

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
      <NotionPage {...props} />
      <Tags />
      <div className='h-6' />
    </div>
  )
}
