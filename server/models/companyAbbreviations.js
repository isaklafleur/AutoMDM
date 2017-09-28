const mongoose = require("mongoose");

const companyAbbreviationsSchema = new mongoose.Schema(
  {
    company: String,
    abbreviation: String,
    expansion: String
  },
  { collection: "companyabbreviations" }
);

module.exports = mongoose.model(
  "CompanyAbbreviation",
  companyAbbreviationsSchema
);
