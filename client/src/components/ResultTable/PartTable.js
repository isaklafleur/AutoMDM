import React, { PureComponent } from "react";
import {
  AutoSizer,
  Column,
  Table,
  SortDirection,
  SortIndicator
} from "react-virtualized";
import { CSVLink, CSVDownload } from "react-csv";
import Button from "material-ui/Button";
import PropTypes from "prop-types";
import Checkbox from "material-ui/Checkbox";
import "react-virtualized/styles.css";
import "../../styles/App.css";
import styles from "./Table.example.css";

export default class PartTable extends PureComponent {
  constructor(props) {
    super(props);

    const sortBy = "partNumber";
    const sortDirection = SortDirection.ASC;
    const sortedList = this._sortList({ sortBy, sortDirection });

    this.state = {
      list: this.props.list,
      sortBy,
      sortDirection,
      sortedList,
      rowCount: 1000
    };
    this._noRowsRenderer = this._noRowsRenderer.bind(this);
    this._generateCheckbox = this._generateCheckbox.bind(this);
    this._sort = this._sort.bind(this);
  }

  render() {
    const { headers } = this.props;
    const { list, sortBy, sortDirection, sortedList, rowCount } = this.state;

    const rowGetter = ({ index }) => this._getDatum(sortedList, index);

    return (
      <div>
        <AutoSizer disableHeight>
          {({ width }) => (
            <Table
              width={width}
              height={500}
              headerHeight={50}
              rowHeight={50}
              rowClassName={this._rowClassName}
              rowCount={rowCount}
              rowGetter={({ index }) => list[index]} // ({ index }) => list[index]
              noRowsRenderer={this._noRowsRenderer}
              onHeaderClick={this._sortByClickedHeader}
              sort={this._sort}
              sortBy={sortBy}
              sortDirection={sortDirection}
            >
              {headers.map(header => {
                return (
                  <Column
                    key={header.id}
                    label={header.label}
                    dataKey={header.id}
                    width={100}
                    flexGrow={1}
                    cellRenderer={
                      header.index ? this._generateCheckbox : undefined
                    }
                  />
                );
              })}
            </Table>
          )}
        </AutoSizer>
        <CSVLink data={list}>
          <Button color="accent">Export {list.length} records to CSV</Button>
        </CSVLink>
      </div>
    );
  }

  _getDatum(list, index) {
    return list[index];
  }

  _sort({ sortBy, sortDirection }) {
    const sortedList = this._sortList({ sortBy, sortDirection });

    this.setState({ sortBy, sortDirection, sortedList });
  }

  _sortList({ sortBy, sortDirection }) {
    const { list } = this.props;
    if (sortBy) {
      let updatedList =
        // sort by name
        list.sort(function(a, b) {
          var nameA = a[sortBy].toUpperCase(); // ignore upper and lowercase
          var nameB = b[sortBy].toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
      sortDirection === SortDirection.DESC
        ? updatedList.reverse()
        : updatedList;
    }
  }

  _noRowsRenderer() {
    return <div>No Parts here...</div>;
  }
  _generateCheckbox(event) {
    // console.log(event);
    return (
      <div className="table-check-box">
        {this.props.activeCheckboxes && (
          <Checkbox
            onChange={() => this.props._activeCheckbox(event.rowData._id)}
            checked={this.props.activeCheckboxes.includes(event.rowData._id)}
          />
        )}
        {event.cellData}
      </div>
    );
  }
}

PartTable.PropTypes = {
  list: PropTypes.arrayOf({}).isRequired,
  activeCheckboxes: PropTypes.arrayOf({}),
  _activeCheckbox: PropTypes.func,
  headers: PropTypes.arrayOf({}.isRequired)
};
