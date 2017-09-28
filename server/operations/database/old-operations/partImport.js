const mongoose = require("mongoose");
const parse = require("csv-parse");
const path = require("path");
const fs = require("fs");
const CompanyPart = require("../../models/parts");
mongoose.Promise = global.Promise;
const { connectToMongo } = require("./helpers/mongodb");

connectToMongo("autoMDM2");
parseCSV(filePath, options)
  .then(records => {
    console.time("Time to import parsed objects to db");
    const length = data.length;
    for (let i = 1; i < length; i++) {
      if (data[i][0] === "SDC") {
        const newPart = new CompanyPart();
        newPart.facility = data[i][0];
        newPart.partNumber = data[i][1];
        newPart.partName = data[i][2];
        newPart.partDescription = data[i][3];
        newPart.netWeight = data[i][4];
        newPart.customsTariff = data[i][5];
        newPart.save();
      }
    }
  })
  .then(() => {
    disconnectFromMongo();
    console.timeEnd("Time to import parsed objects to db");
  })
  .catch(err => {
    console.log("There was an error", err);
  });
