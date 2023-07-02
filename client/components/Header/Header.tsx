import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import * as types from 'notion-types'
import { Icon } from 'client/components'
import { RightNavigation } from './RigintNavigation'

export const Header: FC<{
  block?: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const [showPageTitle, setShowPageTitle] = useState(false)
  const [pageTitle, setPageTitle] = useState('')
  const navRef = useRef<HTMLDivElement>(undefined)
  const sentinelRef = useRef<HTMLDivElement>(undefined)
  const router = useRouter()
  const isIndexPath = router.pathname === '/'

  const handler = useCallback(([entry]) => {
    if (navRef.current) {
      navRef.current?.classList.toggle(
        'notion-nav-header-width',
        entry.isIntersecting
      )
      setShowPageTitle(!entry.isIntersecting)
    }
  }, [])

  useEffect(() => {
    if (showPageTitle && document?.title != pageTitle) {
      setPageTitle(document?.title ?? '')
    }
  }, [pageTitle, showPageTitle])

  useEffect(() => {
    const sentinelEl = sentinelRef.current
    const observer = new window.IntersectionObserver(handler, {
      rootMargin: '150px'
    })
    observer.observe(sentinelEl)

    return () => {
      sentinelEl && observer.unobserve(sentinelEl)
    }
  }, [handler])

  return (
    <>
      <header className='notion-header'>
        <div className='notion-nav-header notion-nav-header-width' ref={navRef}>
          <div className='flex items-center space-x-1 flex-shrink-1 w-full overflow-hidden pr-4'>
            <Link href='/'>
              <div
                className={`${
                  !isIndexPath ? 'hover:cursor-pointer' : 'pointer-events-none'
                }`}
              >
                <Icon.Logo height={38} width={38} fill={`var(--fg-color)`} />
              </div>
            </Link>

            <div
              className={`page-title whitespace-nowrap text-ellipsis ${
                showPageTitle ? 'opacity-visible' : ''
              }`}
            >
              {/* <Breadcrumbs block={block} rootOnly={false} /> */}
              {block?.properties.title ?? pageTitle}
            </div>
          </div>
          {/* <RightNavigation block={block} /> */}
          <RightNavigation />
        </div>
      </header>
      <div ref={sentinelRef} className='absolute top-0' />
    </>
  )
}
