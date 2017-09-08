import React, { Component } from "react";
import Helmet from "react-helmet";
import SearchForm from "./SearchForm";
import PartTable from "./PartTable";

class SearchParts extends Component {
  constructor(props) {
    super(props);
    this.state = { parts: [], searchQuery: {}, activeCheckboxes: [] };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._activeCheckbox = this._activeCheckbox.bind(this);
  }

  render() {
    return (
      <div className="grid-content-box">
        <Helmet>
          <title>Search Parts</title>
        </Helmet>
        <SearchForm
          _handleSubmit={this._handleSubmit}
          numberOfParts={this.state.parts.length}
        />
        {this.state.parts.length > 0 && (
          <PartTable
            list={this.state.parts}
            activeCheckboxes={this.state.activeCheckboxes}
            _activeCheckbox={this._activeCheckbox}
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
