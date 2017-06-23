const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;

// Defining Mongoose Schema
const euMatchSchema = new Schema({
  eclassName: String,
  eclassCode: String,
  eclassId: { type: mongoose.Schema.Types.ObjectId, ref: 'Eclass' },
  matches: Array,
});

// Create mongoose model
module.exports = mongoose.model('EuMatch', euMatchSchema);
