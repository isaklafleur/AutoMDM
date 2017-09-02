import React, { Component } from "react";
import Tree, { TreeNode } from "rc-tree";
import axios from "axios";
import "rc-tree/assets/index.css";

function generateTreeNodes(treeNode) {
  const arr = [];
  const key = treeNode.props.eventKey;
  // console.log("key", key);
  axios
    .get(`/api/eclass/${key}`)
    .then(response => {
      response.data.nodes.map((node, i) => {
        return arr.push({ name: node.codedName, key: node.codedName });
      });
      // console.log("child array", arr);
    })
    .catch(error => console.log(error));

  /*   for (let i = 0; i < 3; i++) {
    arr.push({ name: `leaf ${key}-${i}`, key: `${key}-${i}` });
  } */
  return arr;
}

function getNewTreeData(treeData, curKey, child, level) {
  console.log("child", child);
  const loop = data => {
    // if (level < 1 || curKey.length - 3 > level * 2) return;
    data.forEach(item => {
      // console.log("curKey.indexOf(item.key)", curKey.indexOf(item.key));
      if (curKey.indexOf(item.key) === 0) {
        console.log("item.children", item.children);
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };
  loop(treeData);
  // setLeaf(treeData, curKey, level);
}

/* function setLeaf(treeData, curKey, level) {
  const loopLeaf = (data, lev) => {
    const l = lev - 1;
    data.forEach(item => {
      if (
        item.key.length > curKey.length
          ? item.key.indexOf(curKey) !== 0
          : curKey.indexOf(item.key) !== 0
      ) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children, l);
      } else if (l < 1) {
        item.isLeaf = true;
      }
    });
  };
  loopLeaf(treeData, level + 1);
} */

class RCtree extends Component {
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
        let treeData = [];
        response.data.nodes.map((node, i) => {
          return treeData.push({ name: node.codedName, key: node.codedName });
        });
        // console.log("treeData: " + JSON.stringify(treeData, null, 2));
        this.setState({ treeData: treeData });
        // console.log("state.nodes", JSON.stringify(this.state, null, 2));
      })
      .catch(error => console.log(error));
  }

  /*   componentDidMount() {
    setTimeout(() => {
      this.setState({
        treeData: [
          { name: "pNode 01", key: "0-0" },
          { name: "pNode 02", key: "0-1" },
          { name: "pNode 03", key: "0-2", isLeaf: true }
        ],
        checkedKeys: ["0-0"]
      });
    }, 100);
  } */
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
      // console.log("treeNode.props.eventKey,", treeNode.props.eventKey);
      getNewTreeData(
        treeData,
        treeNode.props.eventKey,
        generateTreeNodes(treeNode),
        2
      );
      this.setState({ treeData });
      resolve();
    });
  }

  render() {
    const loop = data => {
      console.log("data", data);
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
      <div>
        <h2>dynamic render</h2>
        <Tree
          onSelect={this.onSelect}
          checkable
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          loadData={this.onLoadData}
        >
          {treeNodes}
        </Tree>
      </div>
    );
  }
}

export default RCtree;
