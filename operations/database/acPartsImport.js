const fs = require('fs');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const ACpart = require('../../models/acparts');
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/autoMDM');

const lineReader = require('readline').createInterface({
  input: fs.createReadStream('./../../data/parts.csv'),
});

lineReader.on('line', (line) => {
  const l = line.split(';');
  const r = {};

  r.facility = l[0];
  r.itemNumber = l[1];
  r.partName = l[2];
  r.partDescription = l[3];
  r.netWeight = l[4];
  r.customsTariff = l[5];
  const acparts = new ACpart(r);

  acparts.save((err) => {
    if (err) console.log(err);
  });
});
