import React, { Component } from "react";
import RCtree from "./components/RCtree";
import SearchParts from "./components/SearchParts";
import "./styles/App.css";

class App extends Component {
  render() {
    return (
      <div>
        <SearchParts />
        <RCtree />
      </div>
    );
  }
}

export default App;

// <CompanyPeople />
// <ListeClass />
