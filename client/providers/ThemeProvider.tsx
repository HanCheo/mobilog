import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect
} from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

import { useLocalStorage, useMedia } from 'react-use'

type ThemeContextProps = {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  toggleTheme: () => {}
})

const THEME = {
  Dark: 'Dark',
  Light: 'Light'
} as const

export const ThemeProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const isDarkModeMedia = useMedia('(prefers-color-scheme: dark)', null)
  const [theme, setTheme] = useLocalStorage(
    'theme',
    isDarkModeMedia ? THEME.Dark : THEME.Light
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === THEME.Dark)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(theme === THEME.Dark ? THEME.Light : THEME.Dark)
  }, [theme, setTheme])

  const isDarkMode = theme === THEME.Dark

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <SkeletonTheme
        baseColor={isDarkMode ? 'hsl(0deg 0% 50.00%)' : undefined}
        highlightColor={isDarkMode ? '#999' : undefined}
        borderRadius={0}
      >
        {children}
      </SkeletonTheme>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
