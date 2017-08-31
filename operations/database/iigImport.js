const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const parser = new xml2js.Parser({ trim: true });
const pxmls = path.join(__dirname, "../../data/xml-files");

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const IIG = require("../../models/iig");

mongoose.connect("mongodb://localhost:27017/autoMDM");

function onError(err) {
  console.log(err);
}
// Here's the reading part:
function readFiles(pxmls, onError) {
  fs.readdir(pxmls, (err, filenames) => {
    if (err) {
      onError(err);
      return;
    }
    // console.log(filenames);
    filenames.forEach(filename => {
      fs.readFile(`${pxmls}/${filename}`, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }

        parser.parseString(data, (err, result) => {
          if (err) {
            console.log(err);
          }
          // console.log(result);

          const iigData = {};
          iigData.name = result.ItemName.Name[0];
          iigData.code = result.ItemName.$.Code;
          // https://catalog.data.gov/dataset/federal-item-identification-guide-fiig
          // Federal Item Identification Guide (FIIG) Index is a search engine on the WWW listing all available FIIGs.
          iigData.fiig = result.ItemName.$.FIIG_4065;
          iigData.description = result.ItemName.Description[0];
          iigData.effectiveDate = result.ItemName.EffectiveDate[0];
          iigData.colloquialItems =
            result.ItemName.ColloquialItems[0].KeyValuePair;
          iigData.fscs = result.ItemName.FSCs[0].KeyValuePair;
          iigData.changelog = result.ItemName.ChangeLog[0];
          // console.log(iigData);
          const record = new IIG(iigData);
          record.save(err => {
            if (err) {
              console.log(err);
            }
          });
          parser.reset(iigData);
        });
      });
    });
  });
}

readFiles(pxmls);
