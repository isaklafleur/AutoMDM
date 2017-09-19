const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const EOTD = require("../../models/EOTD");

mongoose.connect("mongodb://localhost:27017/autoMDM", {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// Find all terms with double spaces, tabs, newlines, trailing/leading spaces, etc
const query = {
  $and: [{ term: /\s\s+/g }, { idLanguage: "0161-1#LG-000001#1" }]
};
const projection = { term: 1 };
const limit = 100000;
const sort = { term: 1 };
let updatedTerms = [];
EOTD.find(query, projection)
  //.sort(sort)
  .limit(limit)
  .then(res => {
    console.log("antes", res);
    res.forEach(term => {
      let newTermObj = {};
      newTermObj.term = term.term.replace(/\s\s+/g, " ").trim();
      newTermObj._id = term._id;
      updatedTerms.push(newTermObj);
    });
    console.log("updatedTerms: ", updatedTerms);

    //Bulk update
    let bulk = EOTD.collection.initializeOrderedBulkOp();
    let counter = 1;

    updatedTerms.forEach(item => {
      bulk.find({ _id: item._id }).updateOne({
        $set: { term: item.term }
      });

      counter++;
      if (counter % 5000 == 0) {
        bulk.execute((err, r) => {
          // do something with the result
          console.log("r: ", r);
          bulk = EOTD.collection.initializeOrderedBulkOp();
          counter = 1;
        });
      }
    });

    // Catch any docs in the queue under or over the 500's
    if (counter > 0) {
      bulk.execute(function(err, result) {
        console.log("result: ", result);
        // do something with the result here
      });
    }
  })
  .catch(err => {
    if (err) throw err;
  });

// Find all definitions with double spaces, tabs, newlines, trailing/leading spaces, etc
const query = {
  $and: [{ definition: /\s\s+/g } /* , { idLanguage: "0161-1#LG-000001#1" } */]
};
const projection = { definition: 1 };
const limit = 10;
const sort = { term: 1 };
let updatedTerms = [];
EOTD.find(query, projection)
  //.sort(sort)
  //.limit(limit)
  .then(res => {
    console.log("antes", res);
    res.forEach(term => {
      let newTermObj = {};
      newTermObj.definition = term.definition.replace(/\s\s+/g, " ").trim();
      newTermObj._id = term._id;
      updatedTerms.push(newTermObj);
    });
    console.log("updatedTerms: ", updatedTerms);

    //Bulk update
    let bulk = EOTD.collection.initializeOrderedBulkOp();
    let counter = 1;

    updatedTerms.forEach(item => {
      bulk.find({ _id: item._id }).updateOne({
        $set: { definition: item.definition }
      });

      counter++;
      if (counter % 900 == 0) {
        bulk.execute((err, r) => {
          // do something with the result
          // console.log("r: ", r);
          bulk = EOTD.collection.initializeOrderedBulkOp();
          counter = 1;
        });
      }
    });

    // Catch any docs in the queue under or over the 500's
    if (counter > 0) {
      bulk.execute(function(err, result) {
        // console.log("result: ", result);
        // do something with the result here
      });
    }
  })
  .catch(err => {
    if (err) throw err;
  });
