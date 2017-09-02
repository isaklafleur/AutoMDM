const mongoose = require("mongoose");
const parse = require("csv-parse");
const path = require("path");
const fs = require("fs");
const CompanyPart = require("../../models/parts");
require("dotenv").config({ path: "../../.env" });
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

const p = path.join(__dirname, "/../../", "data");
// console.log(p);
const parserParts = parse({ delimiter: ";" }, (err, data) => {
  //   console.log(data[1][0]);

  // Looping and storing the data into mongodb
  console.log("data.length: ", data.length);
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === "SDC") {
      const newPart = new CompanyPart();
      newPart.facility = data[i][0];
      newPart.itemNumber = data[i][1];
      newPart.partName = data[i][2];
      newPart.partDescription = data[i][3];
      newPart.netWeight = data[i][4];
      newPart.customsTariff = data[i][5];
      newPart
        .save()
        .then(() => {
          mongoose.disconnect();
        })
        .catch(err => {
          console.log("There was an error", err);
        });
    }
  }
});

fs.createReadStream(`${p}/parts.csv`).pipe(parserParts);
