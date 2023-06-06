import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, ReactNode, createElement, useMemo } from 'react'

import { Footer } from '@/layouts/Footer'
import { PageHead } from '@/layouts/PageHead'
import cs from 'classnames'
import { PageHeader } from 'layouts/Header/PageHeader'
import { PageBlock } from 'notion-types'
import {
  formatDate,
  getBlockTitle,
  getPageProperty,
  getTextContent
} from 'notion-utils'
import BodyClassName from 'react-body-classname'
import { NotionRenderer } from 'react-notion-x'
import { useSearchParam } from 'react-use'

import * as config from '@/lib/config'
import * as types from '@/lib/types'
import { Comment } from '@/components/Comment'
import { Loading } from '@/components/Loading'
import { PageSocial } from '@/components/PageSocial'
import { mapImageUrl } from '@/lib/map-image-url'
import { getCanonicalPageUrl, mapPageUrl } from '@/lib/map-page-url'
import { searchNotion } from '@/lib/search-notion'
import { useDarkMode } from '@/lib/use-dark-mode'
import styles from '@/styles/styles.module.css'

import { Page404 } from './Page404'

const Code = dynamic(async () => (props: any) => {
  switch (getTextContent(props.block.properties.language)) {
    case 'Mermaid':
      return createElement(
        dynamic(
          () => {
            return import('@/components/notion-blocks').then(
              ({ Mermaid }) => Mermaid
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

const propertyLastEditedTimeValue = (
  { block, pageHeader },
  defaultFn: () => ReactNode
) => {
  if (pageHeader && block?.last_edited_time) {
    return `Last updated ${formatDate(block?.last_edited_time, {
      month: 'long'
    })}`
  }

  return defaultFn()
}

const propertyDateValue = (
  { data, schema, pageHeader },
  defaultFn: () => ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'published') {
    const publishDate = data?.[0]?.[1]?.[0]?.[1]?.start_date

    if (publishDate) {
      return `${formatDate(publishDate, {
        month: 'long'
      })}`
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
        <PageHeader block={block} collection={recordMap?.collection} />
      ),
      propertyLastEditedTimeValue,
      propertyTextValue,
      propertyDateValue
    }),
    []
  )

  // lite mode is for oembed
  const isLiteMode = lite === 'true'

  const { isDarkMode } = useDarkMode()

  const siteMapPageUrl = useMemo(() => {
    const params: any = {}
    if (lite) params.lite = lite

    const searchParams = new URLSearchParams(params)
    return mapPageUrl(site, recordMap, searchParams)
  }, [site, recordMap, lite])

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  const showTableOfContents =
    block?.type === 'page' && block?.parent_table === 'collection'
  const minTableOfContentsItems = 3

  const footer = useMemo(
    () => (
      <>
        {showTableOfContents && <Comment />}
        <Footer />
      </>
    ),
    [showTableOfContents]
  )

  if (router.isFallback) {
    return <Loading />
  }

  if (error || !site || !block) {
    return <Page404 site={site} pageId={pageId} error={error} />
  }

  const title = getBlockTitle(block, recordMap) || site.name

  const canonicalPageUrl =
    !config.isDev && getCanonicalPageUrl(site, recordMap)(pageId)

  if (!config.isServer) {
    // add important objects to the window global for easy debugging
    const g = window as any
    g.pageId = pageId
    g.recordMap = recordMap
    g.block = block
  }

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
      <PageHead
        pageId={pageId}
        site={site}
        title={title}
        description={socialDescription}
        image={socialImage}
        url={canonicalPageUrl}
      />

      {isLiteMode && <BodyClassName className='notion-lite' />}
      {isDarkMode && <BodyClassName className='dark-mode' />}

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
        footer={footer}
      />
    </>
  )
}
