import { GetStaticProps } from 'next'
import { NotionPage } from 'client/layouts'
import { domain, isDev, pageUrlOverrides } from '@/config/config'
import { resolveNotionPage } from '@/server/services'
import { PageProps, Params } from '@/config/types'

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  context
) => {
  const rawPageId = context.params.pageId as string

  try {
    const props = await resolveNotionPage(rawPageId)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('post error', domain, rawPageId, err)

    // we don't want to publish the error version of this page, sos
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  }

  const urlOverridePages = Object.keys(pageUrlOverrides)

  const staticPaths = {
    paths: urlOverridePages.map((pageId) => ({
      params: {
        pageId
      }
    })),
    // paths: [],
    fallback: true
  }

  return staticPaths
}

export default function NotionDomainDynamicPage(props) {
  return <NotionPage {...props} />
}
