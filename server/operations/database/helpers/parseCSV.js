const csv = require("fast-csv");

function parseCSV(filePath, options) {
  return new Promise((resolve, reject) => {
    console.time("Time to parse file");
    let records = [];
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

module.exports = parseCSV;
