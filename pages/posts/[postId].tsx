import { GetStaticProps } from 'next'
import { NotionPage } from 'client/layouts'
import { domain, isDev } from '@/back/lib/config'
import { resolveNotionPage } from '@/back/service/resolveNotionPage'
import { PageProps, Params } from '@/back/lib/types'
import { getPostsCanonical } from '@/back/service/getAllPosts'

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  context
) => {
  const rawPostId = context.params.postId as string

  try {
    const props = await resolveNotionPage(rawPostId)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('post error', domain, rawPostId, err)

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
