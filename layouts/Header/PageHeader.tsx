import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

import * as types from 'notion-types'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import { Breadcrumbs, Search, useNotionContext } from 'react-notion-x'

import { Logo } from '@/components/icons'
import { isSearchEnabled, navigationLinks } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'
import styles from '@/styles/styles.module.css'

const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </div>
  )
}

export const PageHeader: FC<{
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
          <div className='flex justify-center items-center space-x-1'>
            <Link href='/'>
              <div
                className={`flex justify-center items-center ${
                  !isIndexPath ? 'hover:cursor-pointer' : 'pointer-events-none'
                }`}
              >
                <Logo height={38} width={38} fill={`var(--fg-color)`} />
              </div>
            </Link>

            <div
              className={`page-title ${showPageTitle ? 'opacity-visible' : ''}`}
            >
              <Breadcrumbs block={block} rootOnly={false} />
            </div>
          </div>
          <RightNavigation block={block} />
        </div>
      </header>
      <div ref={sentinelRef} className='absolute top-0' />
    </>
  )
}

const RightNavigation = ({
  block
}: {
  block: types.CollectionViewPageBlock | types.PageBlock
}) => {
  const { components, mapPageUrl } = useNotionContext()

  return (
    <div className='notion-nav-header-rhs breadcrumbs'>
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
