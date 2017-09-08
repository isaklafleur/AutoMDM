import React, { Component } from "react";
import Helmet from "react-helmet";
import SearchForm from "./SearchForm";
import PartTable from "./PartTable";
import axios from "axios";

class SearchTaric extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const headers = [{ id: "partName", label: "Part Name" }];
    return (
      <div className="grid-content-box">
        <Helmet>
          <title>Search Taric Tree</title>
        </Helmet>
        <h1>Search in TARIC</h1>
        <SearchForm headers={headers} />
      </div>
    );
  }
}

export default SearchTaric;
