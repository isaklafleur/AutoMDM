import React, { Component } from "react";
import Tree, { TreeNode } from "rc-tree";
import axios from "axios";
import "rc-tree/assets/index.css";
import PartTable from "./PartTable";

function convertEclassToTreeItem(response) {
  const data = new Map();
  const treeData = [];
  // console.log("response", response);
  response.data.nodes.forEach(node => {
    data.set(node.codedName, {
      name: node.codedName + " " + node.preferredName,
      key: node.codedName
    });
  });
  // console.log("data", data);
  data.forEach((value, key) => {
    treeData.push(value);
  });
  // console.log("data", data);
  return treeData;
}

function generateTreeNodes(key, callback) {
  axios
    .get(`/api/eclass/${key}`)
    .then(response => callback(convertEclassToTreeItem(response)))
    .catch(error => console.log(error));
}

function getNewTreeData(treeData, curKey, child) {
  const loop = (data, level) => {
    data.forEach(item => {
      if (curKey.startsWith(item.key.substr(0, level))) {
        if (item.children) {
          loop(item.children, level + 2);
        } else {
          // if item is level 6, all it children are leaf.
          item.children =
            level === 6 ? child.map(c => ({ ...c, isLeaf: true })) : child;
        }
      }
    });
  };
  loop(treeData, 2);
}

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

class eClassTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      checkedKeys: []
    };
    this.onSelect = this.onSelect.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onLoadData = this.onLoadData.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/eclass")
      .then(response => {
        // console.log("response", response);
        this.setState({ treeData: convertEclassToTreeItem(response) });
      })
      .catch(error => console.log(error));
  }

  onSelect(info) {
    console.log("selected", info);
  }

  onCheck(checkedKeys) {
    console.log("checkedKeys", checkedKeys);
    this.setState({ checkedKeys });
  }
  onLoadData(treeNode) {
    // console.log("treeNode", treeNode);
    return new Promise(resolve => {
      const treeData = [...this.state.treeData];

      generateTreeNodes(treeNode.props.eventKey, child => {
        getNewTreeData(treeData, treeNode.props.eventKey, child);
        this.setState({ treeData }, resolve);
      });
    });
  }

  render() {
    const loop = data => {
      // console.log("data", data);
      return data.map(item => {
        if (item.children) {
          return (
            <TreeNode title={item.name} key={item.key}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return (
          <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} />
        );
      });
    };
    const treeNodes = loop(this.state.treeData);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1>eClass Tree</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Tree
              onSelect={this.onSelect}
              checkable={false}
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
              loadData={this.onLoadData}
            >
              {treeNodes}
            </Tree>
          </div>
          <div className="col">
            <PartTable list={list} />
          </div>
        </div>
      </div>
    );
  }
}

export default eClassTree;
