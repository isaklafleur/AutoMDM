const mongoose = require("mongoose");

// Defining Mongoose Schema
const treeFilterSchema = new mongoose.Schema({
  name: String,
  nodes: Array
});

module.exports = mongoose.model("TreeFilter", treeFilterSchema);
