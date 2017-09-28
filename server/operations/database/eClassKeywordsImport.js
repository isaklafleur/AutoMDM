const path = require("path");
const mongoose = require("mongoose");
const EClassCode = require("../../models/eclass");
const { connectToMongo, disconnectFromMongo } = require("./helpers/mongodb");
const parseCSV = require("./helpers/parseCSV");

const filePath = path.join(__dirname, "../../data/eClass10_0_1_KWSY_en.csv");
const options = {
  delimiter: ";",
  headers: false
};

connectToMongo("autoMDM");
parseCSV(filePath, options)
  .then(data => {
    console.log(data.length);
    const lengthOfArray = data.length;
    let irdiCCTested = [];
    console.time("Loop start");
    for (let i = 1; i < lengthOfArray; i++) {
      let keywords = [];
      if (irdiCCTested.indexOf(data[i][9]) >= 0) {
        continue;
      }
      for (let j = 1; j < lengthOfArray; j++) {
        if (data[i][9] === data[j][9]) {
          keywords.push(data[j][4]);
          irdiCCTested.push(data[j][9]);
        }
      }
      const update = { keywords };
      const options = { upsert: true };
      const irdi = data[i][9];
      // console.log(keywords, irdi);
      EClassCode.findOneAndUpdate({ irdiCC: irdi }, update, options)
        .then(doc => {
          console.log(doc);
          mongoose.disconnect();
        })
        .catch(err => console.log(err));
      // 0 SupplierKW/SupplierSY;
      // 1 Identifier;

      // 2 VersionNumber;
      // 3 IdCC/IdPR;
      // 4 KeywordValue/SynonymValue;
      // 5 Explanation;
      // 6 ISOLanguageCode;
      // 7 ISOCountryCode;
      // 8 TypeOfTargetSE;
      // 9 IrdiTarget;
      // 10 IrdiKW/IrdiSY;
      // 11 TypeOfSE
    }
    console.timeEnd("Loop start");
  })
  .catch(err => console.log(err));
