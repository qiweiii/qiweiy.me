import React, { useState, useMemo, createContext } from 'react'
import MainApp from './MainApp'
import { AppTheme } from './types'
import { getDesignTokens } from './theme'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

export default function App() {
  // OS's prefer dark or light
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const defaultTheme = prefersDarkMode ? AppTheme.LIGHT : AppTheme.DARK
  const [mode, setMode] = useState(defaultTheme)
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <MainApp />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  )
}
