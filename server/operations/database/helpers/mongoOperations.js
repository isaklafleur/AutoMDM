const mongoose = require("mongoose");
const path = require("path");
mongoose.Promise = require("bluebird");

function connectToMongo(databaseName) {
  mongoose
    .connect(`mongodb://localhost:27017/${databaseName}`, {
      keepAlive: true,
      reconnectTries: Number.MAX_VALUE,
      useMongoClient: true
    })
    .then(() => console.log(`You are connected to ${databaseName}`))
    .catch(err => console.log(err));
}

function bulkImportToMongo(arrayToImport, mongooseModel) {
  console.log("arrayToImport: ", arrayToImport);
  const Model = require(`../../../models/${mongooseModel}`);
  let batchCount = Math.ceil(arrayToImport.length / 1000);
  let batches = new Array(batchCount);

  let ops = batches.map((_, index) => {
    let batch = arrayToImport.slice(index, index + 100);
    return Model.insertMany(batch);
  });

  return Promise.all(ops).then(results => {
    console.log("results: ", results);
  });
}

module.exports.bulkImportToMongo = bulkImportToMongo;
module.exports.connectToMongo = connectToMongo;
