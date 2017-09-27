const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

function connectToMongo(databaseName) {
  mongoose.connect(`mongodb://localhost:27017/${databaseName}`, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
  });
}

function disconnectFromMongo() {
  console.log("Disconnected from MongoDB");
  mongoose.disconnect();
}

function bulkImportToMongo(arrayToImport, mongooseModel) {
  const Model = require(`../../../models/${mongooseModel}`);
  const batchSize = 100;
  let batchCount = Math.ceil(arrayToImport.length / batchSize);
  let recordsLeft = arrayToImport.length;
  let ops = [];
  let counter = 0;
  for (let i = 0; i < batchCount; i++) {
    let batch = arrayToImport.slice(counter, counter + batchSize);
    counter += batchSize;
    ops.push(Model.insertMany(batch));
  }
  return Promise.all(ops);
}

module.exports.bulkImportToMongo = bulkImportToMongo;
module.exports.connectToMongo = connectToMongo;
module.exports.disconnectFromMongo = disconnectFromMongo;
