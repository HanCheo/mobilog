import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, ReactNode, createElement, useMemo } from 'react'
import { Head, Header, Comment, Loading, PageSocial } from 'client/components'
import { useTheme } from 'client/providers/ThemeProvider'
import cs from 'classnames'
import { format } from 'date-fns'
import { PageBlock } from 'notion-types'
import { getBlockTitle, getPageProperty, getTextContent } from 'notion-utils'
import { NotionRenderer } from 'react-notion-x'
import { useSearchParam } from 'react-use'

import * as config from '@/config/config'
import * as types from '@/config/types'
import { mapImageUrl } from '@/server/libs/map-image-url'
import { getCanonicalPageUrl, mapPageUrl } from '@/server/libs/map-page-url'
import { searchNotion } from '@/server/services/searchNotion'
import styles from '@/styles/styles.module.css'
import { NotFoundPage } from './NotFoundPage'

const Code = dynamic(async () => (props: any) => {
  switch (getTextContent(props.block.properties.language)) {
    case 'Mermaid':
      return createElement(
        dynamic(
          () => {
            return import('client/components').then(
              ({ NotionBlock }) => NotionBlock.Mermaid
            )
          },
          { ssr: false }
        ),
        props
      )
    default:
      return createElement(
        dynamic(() => {
          return import('react-notion-x/build/third-party/code').then(
            async (module) => {
              // Additional prismjs syntax
              await Promise.all([
                import('prismjs/components/prism-markup-templating'),
                import('prismjs/components/prism-markup'),
                import('prismjs/components/prism-bash'),
                import('prismjs/components/prism-c'),
                import('prismjs/components/prism-cpp'),
                import('prismjs/components/prism-csharp'),
                import('prismjs/components/prism-docker'),
                import('prismjs/components/prism-java'),
                import('prismjs/components/prism-js-templates'),
                import('prismjs/components/prism-coffeescript'),
                import('prismjs/components/prism-diff'),
                import('prismjs/components/prism-git'),
                import('prismjs/components/prism-go'),
                import('prismjs/components/prism-graphql'),
                import('prismjs/components/prism-handlebars'),
                import('prismjs/components/prism-less'),
                import('prismjs/components/prism-makefile'),
                import('prismjs/components/prism-markdown'),
                import('prismjs/components/prism-objectivec'),
                import('prismjs/components/prism-ocaml'),
                import('prismjs/components/prism-python'),
                import('prismjs/components/prism-reason'),
                import('prismjs/components/prism-rust'),
                import('prismjs/components/prism-sass'),
                import('prismjs/components/prism-scss'),
                import('prismjs/components/prism-solidity'),
                import('prismjs/components/prism-sql'),
                import('prismjs/components/prism-stylus'),
                import('prismjs/components/prism-swift'),
                import('prismjs/components/prism-wasm'),
                import('prismjs/components/prism-yaml')
              ])
              return module.Code
            }
          )
        }),
        props
      )
  }
})

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then((m) => {
      m.Modal.setAppElement('.notion-viewport')
      return m.Modal
    }),
  {
    ssr: false
  }
)

const propertyDateValue = (
  { data, schema, pageHeader },
  defaultFn: () => ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'published') {
    const publishDate = data?.[0]?.[1]?.[0]?.[1]?.start_date

    if (publishDate) {
      return `${format(new Date(publishDate), 'yyyy-MM-dd')}`
    }
  }

  return defaultFn()
}

const propertyTextValue = (
  { schema, pageHeader },
  defaultFn: () => ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'author') {
    return <b>{defaultFn()}</b>
  }

  return defaultFn()
}

export const NotionPage: FC<types.PageProps> = ({
  site,
  recordMap,
  error,
  pageId
}) => {
  const router = useRouter()

  const lite = useSearchParam('lite')

  const components = useMemo(
    () => ({
      nextImage: Image,
      nextLink: Link,
      Code,
      Collection,
      Equation,
      Pdf,
      Modal,
      Header: ({ block }) => (
        <Header block={block} collection={recordMap?.collection} />
      ),
      propertyTextValue,
      propertyDateValue
    }),
    []
  )

  // lite mode is for oembed
  const isLiteMode = lite === 'true'

  const { isDarkMode } = useTheme()

  const siteMapPageUrl = useMemo(() => {
    const params: any = {}
    if (lite) params.lite = lite

    const searchParams = new URLSearchParams(params)
    return mapPageUrl(site, searchParams)
  }, [site, lite])

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  const showTableOfContents =
    block?.type === 'page' && block?.parent_table === 'collection'
  const minTableOfContentsItems = 3

  const NotionFooter = useMemo(
    () => showTableOfContents && <Comment />,
    [showTableOfContents]
  )

  if (router.isFallback) {
    return <Loading />
  }

  if (error || !site || !block) {
    return <NotFoundPage site={site} pageId={pageId} error={error} />
  }

  const title = getBlockTitle(block, recordMap) || site.name

  const canonicalPageUrl = !config.isDev && getCanonicalPageUrl(site)(pageId)

  const socialImage = mapImageUrl(
    getPageProperty<string>('Social Image', block, recordMap) ||
      (block as PageBlock).format?.page_cover ||
      config.defaultPageCover,
    block
  )

  const socialDescription =
    getPageProperty<string>('Description', block, recordMap) ||
    config.description

  return (
    <>
      <Head
        pageId={pageId}
        site={site}
        title={title}
        description={socialDescription}
        image={socialImage}
        url={canonicalPageUrl}
      />
      <NotionRenderer
        bodyClassName={cs(
          styles.notion,
          pageId === site.rootNotionPageId && 'index-page'
        )}
        darkMode={isDarkMode}
        components={components}
        recordMap={recordMap}
        rootPageId={site.rootNotionPageId}
        rootDomain={site.domain}
        fullPage={!isLiteMode}
        previewImages={!!recordMap.preview_images}
        showCollectionViewDropdown={false}
        showTableOfContents={showTableOfContents}
        minTableOfContentsItems={minTableOfContentsItems}
        defaultPageIcon={config.defaultPageIcon}
        defaultPageCover={config.defaultPageCover}
        defaultPageCoverPosition={config.defaultPageCoverPosition}
        mapPageUrl={siteMapPageUrl}
        mapImageUrl={mapImageUrl}
        searchNotion={config.isSearchEnabled ? searchNotion : null}
        pageAside={<PageSocial />}
        footer={NotionFooter}
      />
    </>
  )
}
