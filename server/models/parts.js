const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Defining Mongoose Schema
const partSchema = new Schema({
  facility: String,
  itemNumber: String,
  partName: String,
  partDescription: String,
  netWeight: String,
  customsTariff: String,
  eclassCode: String
});

// Create mongoose model
module.exports = mongoose.model("CompanyPart", partSchema);
