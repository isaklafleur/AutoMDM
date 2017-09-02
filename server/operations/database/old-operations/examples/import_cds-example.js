var mongoose = require("mongoose");
var fs = require("fs");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/cd_catalog");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  // we're connected!

  // create db schema
  var CdSchema = new mongoose.Schema({
    TITLE: "string",
    ARTIST: "string",
    COUNTRY: "string",
    COMPANY: "string",
    PRICE: "string",
    YEAR: "string"
  });

  // Create model
  var Cd = mongoose.model("Cd", CdSchema);

  // Remove all old records from the collections
  Cd.remove({}, function() {
    console.log("Removed all previous records in Collection");
  });

  // Read file and store data into db
  fs.readFile(__dirname + "/../json-files/cd_catalog.json", "utf8", function(
    err,
    data
  ) {
    if (err) {
      throw err;
    }
    data = JSON.parse(data);
    for (var i = 0; i < data.CATALOG.CD.length; i++) {
      var newCD = new Cd();
      newCD.TITLE = data.CATALOG.CD[i].TITLE;
      newCD.ARTIST = data.CATALOG.CD[i].ARTIST;
      newCD.COUNTRY = data.CATALOG.CD[i].COUNTRY;
      newCD.PRICE = data.CATALOG.CD[i].PRICE;
      newCD.YEAR = data.CATALOG.CD[i].YEAR;
      newCD.save(function(err) {});
    }
    console.log("Data saved to db");
  });
});
