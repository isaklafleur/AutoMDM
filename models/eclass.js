const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

// Defining Mongoose Schema
const eClassSchema = new mongoose.Schema({
  eclassSegment: { type: String, min: 2, max: 2 },
  eclassMainGroup: { type: String, min: 2, max: 2 },
  eclassGroup: { type: String, min: 2, max: 2 },
  eclassCommodityClass: { type: String, min: 2, max: 2 },

  supplier: String,
  idCC: String,
  identifier: String,
  versionNumber: String,
  versionDate: String,
  revisionNumber: String,
  codedName: String,
  preferredName: String,
  definition: String,
  ISOLanguage: String,
  ISOCountryCode: String,
  note: String,
  remark: String,
  level: String,
  mkSubclass: String,
  mkKeyword: String,
  irdiCC: String,

  keyword: String,
});
// 0 Supplier;
// 1 IdCC;
// 2 Identifier;
// 3 VersionNumber;
// 4 VersionDate;
// 5 RevisionNumber;
// 6 CodedName;
// 7 PreferredName;
// 8 Definition;
// 9 ISOLanguageCode;
// 10 ISOCountryCode;
// 11 Note;
// 12 Remark;
// 13 Level;
// 14 MKSubclass;
// 15 MKKeyword;
// 16 IrdiCC

// Create mongoose model
module.exports = mongoose.model('EClass', eClassSchema);
