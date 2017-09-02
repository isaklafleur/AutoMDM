const express = require("express");
const router = express.Router();
const CompanyPart = require("../models/parts");

router.post("/search", (req, res) => {
  console.log("req.body", req.body);
  const partNumber = req.body.partNumber;
  const partName = req.body.partName;
  const customTariffNumber = req.body.customTariffNumber;
  CompanyPart.find({
    $or: [
      { itemNumber: partNumber },
      { customsTariff: customTariffNumber },
      { partName: partName }
    ]
  })
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
