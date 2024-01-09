import { QueryClientProvider } from '@tanstack/react-query'
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles'
import { useMemo } from 'react'

import { AppDataProvider } from './contexts/AppDataContext'
import { ColorModeProvider } from './contexts/ColorModeContext'
import { getDesignTokens } from './theme'
import { queryClient } from './contexts/queryClient'
import { useColorMode } from './hooks/colorMode'
import Main from './components/Main'

export default function App() {
  const { mode } = useColorMode()

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <AppDataProvider>
          <ColorModeProvider>
            <ThemeProvider theme={theme}>
              <Main />
            </ThemeProvider>
          </ColorModeProvider>
        </AppDataProvider>
      </QueryClientProvider>
    </StyledEngineProvider>
  )
}
