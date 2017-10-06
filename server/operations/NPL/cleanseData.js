const Promise = require("bluebird");
const {
  connectToMongo,
  disconnectFromMongo,
  getDataFromDB,
  bulkImportToMongo,
  bulkUpdateToMongo,
} = require("../helpers/mongodb");
const {
  findAndReplaceAbbreviations,
  replaceNonAlphaChars,
  organizeString,
} = require("../helpers/dataCleaners");
const CompanyPart = require("../../models/parts");
const CompanyAbbreviation = require("../../models/companyAbbreviations");

connectToMongo("autoMDM");
console.time("getData");
Promise.all([
  getDataFromDB(CompanyPart, {}, { _id: 1, partName: 1, partNumber: 1 }),
  getDataFromDB(
    CompanyAbbreviation,
    {},
    { _id: 0, abbreviation: 1, expansion: 1 },
  ),
])
  .then(dataFromDB => {
    console.timeEnd("getData");
    console.time("findAndReplaceAbbreviations");
    console.log("Parts from db: ", dataFromDB[0].length);
    return findAndReplaceAbbreviations(dataFromDB[0], dataFromDB[1]);
  })
  .then(partsWithNoAbbreviations => {
    console.timeEnd("findAndReplaceAbbreviations");
    console.time("replaceNonAlphaChars");
    return replaceNonAlphaChars(partsWithNoAbbreviations);
  })
  .then(partsWithOnlyAlphaChars => {
    console.timeEnd("replaceNonAlphaChars");
    console.time("organizeString");
    return organizeString(partsWithOnlyAlphaChars);
  })
  .then(parts => {
    console.timeEnd("organizeString");
    // console.log("parts: ", parts);
    // take 1000 parts
    console.log(parts.length);
    console.time("Time to import parsed objects to db");

    bulkUpdateToMongo(parts, "parts");
  })
  .then(() => {
    console.timeEnd("Time to import parsed objects to db");
    // disconnectFromMongo;
  })
  .catch(error => console.log(error));
