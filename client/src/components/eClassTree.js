import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Grid from "material-ui/Grid";
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

class eClassTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      partsData: [],
      checkedKeys: [],
      selectedTreeCategory: ""
    };
    this._onSelect = this._onSelect.bind(this);
    this._onCheck = this._onCheck.bind(this);
    this._onLoadData = this._onLoadData.bind(this);
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

  render() {
    const headers = [
      { id: "partNumber", label: "Part Number" },
      { id: "partName", label: "Part Name" },
      { id: "partDescription", label: "Part Description" },
      { id: "customsTariff", label: "Customs Tariff" },
      { id: "eclassCode", label: "eClass" },
      { id: "netWeight", label: "Net Weight (kg)" }
    ];
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
      <div className="grid-content-box">
        <Helmet>
          <title>eClass Tree</title>
        </Helmet>
        <h1>eClass Tree</h1>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <Tree
              onSelect={this._onSelect}
              checkable={false}
              onCheck={this._onCheck}
              checkedKeys={this.state.checkedKeys}
              loadData={this._onLoadData}
            >
              {treeNodes}
            </Tree>
          </Grid>
          <Grid item xs={12} sm={6}>
            <PartTable list={this.state.partsData} headers={headers} />
          </Grid>
        </Grid>
      </div>
    );
  }
  _onSelect(info) {
    // console.log("selected", info);
    axios
      .post("/api/parts/search", { eclassCode: info.toString() })
      .then(result => {
        // console.log(result.data.parts);
        this.setState({ partsData: result.data.parts });
      })
      .catch(error => console.log(error));
  }

  _onCheck(checkedKeys) {
    // console.log("checkedKeys", checkedKeys);
    this.setState({ checkedKeys });
  }
  _onLoadData(treeNode) {
    // console.log("treeNode", treeNode);
    return new Promise(resolve => {
      const treeData = [...this.state.treeData];

      generateTreeNodes(treeNode.props.eventKey, child => {
        getNewTreeData(treeData, treeNode.props.eventKey, child);
        this.setState({ treeData }, resolve);
      });
    });
  }
}

export default eClassTree;
