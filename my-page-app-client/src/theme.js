import { AppTheme } from './types'

// old theme, not using anymore
export const appThemeOptions = {
  [AppTheme.LIGHT]: {
    palette: {
      mode: 'light',
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
      mode: 'dark',
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

// new theme using mui v5 createTheme
// https://mui.com/material-ui/customization/palette/#providing-the-colors-directly
export const getDesignTokens = (mode) => ({
  palette: {
    mode, // mode passed in
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#00b0ff'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#ff0030'
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    // A higher value for "tonalOffset" will make calculated values for "light" lighter, and "dark" darker.
    tonalOffset: 0.3
  }
})

// If I don't want to use mui's auto calculated dark values, use the following structure instead
// {
//   palette: {
//     mode,
//     ...(mode === 'light'
//       ? {
//           // palette values for light mode
//           primary: amber,
//           divider: amber[200],
//           text: {
//             primary: grey[900],
//             secondary: grey[800]
//           }
//         }
//       : {
//           // palette values for dark mode
//           primary: deepOrange,
//           divider: deepOrange[700],
//           background: {
//             default: deepOrange[900],
//             paper: deepOrange[900]
//           },
//           text: {
//             primary: '#fff',
//             secondary: grey[500]
//           }
//         })
//   }
// }
