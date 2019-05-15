import React, { Component } from "react";
import NavBar from "./NavBar"
// import { Link } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from "./Routes";




const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#6fcff1', //zima blue
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
        {/* put Routes here later */}
        <Routes />
      </MuiThemeProvider>
    );
  }
}
export default App;

