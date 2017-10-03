const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Defining Mongoose Schema
const partSchema = new Schema({
  facility: String,
  partNumber: String,
  partName: String,
  partNameCleaned: String,
  partDescription: String,
  netWeight: String,
  customsTariff: String,
  eclassCode: String,
});

partSchema.index({ partName: 1, type: 1 });

// Create mongoose model
module.exports = mongoose.model("CompanyPart", partSchema);
