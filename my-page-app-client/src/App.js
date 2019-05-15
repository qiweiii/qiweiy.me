import React, { Component } from "react";
import NavBar from "./NavBar"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';




const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#00b0ff',
      dark: '#002884',
      contrastText: '#fff',
    },
  },
  typography: { useNextVariants: true },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <NavBar />
      </MuiThemeProvider>
    );
  }
}
export default App;

