const Promise = require("bluebird");
const csv = require("fast-csv");
const path = require("path");
const fs = Promise.promisifyAll(require("fs"));

const promiseCSV = Promise.method((filePath, options) => {
  return new Promise((resolve, reject) => {
    var records = [];
    csv
      .fromPath(filePath, options)
      .on("data", record => {
        records.push(record);
      })
      .on("end", () => {
        // console.log(records);
        resolve(records);
      });
  });
});

// EXAMPLE HOW TO USE THIS MODULE
/* const filePath = path.join(__dirname, "../../data/parts.csv");
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

promiseCSV(filePath, options).then(records => console.log(records));
*/

module.exports = promiseCSV;
