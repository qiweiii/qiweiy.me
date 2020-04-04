import React, { useState } from "react";
import NavBar from "./NavBar"
import { AppTheme } from "./types";
import AppThemeOptions from "./theme";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


export default function App() {
  // OS's prefer dark or light
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const defaultTheme = prefersDarkMode ? AppTheme.LIGHT : AppTheme.DARK
  const [theme, setTheme] = useState(defaultTheme);
  console.log(theme)

  const toggleDarkTheme = () => {
    setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK: AppTheme.LIGHT)
  }
  
  // we generate a MUI-theme from state's theme object
  const muiTheme = createMuiTheme(AppThemeOptions[theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <NavBar onToggleDark={toggleDarkTheme} isDark={theme === AppTheme.DARK}/>
    </ThemeProvider>
  );
}