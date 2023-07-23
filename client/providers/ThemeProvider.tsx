import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect
} from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

import { useLocalStorage } from 'react-use'

type ThemeContextProps = {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  toggleTheme: () => {}
})

export const THEME = {
  Dark: 'Dark',
  Light: 'Light'
} as const

type ThemeProviderProps = {
  defaultTheme?: (typeof THEME)[keyof typeof THEME]
}

export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  defaultTheme
}) => {
  const isDarkModeMedia = defaultTheme === THEME.Dark
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
