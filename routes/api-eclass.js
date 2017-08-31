const express = require("express");
const router = express.Router();
const EClass = require("../models/eclass");
const TreeFilter = require("../models/tree-filter");
const mongoose = require("mongoose");

// const EClass = mongoose.model('EClass', eClassSchema);

router.get("/filter", (req, res) => {
  TreeFilter.find({}, (err, filters) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      res.status(200).json({ filters });
    }
  });
});

router.post("/", (req, res) => {
  const filter = new TreeFilter();
  filter.nodes = req.body.nodes;
  filter.name = req.body.name;
  filter.save(err => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      res.status(200).json({ message: "ok" });
    }
  });
});

router.get("/:eclass", (req, res) => {
  if (req.query.filterId) {
    TreeFilter.findById(req.query.filterId, (err, filter) => {
      getChildNodes(filter);
    });
  } else {
    getChildNodes();
  }
  function getChildNodes(filter) {
    const segments = req.params.eclass.match(/.{1,2}/g);
    const query = {};

    let subnodeFound = false;
    if (segments[0] !== "-1") {
      query.eclassSegment = segments[0];
    }

    subnodeFound = getQuerySegment(
      segments[1],
      subnodeFound,
      query,
      "eclassMainGroup"
    );
    subnodeFound = getQuerySegment(
      segments[2],
      subnodeFound,
      query,
      "eclassGroup"
    );
    subnodeFound = getQuerySegment(
      segments[3],
      subnodeFound,
      query,
      "eclassCommodityClass"
    );

    if (filter) {
      query.$or = [];
      filter.nodes.forEach(node => {
        const re = new RegExp(`^${node}`, "g");
        query.$or.push({ codedName: re });
      });
    }
    // console.log(query);
    EClass.find(query)
      .sort({
        eclassSegment: 1,
        eclassMainGroup: 1,
        eclassGroup: 1,
        eclassCommodityClass: 1
      })
      .exec((err, nodes) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.status(200).json({ nodes });
      });
  }
});

function getQuerySegment(segment, subnodeFound, query, segmentName) {
  if (!subnodeFound && segment === "00") {
    subnodeFound = true;
    query[segmentName] = { $ne: "00" };
  } else {
    query[segmentName] = segment || "00";
  }
  return subnodeFound;
}

module.exports = router;
