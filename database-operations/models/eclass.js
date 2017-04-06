var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Defining Mongoose Schema
const eClassSchema = mongoose.Schema({
    eclassSegment: { type: String, min: 2, max: 2 },
    eclassMainGroup: { type: String, min: 2, max: 2 },
    eclassGroup: { type: String, min: 2, max: 2 },
    eclassCommodityClass: { type: String, min: 2, max: 2 },
    preferredName: { type: String, max: 80 },
    definition: { type: String, max: 1023 },
    level: { type: String, min: 1, max: 1 },
    mkSubclass: { type: String, min: 1, max: 1 },
    mkKeyword: { type: String, min: 1, max: 1 }
});
    
// Create mongoose model
module.exports = mongoose.model('EClass', eClassSchema);