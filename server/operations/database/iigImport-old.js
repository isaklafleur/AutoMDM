const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const IIG = require("../../models/iig");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

const pjsons = path.join(__dirname, "../../data", "before-convert-json-files");
// console.log(pjsons);
// Here's the reading part:
function readFiles(pjsons, onError) {
  fs.readdir(pjsons, (err, filenames) => {
    if (err) {
      /* onError(err);*/
      console.log(err);
      return;
    }
    filenames.forEach(filename => {
      fs.readFile(`${pjsons}/${filename}`, "utf-8", (err, data) => {
        if (err) {
          /* onError(err);*/
          console.log(err);
          return;
        }

        const iigData = {};
        iigData.name = JSON.parse(data).ItemName.Name[0];
        iigData.code = JSON.parse(data).ItemName.$.Code;
        // https://catalog.data.gov/dataset/federal-item-identification-guide-fiig
        // Federal Item Identification Guide (FIIG) Index is a search engine on the WWW listing all available FIIGs.
        iigData.fiig = JSON.parse(data).ItemName.$.FIIG_4065;
        iigData.description = JSON.parse(data).ItemName.Description[0];
        iigData.effectiveDate = JSON.parse(data).ItemName.EffectiveDate[0];
        iigData.colloquialItems = JSON.parse(
          data
        ).ItemName.ColloquialItems[0].KeyValuePair;
        iigData.fscs = JSON.parse(data).ItemName.FSCs[0].KeyValuePair;
        /*iigData.changelog = JSON.parse(data).ItemName.ChangeLog[0];*/
        // console.log(iigData);
        const record = new IIG(iigData);

        record.save(err => {
          if (err) {
            console.log(err);
          }
        });
      });
    });
  });
}
readFiles(pjsons);
