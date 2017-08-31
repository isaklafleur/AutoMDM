const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");

// Defining Mongoose Schema
const iigSchema = new mongoose.Schema({
  name: String,
  code: String,
  fiig: String,
  description: String,
  effectiveDate: String,
  colloquialItems: Array,
  fscs: Array,
  changelog: String
});

// Create mongoose model
module.exports = mongoose.model("IIG", iigSchema);
