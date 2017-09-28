const parse = require("csv-parse");
const path = require("path");
const fs = require("fs");
const CompanyPart = require("../../models/parts");

const { connectToMongo, disconnectFromMongo } = require("./helpers/mongodb");

connectToMongo("autoMDM");

// Find all terms with double spaces, tabs, newlines, trailing/leading spaces, etc
const field = "partNumber";
const regex = /^ +/gm; // /\s\s+/g;
const query = {};
query[field] = regex;
const projection = {};
projection[field] = 1;
const limit = 1000;
const sort = {};
sort[field] = 1;
let updatedTerms = [];

CompanyPart.find(query, projection)
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
    let bulk = CompanyPart.collection.initializeOrderedBulkOp();
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
          bulk = CompanyPart.collection.initializeOrderedBulkOp();
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
