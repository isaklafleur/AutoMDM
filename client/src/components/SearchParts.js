import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
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
      <div>
        <h1>Search for...</h1>
        example part number: 5535210500<br />
        example customs tariff number: 84314980<br />
        <TextField
          type="text"
          name="partNumber"
          onChange={this.handleChange}
          hintText="Part Number"
        />
        <br />
        <TextField
          type="text"
          name="partName"
          onChange={this.handleChange}
          hintText="Part Name"
        />
        <br />
        <TextField
          type="text"
          name="customsTariff"
          onChange={this.handleChange}
          hintText="Custom Tariff Number"
        />
        <br />
        <RaisedButton
          label="Search"
          primary={true}
          onClick={this.handleSubmit}
        />
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
