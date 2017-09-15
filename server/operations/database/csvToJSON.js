const async = require("async");
const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");

const headersTerm = ["termID", "conceptID", "term"];
const headersDefinition = ["definitionID", "conceptID", "definition"];

let array = [];

const csvFilePath = path.join(
  __dirname,
  "../../",
  "data/eOTD/",
  "definition.csv"
);

const csvFolderPath = path.join(
  __dirname,
  "../../",
  "data/eOTD/",
  "term-files",
  "csv"
);

const jsonFolderPath = path.join(
  __dirname,
  "../../",
  "data/eOTD/",
  "term-files",
  "json"
);
/* 
let files = [];

fs.readdir(csvFolderPath, (err, files) => {
  files = files;
});
setTimeout(() => {
  console.log(files);
  async.map
}, 500);
 */
/* 
  files.forEach(file => {
    csv({ noheader: true, headers: ["termID", "conceptID", "term"] })
      .fromFile(csvFolderPath + "/" + file)
      .on("json", jsonObj => {
        array.push(jsonObj);
      })
      .on("done", error => {
        fs.writeFile(
          jsonFolderPath + "/" + file,
          JSON.stringify(array),
          err => {
            array = [];
            if (err) throw err;
            console.log("JSON file has been saved!");
          }
        );
      });
  });
 */
// console.log(fs.createReadStream(csvFolderPath + "/" + "xaa"));
// fs.stat(csvFolderPath + "/" + "xab", (err, result) => console.log(result));

function generateJSONFile(csvFilePath, headers) {
  csv({ noheader: true, headers: headers })
    .fromFile(csvFilePath)
    .on("json", jsonObj => {
      array.push(jsonObj);
    })
    .on("done", error => {
      console.log("parsed");
      fs.writeFile("definition.json", JSON.stringify(array), err => {
        if (err) throw err;
        console.log("JSON file has been saved!");
      });
    });
}

generateJSONFile(csvFilePath, headersDefinition);
