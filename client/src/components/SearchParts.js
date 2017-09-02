import React, { Component } from "react";
import axios from "axios";

/* class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: null };
  }
  render() {
    return (
      <table>
        <tr>
          <th>Facility</th>
          <th>Part Number</th>
          <th>Part Name</th>
          <th>Part Description</th>
          <th>Customs Tariff Number</th>
          <th>Net weight (kg)</th>
        </tr>
        <tr>
          <td>Jill</td>
          <td>Smith</td>
          <td>50</td>
        </tr>
      </table>
    );
  }
} */

class SearchParts extends Component {
  constructor(props) {
    super(props);
    this.state = { parts: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
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
        console.log(response);
      })
      .catch(error => console.log(error));
  }
  handleSubmit2(event) {
    event.preventDefault();
    console.log("this.state", JSON.stringify(this.state, null, 2));
  }

  render() {
    return (
      <div>
        <h1>Search for...</h1>
        example part number: 5535210500<br />
        example customs tariff number: 84314980<br />
        <label>
          Custom Tariff Number
          <input
            type="text"
            name="customTariffNumber"
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Part Number
          <input type="text" name="partNumber" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Part Name
          <input type="text" name="partName" onChange={this.handleChange} />
        </label>
        <br />
        <input type="submit" value="Search" onClick={this.handleSubmit} />
        <br />
        <input type="submit" value="State" onClick={this.handleSubmit2} />
        <br />
        Matches: {this.state.parts.length}
        <table>
          <thead>
            <tr>
              <th>Facility</th>
              <th>Part Number</th>
              <th>Part Name</th>
              <th>Part Description</th>
              <th>Customs Tariff Number</th>
              <th>Net weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.parts.map((part, i) => {
              return (
                <tr key={part.itemNumber}>
                  <td>{part.facility}</td>
                  <td>{part.itemNumber}</td>
                  <td>{part.partName}</td>
                  <td>{part.partDescription}</td>
                  <td>{part.customsTariff}</td>
                  <td>{part.netWeight}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchParts;
