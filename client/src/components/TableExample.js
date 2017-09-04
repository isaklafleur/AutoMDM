import React, { PureComponent } from "react";
import { AutoSizer, Column, Table } from "react-virtualized";
import styles from "react-virtualized/styles.css";

const list = [
  {
    index: 2,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 1,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 3,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 4,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 5,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 6,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 7,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 8,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 9,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 10,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 11,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 12,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 13,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 14,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 15,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  },
  {
    index: 16,
    name: "Brian Vaughn",
    description:
      "Software Software Software Software Software Software Software Software Software Software Software "
  }
];

export default class TableExample extends PureComponent {
  constructor(props, context) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            width={1000}
            height={300}
            headerHeight={50}
            rowHeight={50}
            rowCount={list.length}
            rowGetter={({ index }) => list[index]}
          >
            <Column label="Index" dataKey="index" width={60} />
            <Column
              label="Name"
              dataKey="name"
              width={200}
              disableSort
              flexGrow={1}
            />
            <Column
              width={400}
              label="Description"
              dataKey="description"
              disableSort
              flexGrow={2}
              className={styles.exampleColumn}
            />
          </Table>
        )}
      </AutoSizer>
    );
  }
}
