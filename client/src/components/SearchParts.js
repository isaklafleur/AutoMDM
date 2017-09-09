import React, { Component } from "react";
import Helmet from "react-helmet";
import SearchForm from "./SearchForm";
import PartTable from "./PartTable";
import "../styles/App.css";

class SearchParts extends Component {
  constructor(props) {
    super(props);
    this.state = { parts: [], searchQuery: {}, activeCheckboxes: [] };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._activeCheckbox = this._activeCheckbox.bind(this);
  }

  render() {
    const headers = [
      { id: "partNumber", label: "Part Number", index: 1 },
      { id: "partName", label: "Part Name" },
      { id: "partDescription", label: "Part Description" },
      { id: "customsTariff", label: "Customs Tariff" },
      { id: "eclassCode", label: "eClass" },
      { id: "netWeight", label: "Net Weight (kg)" }
    ];
    // const { headers } = this.props;
    return (
      <div className="grid-content-box">
        <Helmet>
          <title>Search Parts</title>
        </Helmet>
        <h1>Search Parts</h1>
        <p>Example data: 5535210500, SCREW, 84314980</p>
        <SearchForm
          _handleSubmit={this._handleSubmit}
          numberOfParts={this.state.parts.length}
          headers={headers}
        />
        {this.state.parts.length > 0 && (
          <PartTable
            list={this.state.parts}
            activeCheckboxes={this.state.activeCheckboxes}
            _activeCheckbox={this._activeCheckbox}
            headers={headers}
          />
        )}
      </div>
    );
  }

  _handleSubmit(partsData) {
    this.setState({
      parts: partsData,
      activeCheckboxes: []
    });
  }

  _activeCheckbox(id) {
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
}

export default SearchParts;
