import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

import * as types from 'notion-types'
import { useTheme } from '@/providers/ThemeProvider'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import { Search, useNotionContext } from 'react-notion-x'

import { Icon } from '@/components'
import { isSearchEnabled, navigationLinks } from '@/lib/config'
import styles from '@/styles/styles.module.css'

const ToggleThemeButton = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <div className={cs('breadcrumb', 'button')} onClick={toggleTheme}>
      {isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </div>
  )
}

const RightNavigation = ({
  block
}: {
  block: types.CollectionViewPageBlock | types.PageBlock
}) => {
  const { components, mapPageUrl } = useNotionContext()

  return (
    <div className='notion-nav-header-rhs breadcrumbs justify-end flex-shrink-1 w-full'>
      {navigationLinks
        ?.map((link, index) => {
          if (!link.pageId && !link.url) {
            return null
          }

          if (link.pageId) {
            return (
              <components.PageLink
                href={mapPageUrl(link.pageId)}
                key={index}
                className={cs(styles.navLink, 'breadcrumb', 'button')}
              >
                {link.title}
              </components.PageLink>
            )
          } else {
            return (
              <components.Link
                href={link.url}
                key={index}
                className={cs(styles.navLink, 'breadcrumb', 'button')}
              >
                {link.title}
              </components.Link>
            )
          }
        })
        .filter(Boolean)}

      <ToggleThemeButton />

      {isSearchEnabled && <Search block={block} title={null} />}
    </div>
  )
}

export const Header: FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
  collection?: types.CollectionMap
}> = ({ block }) => {
  const [showPageTitle, setShowPageTitle] = useState(false)
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
                className={`flex items-center ${
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
              {block.properties.title}
            </div>
          </div>
          <RightNavigation block={block} />
        </div>
      </header>
      <div ref={sentinelRef} className='absolute top-0' />
    </>
  )
}
