const fs = require("fs");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const ACpart = require("../../models/acparts");
require("dotenv").config({ path: "../../.env" });

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

const lineReader = require("readline").createInterface({
  input: fs.createReadStream("./../../data/parts.csv")
});

lineReader.on("line", line => {
  const l = line.split(";");
  const r = {};

  r.facility = l[0];
  r.partNumber = l[1];
  r.partName = l[2];
  r.partDescription = l[3];
  r.netWeight = l[4];
  r.customsTariff = l[5];
  const acparts = new ACpart(r);

  acparts
    .save()
    .then(() => {
      mongoose.disconnect();
    })
    .catch(err => {
      console.log("There was an error", err);
    });
});
