const express = require("express");
const router = express.Router();
const CompanyPart = require("../models/parts");

router.post("/search", (req, res) => {
  console.log("req.body", req.body);
  let query = {};
  if (req.body.partNumber !== undefined && req.body.partNumber !== "") {
    query.itemNumber = req.body.partNumber;
  }
  if (req.body.partName !== undefined && req.body.partName !== "") {
    query.partName = req.body.partName;
  }
  if (req.body.customsTariff !== undefined && req.body.customsTariff !== "") {
    query.customsTariff = req.body.customsTariff;
  }
  if (req.body.eclassCode !== undefined && req.body.eclassCode !== "") {
    query.eclassCode = req.body.eclassCode;
  }
  //console.log("query", query);
  CompanyPart.find(query)
    .sort({
      itemNumber: 1
    })
    .exec((err, parts) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.status(200).json({ parts });
    });
});

module.exports = router;
