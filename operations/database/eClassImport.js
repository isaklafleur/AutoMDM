// http://wiki.eclass.eu/wiki/csv_file_description

const mongoose = require('mongoose');
const parse = require('csv-parse');
const path = require('path');
const fs = require('fs');
const EClass = require('../../models/eclass');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/autoMDM');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    // we're connected!

  const p = path.join(__dirname, '/../../', 'data');
  // console.log(p);
  const parserEclass = parse({ delimiter: ';' }, (err, data) => {
    // console.log(data);
    const codedName = data.map((item, i) => data[i][6]);

    // Looping and storing the data into mongodb
    for (let i = 1; i < data.length; i++) {
      const newEclass = new EClass();
      newEclass.eclassSegment = codedName[i].slice(0, 2);
      newEclass.eclassMainGroup = codedName[i].slice(2, 4);
      newEclass.eclassGroup = codedName[i].slice(4, 6);
      newEclass.eclassCommodityClass = codedName[i].slice(6, 8);

      // 0 Supplier;
      newEclass.supplier = data[i][0];
      // 1 IdCC;
      newEclass.idCC = data[i][1];
      // 2 Identifier;
      newEclass.identifier = data[i][2];
      // 3 VersionNumber;
      newEclass.versionNumber = data[i][3];
      // 4 VersionDate;
      newEclass.versionDate = data[i][4];
      // 5 RevisionNumber;
      newEclass.revisionNumber = data[i][5];
      // 6 CodedName;
      newEclass.codedName = data[i][6];
      // 7 PreferredName;
      newEclass.preferredName = data[i][7];
      // 8 Definition;
      newEclass.definition = data[i][8];
      // 9 ISOLanguageCode;
      newEclass.ISOLanguageCode = data[i][9];
      // 10 ISOCountryCode;
      newEclass.ISOCountryCode = data[i][10];
      // 11 Note;
      newEclass.note = data[i][11];
      // 12 Remark;
      newEclass.remark = data[i][12];
      // 13 Level;
      newEclass.level = data[i][13];
      // 14 MKSubclass;
      newEclass.mkSubclass = data[i][14];
      // 15 MKKeyword;
      newEclass.mkKeyword = data[i][15];
      // 16 IrdiCC
      newEclass.irdiCC = data[i][16];

      newEclass.save()
            .then(() => {
              mongoose.disconnect();
            })
            .catch((err) => {
              console.log('There was an error', err);
            });
    }
  });

  fs.createReadStream(`${p}/eClass10_0_1_CC_en.csv`).pipe(parserEclass);
});
