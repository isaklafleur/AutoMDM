const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Defining Mongoose Schema
const acSchema = new Schema({
  facility: String,
  itemNumber: String,
  partName: String,
  partDescription: String,
  netWeight: String,
  customsTariff: String
});

// Create mongoose model
module.exports = mongoose.model("ACpart", acSchema);
