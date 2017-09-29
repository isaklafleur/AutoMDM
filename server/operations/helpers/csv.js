const csv = require("fast-csv");
const fs = require("fs");

function parseCSV(filePath, options) {
  return new Promise((resolve, reject) => {
    console.time("Time to parse file");
    const records = [];
    csv
      .fromPath(filePath, options)
      .on("data", record => {
        records.push(record);
      })
      .on("end", () => {
        console.timeEnd("Time to parse file");
        resolve(records);
      });
  });
}

function convertToCSV(array) {
  return new Promise((resolve, reject) => {
    csv.writeToString(array, { headers: true }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function writeDataToFile(filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, error => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
/* writeDataToCSV("test.csv", result)
  .then(res => console.log(res))
  .catch(error => console.log(error));
   */

module.exports.convertToCSV = convertToCSV;
module.exports.writeDataToFile = writeDataToFile;
module.exports.parseCSV = parseCSV;
