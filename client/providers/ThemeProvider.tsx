import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect
} from 'react'

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
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    'theme',
    isDarkModeMedia ? THEME.Dark : THEME.Light
  )

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode === THEME.Dark)
  }, [isDarkMode])

  const toggleTheme = useCallback(() => {
    setIsDarkMode(isDarkMode === THEME.Dark ? THEME.Light : THEME.Dark)
  }, [isDarkMode, setIsDarkMode])

  return (
    <ThemeContext.Provider
      value={{ isDarkMode: isDarkMode === THEME.Dark, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
