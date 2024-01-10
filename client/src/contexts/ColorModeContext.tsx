import { JSX, createContext, useState } from 'react'
import { PaletteMode, useMediaQuery } from '@mui/material'

export const ColorModeContext = createContext({ mode: 'dark' as PaletteMode, toggleMode: () => {} })

export const ColorModeProvider = ({ children }: { children: JSX.Element }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const defaultTheme: PaletteMode = prefersDarkMode ? 'dark' : 'light'
  const [mode, setMode] = useState<PaletteMode>(defaultTheme)

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  return <ColorModeContext.Provider value={{ mode, toggleMode }}>{children}</ColorModeContext.Provider>
}
