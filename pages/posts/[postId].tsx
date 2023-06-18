import { GetStaticProps } from 'next'
import { NotionPage } from '@/layouts'
import { domain, isDev } from '@/lib/config'
import { getPostsCanonical } from '@/lib/get-site-map'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { PageProps, Params } from '@/lib/types'

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  context
) => {
  const rawPostId = context.params.postId as string

  try {
    const props = await resolveNotionPage(rawPostId)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('post error', domain, rawPostId, err)

    // we don't want to publish the error version of this page, so
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

  const allPosts = await getPostsCanonical()

  const staticPaths = {
    paths: allPosts.map(([postId]) => ({
      params: {
        postId
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
