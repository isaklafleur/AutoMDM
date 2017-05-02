const mongoose = require('mongoose');

// Defining Mongoose Schema
const acSchema = new mongoose.Schema({
  facility: String,
  item_number: String,
  part_name: String,
  part_description: String,
  net_weight: String,
  customs_statistical: String,
});

// Create mongoose model
module.exports = mongoose.model('ACpart', acSchema);
