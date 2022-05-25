import { AppTheme } from './types'

const appThemeOptions = {
  [AppTheme.LIGHT]: {
    palette: {
      type: 'light',
      primary: {
        light: '#757ce8',
        main: '#00b0ff',
        dark: '#002884',
        contrastText: '#fff'
      }
    },
    typography: {
      useNextVariants: true,
      fontFamily: ['Roboto'].join(',')
    }
  },
  [AppTheme.DARK]: {
    palette: {
      type: 'dark',
      primary: {
        light: '#757ce8',
        main: '#00b0ff',
        dark: '#002884',
        contrastText: '#fff'
      }
    },
    typography: {
      useNextVariants: true,
      fontFamily: ['Roboto'].join(',')
    }
  }
}

export default appThemeOptions
