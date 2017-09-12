const mongoose = require("mongoose");
const parse = require("csv-parse");
const path = require("path");
const fs = require("fs");
const EOTD = require("../../models/EOTD");
require("dotenv").config({ path: "../../.env" });
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

const p = path.join(__dirname, "/../../", "data", "eOTD");
console.log(p);
const parser = parse({ delimiter: "," }, (err, data) => {
  console.log(data);

  // Looping and storing the data into mongodb
  console.log("data.length: ", data.length);
  for (let i = 1; i < data.length; i++) {
    const eotd = new EOTD();

    // Term: ADAPTER SET,CYLINDER COMPRESSION TESTER

    // Term_ID: 0161-1#TM-012896#1
    eotd.termID = data[i][0];
    // Concept_ID: 0161-1#01-011584#1
    eotd.conceptID = data[i][1];
    // Term: ADAPTER SET,CYLINDER COMPRESSION TESTER
    eotd.term = data[i][2];

    eotd
      .save()
      .then(() => {
        mongoose.disconnect();
      })
      .catch(err => {
        console.log("There was an error", err);
      });
  }
});

fs.createReadStream(`${p}/term.csv`).pipe(parser);
