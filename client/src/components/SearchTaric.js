import React, { Component } from "react";
import TextField from "material-ui/TextField";
import levenshtein from "js-levenshtein";
import fuzzball from "fuzzball";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";
import Highlighter from "react-highlight-words";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import axios from "axios";
import "../styles/App.css";

class SearchTaric extends Component {
  constructor(props) {
    super(props);
    this.state = { taricData: [], searchQuery: {} };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  render() {
    const { searchQuery, taricData } = this.state;
    return (
      <div className="grid-content-box">
        <h1>Search TARIC</h1>
        <TextField
          className="input-field"
          type="text"
          name="partName"
          onChange={this._handleChange}
          label="Parts Name"
        />
        <Button raised color="primary" onClick={this._handleSubmit}>
          Search
        </Button>
        <br />
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TARIC</TableCell>
                <TableCell>DESCRIPTION</TableCell>
                <TableCell>js-levenshtein</TableCell>
                <TableCell>fuzzball.ratio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taricData.map(n => {
                return (
                  <TableRow key={n._id}>
                    <TableCell>
                      {n.hsChapter}
                      {n.hsHeading}
                      {n.hsSubheading}
                      {n.cnSubheading}
                      {n.taricCode}
                    </TableCell>
                    <TableCell>
                      <Highlighter
                        highlightClassName="highlightText"
                        searchWords={[
                          this.state.searchQuery.partName.replace(/[*]/g, "")
                        ]}
                        textToHighlight={n.description}
                      />
                      {n.description}
                    </TableCell>
                    <TableCell>
                      {levenshtein(
                        this.state.searchQuery.partName.replace(/[*]/g, ""),
                        n.description
                      )}
                    </TableCell>
                    <TableCell>
                      {fuzzball.ratio(
                        this.state.searchQuery.partName.replace(/[*]/g, ""),
                        n.description
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }

  _handleChange(event) {
    const searchQuery = Object.assign({}, this.state.searchQuery);
    searchQuery[event.target.name] = event.target.value;
    this.setState({ searchQuery });
  }
  _handleSubmit(event) {
    // console.log(this.state.searchQuery);
    axios
      .post("/api/taric", this.state.searchQuery)
      .then(response => {
        this.setState({
          taricData: response.data.taricData
        });
      })
      .catch(error => console.log(error));
  }
}

export default SearchTaric;
