import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import axios from "axios";

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
        // console.log(response);
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
        <input type="submit" value="Get state" onClick={this.handleSubmit2} />
        <br />
        Matches: {this.state.parts.length}
        <br />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Facility</TableHeaderColumn>
              <TableHeaderColumn>Part Number</TableHeaderColumn>
              <TableHeaderColumn>Part Name</TableHeaderColumn>
              <TableHeaderColumn>Part Description</TableHeaderColumn>
              <TableHeaderColumn>Customs Tariff Number</TableHeaderColumn>
              <TableHeaderColumn>Net weight (kg)</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.state.parts.map((part, i) => {
              return (
                <TableRow key={part.itemNumber}>
                  <TableRowColumn>{part.facility}</TableRowColumn>
                  <TableRowColumn>{part.itemNumber}</TableRowColumn>
                  <TableRowColumn>{part.partName}</TableRowColumn>
                  <TableRowColumn>{part.partDescription}</TableRowColumn>
                  <TableRowColumn>{part.customsTariff}</TableRowColumn>
                  <TableRowColumn>{part.netWeight}</TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default SearchParts;

/* 
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
          
          </tbody>
        </table>
        */
