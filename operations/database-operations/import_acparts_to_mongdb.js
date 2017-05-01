// http://wiki.eclass.eu/wiki/csv_file_description

const mongoose = require('mongoose'),
  parse = require('csv-parse'),
  generate = require('csv-generator'),
  path = require('path'),
  fs = require('fs'),
  ACpart = require('./models/acparts');

//mongoose.Promise = require('bluebird');

//mongoose.connect('mongodb://localhost/automdm_test');

//const db = mongoose.connection;

//db.on('error', console.error.bind(console, 'connection error:'));

//db.once('open', () => {
    // we're connected!

  const p = path.join(__dirname, '/../', 'file-operations', 'csv-files');
    // console.log(p);

  const parser = parse({ delimiter: ';' }, (err, data) => {
    // console.log(data);
//    const facility = data.map((item, i) => data[i][0]);
//    const itemNumber = data.map((item, i) => data[i][1]);
    // const partName = data.map((item, i) => data[i][2]);
    // const partDescription = data.map((item, i) => data[i][3]);
    const netWeight = data.map((item, i) => data[i][4]);
    //console.log(netWeight);
    // const customsStatistical = data.map((item, i) => data[i][5]);

       // Looping and storing the data into mongodb
    for (let i = 1; i < 10; i++) {
      netWeight[i] = netWeight[i].replace(/,/g, '.');
      console.log(netWeight[i]);
    }
  });
  fs.createReadStream(`${p}/testfil.csv`).pipe(parser);
// });

