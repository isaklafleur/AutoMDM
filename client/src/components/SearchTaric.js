import React, { Component } from "react";
import Helmet from "react-helmet";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import PartTable from "./PartTable";
import axios from "axios";

class SearchTaric extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Search Taric Tree</title>
        </Helmet>
        <h1>Search Taric Tree</h1>
      </div>
    );
  }
}
