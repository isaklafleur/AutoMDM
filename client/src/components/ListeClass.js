import React, { Component } from "react";
import TreeView from "react-treeview";
import axios from "axios";

class ListeClass extends Component {
  constructor(props) {
    super(props);
    this.state = { nodes: [] };
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }
  componentWillMount() {
    axios
      .get("/api/eclass/13000000")
      .then(response => {
        this.setState({ nodes: response.data.nodes });
        // console.log("state.nodes", JSON.stringify(this.state.nodes, null, 2));
      })
      .catch(error => console.log(error));
  }

  handleNodeClick(event) {
    console.log("handleNodeClick");
    console.log(event.target.id);
    axios
      .get(`/api/eclass/${event.target.id}`)
      .then(response => {
        console.log(response.data.nodes);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        {this.state.nodes.map((node, i) => {
          const label = <span>{node.codedName}</span>;
          return (
            <TreeView
              key={node.codedName}
              id={node.codedName}
              nodeLabel={label}
              defaultCollapsed={true}
              onClick={this.handleNodeClick}
            >
              test
            </TreeView>
          );
        })}
      </div>
    );
  }
}

export default ListeClass;
