const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../../data/wordnet.json");

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) throw err;
  console.log(JSON.parse(data).synset.a1000283);
});
