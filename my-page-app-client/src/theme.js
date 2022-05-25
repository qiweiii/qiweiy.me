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
      fontFamily: [
        'sans-serif',
        'Roboto',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
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
      fontFamily: [
        'sans-serif',
        '"Helvetica Neue"',
        'Roboto',
        '"Segoe UI"',
        'Arial',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    }
  }
}

export default appThemeOptions
