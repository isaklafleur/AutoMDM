import React, { Component } from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import PartTable from "./PartTable";
import axios from "axios";

class SearchParts extends Component {
  constructor(props) {
    super(props);
    this.state = { parts: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const searchQuery = Object.assign({}, this.state.searchQuery);
    searchQuery[name] = value;

    this.setState({ searchQuery });
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
  }

  render() {
    return (
      <div className="grid-content-box">
        <h1>Search for...</h1>
        example part number: 5535210500<br />
        example customs tariff number: 84314980<br />
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
        {this.state.parts.length > 0 && <PartTable list={this.state.parts} />}
      </div>
    );
  }
}

export default SearchParts;
