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
    // console.log("props: ", this.props);
    const { list } = this.props;
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
              <Column
                label="Number"
                dataKey="itemNumber"
                disableSort
                width={100}
                flexGrow={1}
                cellRenderer={this._generateCheckbox}
              />
              <Column
                width={100}
                label="Name"
                dataKey="partName"
                disableSort
                flexGrow={1}
              />
              <Column
                width={100}
                label="Description"
                dataKey="partDescription"
                disableSort
                flexGrow={1}
              />
              <Column
                width={100}
                label="Customs Tariff"
                dataKey="customsTariff"
                disableSort
                flexGrow={1}
              />
              <Column
                width={100}
                label="eClass"
                dataKey="eclassCode"
                disableSort
                flexGrow={1}
              />
              <Column
                width={100}
                label="Net Weight (kg)"
                dataKey="netWeight"
                disableSort
                flexGrow={1}
              />
            </Table>
          )}
        </AutoSizer>
        <CSVLink data={list}>
          <Button color="accent">Export data to CSV-file</Button>
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
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
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
  activeCheckboxHandler: PropTypes.func
};
