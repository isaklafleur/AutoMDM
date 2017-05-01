const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Defining Mongoose Schema
const acSchema = mongoose.Schema({
  facility: String,
  item_number: String,
  part_name: String,
  part_description: String,
  net_weight: String,
  customs_statistical: String,
});

// Create mongoose model
module.exports = mongoose.model('ACpart', acSchema);
