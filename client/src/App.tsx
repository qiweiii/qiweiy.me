import { QueryClientProvider } from '@tanstack/react-query'
import { StyledEngineProvider } from '@mui/material/styles'

import { AppDataProvider } from './contexts/AppDataContext'
import { ColorModeProvider } from './contexts/ColorModeContext'
import { queryClient } from './contexts/queryClient'
import Main from './components/Main'

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <AppDataProvider>
          <ColorModeProvider>
            <Main />
          </ColorModeProvider>
        </AppDataProvider>
      </QueryClientProvider>
    </StyledEngineProvider>
  )
}
