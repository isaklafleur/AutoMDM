const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const EOTD = require("../../models/EOTD");
const nlp = require("compromise");

var word1 = nlp("cylinders, hydraulic");

/* word1
  .nouns()
  .toSingular()
  .debug(); */

var word2 = nlp(
  "Radial shaft seals, also known as lip seals, are used to seal rotary elements, such as a shaft or rotating bore. Common examples include strut seals, hydraulic pump seals, axle seals, power steering seals, and valve stem seals. Early radial shaft seals utilized rawhide as the sealing element, and many elastomeric seal companies today once were tanneries. The advent of modern elastomers replaced rawhide, industry also added a garter spring which helps the sealing lip compensate for lip wear and elastomer material changes. The seal construction will consist of a sprung main sealing lip which has a point contact with the shaft. The point contact is formed by two angles, with the air side angle usually less than the oil side angle. Depending on the seal type these two angles are varied to create a pressure distribution at the seal contact point which has a steeper slope on the oil side of the seal. The shallower the slope on the oil side of the seal the wetter the seal will run. The spring is positioned such that axially the centerline of the spring is biased to the air side of the lip contact point. In order to exclude contaminants numerous types of dust lips or exclusionary lips may be used. Common elastomers include FKM, ACM, NBR, HNBR, and AEM. In order to resist wear, the compounds' durometer (hardness) is typically 70 to 85 Shore A (between that of an automobile tire and a soft inline-skate wheel). A different seal design for similar applications is a rotating face seal."
);

// console.log(word2.out("array"));
// console.log(word2.ngrams().data());
console.log(word2.ngrams().data());

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
  })
  .catch(err => {
    if (err) throw err;
  });

// Find all definitions with double spaces, tabs, newlines, trailing/leading spaces, etc
const query = {
  $and: [{ definition: /\s\s+/g }, { idLanguage: "0161-1#LG-000001#1" }]
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
