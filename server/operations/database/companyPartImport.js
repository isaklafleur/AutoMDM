const path = require("path");
const parseCSV = require("./helpers/parseCSV");
const {
  connectToMongo,
  disconnectFromMongo,
  bulkImportToMongo
} = require("./helpers/mongodb");

const filePath = path.join(__dirname, "../../data/parts.csv");
const options = {
  delimiter: ";",
  noheader: true,
  headers: [
    "facility",
    "partNumber",
    "partName",
    "partDescription",
    "netWeight",
    "customsTariff"
  ]
};

connectToMongo("autoMDM");
parseCSV(filePath, options)
  .then(records => {
    console.time("Time to import parsed objects to db");
    return bulkImportToMongo(records, "parts.js");
  })
  /*   .then(result =>
    console.log("Total batches inserted: ", result, result.length)
  ) */
  .then(() => {
    disconnectFromMongo();
    console.timeEnd("Time to import parsed objects to db");
  })
  .catch(error => console.log(error));
