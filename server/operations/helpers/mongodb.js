const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

function connectToMongo(databaseName) {
  mongoose.connect(`mongodb://localhost:27017/${databaseName}`, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true,
  });
  console.log("Connected to db!");
}

function disconnectFromMongo() {
  mongoose.disconnect();
  console.log("Disconnected from db!");
}

function getDataFromDB(model, query, projection) {
  return model.find(query, projection).exec();
}

function bulkUpdateToMongo(arrayToImport, mongooseModel) {
  const Model = require(`../../models/${mongooseModel}`);
  const ops = [];

  arrayToImport.forEach(item => {
    const query = { _id: item._id };
    const update = { partNameCleaned: item.partNameCleaned };
    const callback = (err, result) => {
      if (err) throw err;
      //console.log(result);
    };
    ops.push(Model.update(query, update, callback));
  });
  return Promise.all(ops);
}

function bulkImportToMongo(arrayToImport, mongooseModel) {
  const Model = require(`../../../models/${mongooseModel}`);
  const batchSize = 100;
  const batchCount = Math.ceil(arrayToImport.length / batchSize);
  const ops = [];
  let counter = 0;
  for (let i = 0; i < batchCount; i += 1) {
    const batch = arrayToImport.slice(counter, counter + batchSize);
    counter += batchSize;
    ops.push(Model.insertMany(batch));
  }
  return Promise.all(ops);
}

module.exports.bulkImportToMongo = bulkImportToMongo;
module.exports.bulkUpdateToMongo = bulkUpdateToMongo;
module.exports.getDataFromDB = getDataFromDB;
module.exports.connectToMongo = connectToMongo;
module.exports.disconnectFromMongo = disconnectFromMongo;
