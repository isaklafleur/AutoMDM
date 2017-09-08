const express = require("express");
const router = express.Router();
const CompanyPart = require("../models/parts");

router.post("/search", (req, res) => {
  function createRegex(bodyFieldName) {
    return new RegExp(
      // Escape all special characters except *
      "^" +
        bodyFieldName
          .replace(/([.+?^=!:${}()|\[\]\/\\])/g, "\\$1")
          // Allow the use of * as a wildcard like % in SQL.
          .replace(/\*/g, ".*") +
        "$",
      "i"
    );
  }
  function createQuery(bodyFieldName, dbField) {
    if (bodyFieldName === undefined) {
      return;
    }
    // Trim the input before checking as otherwise searching for a
    // single space could cause problems.
    bodyFieldName = bodyFieldName.trim();
    if (bodyFieldName !== "") {
      query[dbField] = createRegex(bodyFieldName);
    }
  }

  // console.log("req.body", req.body);
  let query = {};

  createQuery(req.body.partNumber, "partNumber");
  createQuery(req.body.partName, "partName");
  createQuery(req.body.partDescription, "partDescription");
  createQuery(req.body.customsTariff, "customsTariff");
  createQuery(req.body.eclassCode, "eclassCode");
  createQuery(req.body.netWeight, "netWeight");
  // console.log("query", query);

  CompanyPart.find(query)
    .sort({
      itemNumber: 1
    })
    .exec((err, parts) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      // console.log(parts);
      res.status(200).json({ parts });
    });
});

module.exports = router;
