const path = require("path");
const mongoose = require("mongoose");
const EClassCode = require("../../models/eclass");
const parseCSV = require("./helpers/parseCSV");
const { connectToMongo, disconnectFromMongo } = require("./helpers/mongodb");

const filePath = path.join(__dirname, "../../data/eClass10_0_1_CC_en.csv");
const options = {
  delimiter: ";",
  headers: false
};

connectToMongo("autoMDM");
parseCSV(filePath, options)
  .then(data => {
    console.log(data.length);
    const codedName = data.map((item, i) => data[i][6]);
    const lengthOfArray = data.length;
    const total = [];
    for (let i = 1; i < data.length; i++) {
      const newEclass = new EClassCode();
      newEclass.eclassSegment = codedName[i].slice(0, 2);
      newEclass.eclassMainGroup = codedName[i].slice(2, 4);
      newEclass.eclassGroup = codedName[i].slice(4, 6);
      newEclass.eclassCommodityClass = codedName[i].slice(6, 8);
      newEclass.supplier = data[i][0]; // 0 Supplier;
      newEclass.idCC = data[i][1]; // 1 IdCC;
      newEclass.identifier = data[i][2]; // 2 Identifier;
      newEclass.versionNumber = data[i][3]; // 3 VersionNumber;
      newEclass.versionDate = data[i][4]; // 4 VersionDate;
      newEclass.revisionNumber = data[i][5]; // 5 RevisionNumber;
      newEclass.codedName = data[i][6]; // 6 CodedName;
      newEclass.preferredName = data[i][7]; // 7 PreferredName;
      newEclass.definition = data[i][8]; // 8 Definition;
      newEclass.ISOLanguageCode = data[i][9]; // 9 ISOLanguageCode;
      newEclass.ISOCountryCode = data[i][10]; // 10 ISOCountryCode;
      newEclass.note = data[i][11]; // 11 Note;
      newEclass.remark = data[i][12]; // 12 Remark;
      newEclass.level = data[i][13]; // 13 Level;
      newEclass.mkSubclass = data[i][14]; // 14 MKSubclass;
      newEclass.mkKeyword = data[i][15]; // 15 MKKeyword;
      newEclass.irdiCC = data[i][16]; // 16 IrdiCC
      newEclass
        .save()
        .then(() => {
          mongoose.disconnect();
        })
        .catch(err => {
          console.log("There was an error", err);
        });
    }
  })
  .catch(err => console.log(err));
