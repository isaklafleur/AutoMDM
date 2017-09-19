const mongoose = require("mongoose");
const path = require("path");
var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));
const fs = Promise.promisifyAll(require("fs"));
const parse = Promise.promisifyAll(require("csv-parse"));
const EOTD = require("../../models/EOTD");
require("dotenv").config({ path: "../../.env" });

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

const pathCSVterm = path.join(
  __dirname,
  "/../../",
  "data",
  "eOTD",
  "term-files",
  "csv"
);

function _importTermCsv(data, mongooseModel) {
  //console.log("Hello");
  //console.log(data);
  for (let i = 1; i < data.length; i++) {
    const eotd = new EOTD();
    // Term_ID: 0161-1#TM-012896#1
    eotd.termID = data[i][0];
    // Concept_ID: 0161-1#01-011584#1
    eotd.conceptID = data[i][1];
    // Term: ADAPTER SET,CYLINDER COMPRESSION TESTER
    eotd.term = data[i][2];
    eotd.save().catch(err => {
      console.log("There was an error", err);
    });
  }
}

function _readFiles(path, onError) {
  console.log("Hello!");
  fs
    .readdir(path)
    .then(filenames => {
      console.log("filenames: ", filenames);
      filenames.forEach(filename => {
        console.log("filename :", filename);
        fs
          .readFile(path + "/" + filename, "utf-8")
          .then(data => {
            console.log("hello");
            parse(data, function(err, output) {
              _importTermCsv(output, EOTD);
            });
          })
          .catch(error => console.log("Error: ", error));
      });
    })
    .catch(err => console.log(err));
}
