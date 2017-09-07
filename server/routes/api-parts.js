const express = require("express");
const router = express.Router();
const CompanyPart = require("../models/parts");

router.post("/search", (req, res) => {
  function createQuery(bodyFieldName, mongodbFieldName) {
    if (bodyFieldName !== undefined && bodyFieldName !== "") {
      const trimmedString = bodyFieldName.trim();
      if (
        trimmedString.charAt(0) !== "*" &&
        trimmedString.charAt(trimmedString.length - 1) !== "*"
      ) {
        // screw
        return (query[mongodbFieldName] = new RegExp(
          "^" + trimmedString + "$",
          "i"
        ));
      } else if (
        trimmedString.charAt(0) === "*" &&
        trimmedString.charAt(trimmedString.length - 1) === "*"
      ) {
        // *screw*
        return (query[mongodbFieldName] = new RegExp(
          trimmedString.replace(/[*]/g, ""),
          "i"
        ));
      } else if (
        trimmedString.charAt(0) !== "*" &&
        trimmedString.charAt(trimmedString.length - 1) === "*"
      ) {
        // screw*
        return (query[mongodbFieldName] = new RegExp(
          "^" + trimmedString.replace(/[*]/g, ""),
          "i"
        ));
      } else if (
        trimmedString.charAt(0) === "*" &&
        trimmedString.charAt(trimmedString.length - 1) !== "*"
      ) {
        // *screw
        return (query[mongodbFieldName] = new RegExp(
          trimmedString.replace(/[*]/g, "") + "$",
          "i"
        ));
      }
    }
  }

  console.log("req.body", req.body);
  let query = {};

  createQuery(req.body.partNumber, "itemNumber");
  createQuery(req.body.partName, "partName");
  createQuery(req.body.customsTariff, "customsTariff");
  createQuery(req.body.eclassCode, "eclassCode");
  console.log("query", query);

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
