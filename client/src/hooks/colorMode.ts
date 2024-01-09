import { useContext } from 'react'

import { ColorModeContext } from 'src/contexts/ColorModeContext'

export const useColorMode = () => {
  const { mode, toggleMode } = useContext(ColorModeContext)
  return { mode, toggleMode }
}
