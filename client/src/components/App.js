import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import injectTapEventPlugin from "react-tap-event-plugin";
import Routes from "../Routes";
import "../styles/App.css";

injectTapEventPlugin();

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    );
  }
}

export default App;
