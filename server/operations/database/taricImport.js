const path = require("path");
const TaricCode = require("../../models/taric");
const parseCSV = require("./helpers/parseCSV");
const { connectToMongo, disconnectFromMongo } = require("./helpers/mongodb");

const filePath = path.join(__dirname, "../../data/TARIC_Nomenclature_EN.csv");
const options = {
  delimiter: ";",
  headers: false
};

connectToMongo("autoMDM");
parseCSV(filePath, options)
  .then(data => {
    const taricCode = data.map((item, i) => data[i][0]);
    const lengthOfArray = data.length;
    for (let i = 1; i < lengthOfArray; i++) {
      const newTaric = new TaricCode();
      newTaric.hsChapter = taricCode[i].slice(0, 2);
      newTaric.hsHeading = taricCode[i].slice(2, 4);
      newTaric.hsSubheading = taricCode[i].slice(4, 6);
      newTaric.cnSubheading = taricCode[i].slice(6, 8);
      newTaric.taricCode = taricCode[i].slice(8, 10);
      newTaric.taricCodeComplete = data[i][0];
      newTaric.dateStart = data[i][1];
      newTaric.dateEnd = data[i][2];
      newTaric.languageCode = data[i][3];
      newTaric.hierPos = data[i][4];
      newTaric.substring = data[i][5];
      newTaric.description = data[i][6].replace(/\s\s+/g, " ").trim();
      newTaric
        .save()
        .then(doc => console.log(doc))
        .catch(err => {
          console.log("There was an error", err);
        });
    }
  })
  .catch(err => console.log(err));
