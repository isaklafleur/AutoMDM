const mongoose = require("mongoose");

// Defining Mongoose Schema
const PartClusterSchema = new mongoose.Schema({
  partName: String,
  partCluster: Array
});

// Create mongoose model
module.exports = mongoose.model("PartCluster", PartClusterSchema);
