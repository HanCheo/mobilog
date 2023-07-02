import { useTheme } from '@/client/providers/ThemeProvider'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import { cs, useNotionContext } from 'react-notion-x'
import { navigationLinks } from '@/config/config'
import styles from '@/styles/styles.module.css'

const ToggleThemeButton = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <div className={cs('breadcrumb', 'button')} onClick={toggleTheme}>
      {isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </div>
  )
}

// {
//   block
// }: {
//   block?: types.CollectionViewPageBlock | types.PageBlock
// }
export const RightNavigation = () => {
  const { components } = useNotionContext()

  return (
    <div className='notion-nav-header-rhs breadcrumbs justify-end flex-shrink-1 w-full'>
      {navigationLinks
        ?.map((link, index) => {
          if (!link.pageId && !link.url) {
            return null
          }

          return (
            <components.PageLink
              href={link.url}
              key={index}
              className={cs(styles.navLink, 'breadcrumb', 'button')}
            >
              {link.title}
            </components.PageLink>
          )
        })
        .filter(Boolean)}
      <ToggleThemeButton />

      {/* {isSearchEnabled && <Search block={block} title={null} />} */}
    </div>
  )
}
