import React, { PureComponent } from "react";
import { AutoSizer, Column, Table } from "react-virtualized";
import { CSVLink, CSVDownload } from "react-csv";
import Button from "material-ui/Button";
import PropTypes from "prop-types";
import Checkbox from "material-ui/Checkbox";
import "react-virtualized/styles.css";
import "../styles/App.css";

export default class PartTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this._noRowsRenderer = this._noRowsRenderer.bind(this);
    this._generateCheckbox = this._generateCheckbox.bind(this);
  }

  render() {
    // console.log(this.props);
    const { list, headers } = this.props;

    return (
      <div>
        <AutoSizer disableHeight>
          {({ width }) => (
            <Table
              width={width}
              height={500}
              headerHeight={50}
              rowHeight={50}
              rowCount={list.length}
              rowGetter={({ index }) => list[index]}
              noRowsRenderer={this._noRowsRenderer}
            >
              {headers.map(header => {
                return (
                  <Column
                    key={header.id}
                    label={header.label}
                    dataKey={header.id}
                    disableSort
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
  list: PropTypes.arrayOf({}),
  activeCheckboxes: PropTypes.arrayOf({}),
  _activeCheckbox: PropTypes.func,
  headers: PropTypes.arrayOf({})
};
