// http://wiki.eclass.eu/wiki/csv_file_description
const mongoose = require("mongoose");
const parse = require("csv-parse");
const path = require("path");
const fs = require("fs");
const TaricCode = require("../../models/taric");
require("dotenv").config({ path: "../../.env" });
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

const p = path.join(__dirname, "/../../", "data");
// console.log(p);
const parserEclass = parse({ delimiter: ";" }, (err, data) => {
  console.log(data[1][0]);
  //  const codedName = data.map((item, i) => data[i][6]);

  // Looping and storing the data into mongodb
  console.log("data.length: ", data.length);
  for (let i = 1; i < data.length; i++) {
    const newTaric = new TaricCode();

    newTaric.taricCode = data[i][0].slice(0, 10);
    newTaric.dateStart = data[i][1];
    newTaric.dateEnd = data[i][2];
    newTaric.languageCode = data[i][3];
    newTaric.hierPos = data[i][4];
    newTaric.substring = data[i][5];
    newTaric.description = data[i][6];
    newTaric
      .save()
      .then(() => {
        mongoose.disconnect();
      })
      .catch(err => {
        console.log("There was an error", err);
      });
  }
});

fs.createReadStream(`${p}/TARIC_Nomenclature_EN.csv`).pipe(parserEclass);
