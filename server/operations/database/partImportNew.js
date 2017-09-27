const path = require("path");
const promiseCSV = require("./helpers/ImportCSVFiles");
const {
  connectToMongo,
  disconnectFromMongo,
  bulkImportToMongo
} = require("./helpers/mongoOperations");

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
promiseCSV(filePath, options)
  .then(records => {
    console.log("Connected to Database!");
    return bulkImportToMongo(records, "parts.js");
  })
  .then(result =>
    console.log("Total batches inserted: ", result, result.length)
  )
  .then(() => disconnectFromMongo())
  .catch(error => console.log(error));
