const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

// Defining Mongoose Schema
const treeFilterSchema = new mongoose.Schema({
  name: String,
  nodes: Array,
});

module.exports = mongoose.model('TreeFilter', treeFilterSchema);
