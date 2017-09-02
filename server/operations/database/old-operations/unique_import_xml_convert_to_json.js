var fs = require("fs"),
  xml2js = require("xml2js");

var parser = new xml2js.Parser();

// Read XML file and convert it to
fs.readFile(__dirname + "/xml-files/eClass9_1_ADVANCED_EN_SG_13.xml", function(
  err,
  data
) {
  parser.parseString(data, function(err, result) {
    // Write converted Json data into a new file
    fs.writeFile(
      __dirname + "/json-files/eClass9_1_ADVANCED_EN_SG_13.json",
      JSON.stringify(result, null, 4)
    );
    console.log("Done");
  });
});
