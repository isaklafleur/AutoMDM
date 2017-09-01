const fuzz = require("fuzzball");
const Eclass = require("../../models/eclass");
const Unspsc = require("../../models/unspsc");
const EuMatch = require("../../models/eu-match");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// console.log(fuzz.token_sort_ratio("Axial shaft pack. ring", "Axial piston motor"));

Eclass.find({ codedName: /^2307/ }, (err, allEclass) => {
  Unspsc.find(
    { $or: [{ family: /^3141/ }, { family: /^3140/ }] },
    (err, allUnspsc) => {
      console.log("start");
      allEclass.forEach(eclass => {
        let matches = [];
        console.log("matching...");
        allUnspsc.forEach(unspsc => {
          matches.push({ unspsc, match: getMatch(eclass, unspsc) });
        });
        console.log("sorting...");
        matches.sort((a, b) => b.match.ratio - a.match.ratio);
        matches = matches.slice(0, 5);
        console.log("saving...");
        const record = new EuMatch();
        record.eclassName = eclass.preferredName;
        record.eclassCode = eclass.codedName;
        record.eclassId = eclass._id;
        record.matches = matches;
        // if(matches[0].match.ratio > 80) {
        record.save((err, record) => {
          if (err) console.log(err);
          console.log(`Match saved on ${record.eclassCode}`);
        });
        // }
      });
    }
  );
});

function getMatch(eclass, unspsc) {
  const ret = {};
  // ret.ratio =  Math.max(fuzz.token_sort_ratio(eclass.preferredName, unspsc.commodityTitle),
  //                     fuzz.token_sort_ratio(eclass.preferredName, unspsc.classTitle));
  // console.log('ret.ratio: ', ret.ratio);
  ret.ratio = fuzz.token_set_ratio(eclass.preferredName, unspsc.commodityTitle);

  return ret;
}
