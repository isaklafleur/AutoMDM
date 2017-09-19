// http://wiki.eclass.eu/wiki/csv_file_description
const mongoose = require("mongoose");
const parse = require("csv-parse");
const path = require("path");
const fs = require("fs");
const TARIC = require("../../models/taric");

mongoose.Promise = require("bluebird");

mongoose.connect("mongodb://localhost:27017/autoMDM", {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// Find all terms with double spaces, tabs, newlines, trailing/leading spaces, etc
const field = "description";
const regex = /\s\s+/g; // /\t/g;
const query = {};
query[field] = regex;
const projection = {};
projection[field] = 1;
const limit = 10;
const sort = {};
sort[field] = 1;
let updatedTerms = [];

TARIC.find(query, projection)
  //.sort(sort)
  //.limit(limit)
  .then(res => {
    console.log("antes", res);
    res.forEach(item => {
      const newTermObj = {};
      newTermObj[field] = item[field].replace(regex, " ").trim();
      newTermObj._id = item._id;
      updatedTerms.push(newTermObj);
    });
    console.log("updatedTerms: ", updatedTerms);

    //Bulk update
    let bulk = TARIC.collection.initializeOrderedBulkOp();
    let counter = 1;

    updatedTerms.forEach(item => {
      const setObj = {};
      setObj[field] = item[field];
      console.log(setObj);
      bulk.find({ _id: item._id }).updateOne({
        $set: setObj
      });

      counter++;
      if (counter % 500 == 0) {
        bulk.execute((err, r) => {
          if (err) throw err;
          // do something with the result
          console.log("r: ", r);
          bulk = EOTD.collection.initializeOrderedBulkOp();
          counter = 1;
        });
      }
    });

    // Catch any docs in the queue under or over the 500's
    if (counter > 0) {
      bulk.execute((err, result) => {
        if (err) throw err;
        console.log("result: ", result);
        // do something with the result here
      });
    }
  })
  .catch(err => {
    if (err) throw err;
  });
