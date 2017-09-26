const path = require("path");
const promiseCSV = require("./helpers/ImportCSVFiles");
const {
  connectToMongo,
  bulkImportToMongo
} = require("./helpers/mongoOperations");

const filePath = path.join(__dirname, "../../data/parts.csv");
const options = {
  delimiter: ";",
  noheader: true,
  headers: [
    "facility",
    "item_number",
    "part_name",
    "part_description",
    "net_weight",
    "customs_statistical"
  ]
};

connectToMongo("autoMDM");
promiseCSV(filePath, options).then(records => {
  bulkImportToMongo(records, "parts.js");
});
