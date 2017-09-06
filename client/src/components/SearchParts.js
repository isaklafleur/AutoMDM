import React, { Component } from "react";
import Helmet from "react-helmet";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import PartTable from "./PartTable";
import axios from "axios";

class SearchParts extends Component {
  constructor(props) {
    super(props);
    this.state = { parts: [], activeCheckboxes: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.activeCheckboxHandler = this.activeCheckboxHandler.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const searchQuery = Object.assign({}, this.state.searchQuery);
    searchQuery[name] = value;

    this.setState({ searchQuery, activeCheckboxes: [] });
  }
  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/api/parts/search", this.state.searchQuery)
      .then(response => {
        this.setState({ parts: response.data.parts });
        // console.log(response);
      })
      .catch(error => console.log(error));
    this.setState({
      activeCheckboxes: []
    });
  }

  activeCheckboxHandler(id) {
    // console.log("activeCheckboxHandler id:", id);
    let found = this.state.activeCheckboxes.includes(id);
    if (found) {
      this.setState({
        activeCheckboxes: this.state.activeCheckboxes.filter(x => x !== id)
      });
    } else {
      this.setState({
        activeCheckboxes: [...this.state.activeCheckboxes, id]
      });
    }
  }

  _handleCheck(id) {}

  render() {
    return (
      <div className="grid-content-box">
        <Helmet>
          <title>Search Parts</title>
        </Helmet>
        <h1>Search Parts</h1>
        <p>Example part number: 5535210500</p>
        <p>Example part name: SCREW</p>
        <p>Example customs tariff number: 84314980</p>
        <TextField
          className="input-field"
          type="text"
          name="partNumber"
          onChange={this.handleChange}
          label="Part Number"
        />
        <br />
        <TextField
          className="input-field"
          type="text"
          name="partName"
          onChange={this.handleChange}
          label="Part Name"
        />
        <br />
        <TextField
          className="input-field"
          type="text"
          name="customsTariff"
          onChange={this.handleChange}
          label="Custom Tariff Number"
        />
        <br />
        <br />
        <Button raised color="primary" onClick={this.handleSubmit}>
          Search
        </Button>
        <br />
        <br />
        {this.state.parts.length > 0 && (
          <h4>Matches: {this.state.parts.length}</h4>
        )}
        <br />
        {this.state.parts.length > 0 && (
          <PartTable
            list={this.state.parts}
            activeCheckboxes={this.state.activeCheckboxes}
            activeCheckboxHandler={this.activeCheckboxHandler}
          />
        )}
      </div>
    );
  }
}

export default SearchParts;
