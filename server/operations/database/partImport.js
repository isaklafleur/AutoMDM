const mongoose = require("mongoose");
const parse = require("csv-parse");
const path = require("path");
const fs = require("fs");
const CompanyPart = require("../../models/parts");
mongoose.Promise = require("bluebird");
const { connectToMongo } = require("./helpers/mongoOperations");

connectToMongo("autoMDM");

const p = path.join(__dirname, "/../../", "data");
const parserParts = parse({ delimiter: ";" }, (err, data) => {
  data.forEach((item, i) => {
    if (item[i][0] === "SDC") {
      const newPart = new CompanyPart();
      newPart.facility = item[i][0];
      newPart.partNumber = item[i][1];
      newPart.partName = item[i][2];
      newPart.partDescription = item[i][3];
      newPart.netWeight = item[i][4];
      newPart.customsTariff = item[i][5];
      newPart
        .save()
        .then(() => {
          mongoose.disconnect();
          console.log(`${data.length} docs imported successfully!`);
        })
        .catch(err => {
          console.log("There was an error", err);
        });
    }
  }); /* 

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === "SDC") {
      const newPart = new CompanyPart();
      newPart.facility = data[i][0];
      newPart.partNumber = data[i][1];
      newPart.partName = data[i][2];
      newPart.partDescription = data[i][3];
      newPart.netWeight = data[i][4];
      newPart.customsTariff = data[i][5];
      newPart
        .save()
        .then(() => {
          mongoose.disconnect();
          console.log(`${data.length} docs imported successfully!`);
        })
        .catch(err => {
          console.log("There was an error", err);
        });
    }
  } */
});

fs.createReadStream(`${p}/parts.csv`).pipe(parserParts);
