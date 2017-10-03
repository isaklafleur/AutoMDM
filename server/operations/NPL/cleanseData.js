const Promise = require("bluebird");
const {
  connectToMongo,
  disconnectFromMongo,
  getDataFromDB,
} = require("../helpers/mongodb");
const { cleanseData, filterParts } = require("../helpers/dataCleaners");
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
  .then(results => {
    console.timeEnd("getData");
    console.time("Cleanse Data");
    return [cleanseData(results[0]), results[1]];
  })
  .then(cleanedparts => {
    console.time("Cleanse Data");
    console.log(cleanedparts[0].length);
    let counter1 = 0;
    let counter2 = 0;
    let counter3 = 0;
    let counter4 = 0;
    cleanedparts[0].forEach(item => {
      if (/\b,/.test(item.partName)) {
        // String follows the Noun,Adjective form
        counter1++;
      } else if (/^[A-Z.]+$/i.test(item.partName)) {
        // ONLY ONE WORD in string. Strings like V-BELT AND O-RING need to be handled seperated...
        counter2++;
      } else if (/^\s*[A-Z.]+(?:\s+[A-Z.]+)*\s*$/i.test(item.partName)) {
        // TWO WORDS OR MORE in string
        counter3++;
      } else {
        // The rest...
        counter4++;
      }
    });
  })
  .then(disconnectFromMongo)
  .catch(error => console.log(error));
