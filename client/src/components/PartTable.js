import React, { PureComponent } from "react";
import { AutoSizer, Column, Table } from "react-virtualized";
import "react-virtualized/styles.css";
import "../styles/App.css";

export default class PartTable extends PureComponent {
  constructor(props, context) {
    super(props);

    this.state = {};
    this._handleClick = this._handleClick.bind(this);
    this._noRowsRenderer = this._noRowsRenderer.bind(this);
    this._generateCheckbox = this._generateCheckbox.bind(this);
  }
  _handleClick(e) {
    console.log("handleClick");
    console.log("event _id: ", e.rowData._id);
  }
  _noRowsRenderer() {
    return <div>No rows</div>;
  }
  _generateCheckbox() {
    return <input type="checkbox" />;
  }
  render() {
    // console.log("props: ", this.props);
    return (
      <div className="AutoSizerWrapper">
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={width}
              height={height}
              headerHeight={50}
              rowHeight={50}
              rowCount={this.props.list.length}
              rowGetter={({ index }) => this.props.list[index]}
              onRowClick={this._handleClick}
              noRowsRenderer={this._noRowsRenderer}
            >
              <Column
                label="#"
                dataKey="_id"
                width={30}
                cellRenderer={this._generateCheckbox}
              />
              <Column
                label="Part Number"
                dataKey="itemNumber"
                disableSort
                width={100}
                flexGrow={1}
              />
              <Column
                width={100}
                label="Part Name"
                dataKey="partName"
                disableSort
                flexGrow={1}
              />
              <Column
                width={100}
                label="Part Description"
                dataKey="partDescription"
                disableSort
                flexGrow={1}
              />
              <Column
                width={100}
                label="customs Tariff Number"
                dataKey="customsTariff"
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
      </div>
    );
  }
}
