const Promise = require("bluebird");
const {
  connectToMongo,
  disconnectFromMongo,
  getDataFromDB,
} = require("../helpers/mongodb");
const { writeDataToFile, convertToCSV } = require("../helpers/csv");
const CompanyPart = require("../../models/parts");
const CompanyAbbreviation = require("../../models/companyAbbreviations");

let strings = [];
let abbreviations = [];

connectToMongo("autoMDM");
console.time("getData");
Promise.all([
  getDataFromDB(CompanyPart, {}, { _id: 0, partName: 1 }),
  getDataFromDB(
    CompanyAbbreviation,
    {},
    { _id: 0, abbreviation: 1, expansion: 1 },
  ),
])
  .then(results => {
    // console.log("data from mongo: ", results);
    console.timeEnd("getData");
    console.time("convert data");
    strings = results[0].map(item => item.partName.trim().toUpperCase());
    abbreviations = results[1].map(item => ({
      abbreviation: item.abbreviation.trim().toUpperCase(),
      expansion: item.expansion.trim().toUpperCase(),
    }));
    return [strings, abbreviations];
  })
  .then(() => {
    console.timeEnd("convert data");
    // console.log(results);
    console.time("process data");
    return [
      stringOrganizer(strings, abbreviations)[0],
      stringOrganizer(strings, abbreviations)[1],
    ];
    // Array of cleaned & organized strings | Array of Nouns
  })
  .then(results => {
    // console.log("processed data: ", results);
    console.timeEnd("process data");
    console.log("processed data: ", results);

    function convertArray(array) {
      const arrayofObjs = [];
      for (const prop in array) {
        if (array.hasOwnProperty(prop)) {
          arrayofObjs.push({ Name: prop, Count: array[prop] });
        }
      }
      return arrayofObjs;
    }
    return [convertArray(results[0]), convertArray(results[1])];
  })
  .then(dataConverted => {
    // create csv file for cleaned and organized strings
    convertToCSV(dataConverted[0])
      .then(dataInCSVFormat => {
        writeDataToFile("testing.csv", dataInCSVFormat);
      })
      .then(fileCreated => console.log(/* fileCreated */));
  })
  .then(() => disconnectFromMongo())
  .catch(error => console.log(error));

function replaceAbbreviations(string, abbreviationsArray) {
  let cleanedString = string.replace(/[^a-zA-Z;,.]+/g, " ");
  abbreviationsArray.forEach(item => {
    const re = new RegExp(`(${item.abbreviation.replace(/\./, "")}\\b)`, "g");
    if (cleanedString.match(re)) {
      cleanedString = cleanedString.replace(item.abbreviation, item.expansion);
    }
  });
  return cleanedString;
}

function regexString(string, abbreviationsArray) {
  const filterPattern1 = /[^a-zA-Z;,.]+/g; // find all non English alphabetic characters.
  const filterPattern2 = /\b\w{1,2}\b/g; // find words that are less then three characters long. Issue with O-RING! As O is less then 3.
  const filterPattern4 = /\s\s+/g; // find multiple whitespace, tabs, newlines, etc.
  const filterPattern3 = /(,|\.)\s*$/;
  const filteredString = replaceAbbreviations(string, abbreviationsArray)
    .replace(filterPattern1, " ")
    /*     .replace(filterPattern2, match => {
      const abbr = abbreviationsArray.find(x => x.abbreviation === match);
      return abbr ? abbr.expansion : "";
    }) */
    .replace(filterPattern2, "")
    .replace(filterPattern3, "")
    .replace(filterPattern4, " ")
    .trim();
  return filteredString;
}

function stringOrganizer(stringArray) {
  const newStringArray = [];
  const nounsArray = [];

  function uniqueCount(arrayofObjects) {
    const uniqueCountObject = {};
    arrayofObjects.forEach(x => {
      uniqueCountObject[x.noun] = (uniqueCountObject[x.noun] || 0) + 1;
    });
    return uniqueCountObject;
  }

  function addNounToArray(newString, originalString) {
    if (newString === originalString) {
      nounsArray.push({ noun: originalString, originalString });
    } else {
      const i = newString.indexOf(","); // do only have options with "," RING-SNAP has not been converted to RING,SNAP but to RING SNAP
      const firstTerm = newString.substring(0, i);
      nounsArray.push({ noun: firstTerm, originalString });
    }
  }

  function delimiterFixer(delimiter, string) {
    const cleanedString = regexString(string, abbreviations);
    const textAfterDelimiter = cleanedString
      .substring(cleanedString.indexOf(delimiter) + 1)
      .trim();
    const textBeforeDelimiter = cleanedString
      .replace(textAfterDelimiter, "")
      .replace(delimiter, "")
      .trim();
    const newString = textAfterDelimiter.length
      ? `${textBeforeDelimiter}, ${textAfterDelimiter
          .replace(/(,|\.)\s*$/, "")
          .trim()}`
      : textBeforeDelimiter.replace(/,\s*$/, "");
    newStringArray.push(newString);
    addNounToArray(newString, string);
  }

  stringArray.forEach(string => {
    const cleanedString = regexString(string, abbreviations);
    if (cleanedString.indexOf(",") >= 0) {
      // exist a comma in the string
      delimiterFixer(",", string);
    } else if (cleanedString.indexOf(";") >= 0) {
      // exist a semicolon in the string
      delimiterFixer(";", string);
    } else if (cleanedString.indexOf(".") >= 0) {
      delimiterFixer(".", string);
    } else if (string.indexOf(" ") >= 0) {
      // exist only space(s) in the string;
      if (cleanedString.length > 0) {
        const noun = cleanedString.match(/\b(\w+)$/g); // \b(\w+)$ find last word in the string (the noun in this case).
        const textBeforeDelimiter = cleanedString.replace(noun, "").trim();
        if (noun != null) {
          const newString = noun.length
            ? `${noun}, ${textBeforeDelimiter}`.replace(/,\s*$/, "")
            : noun.replace(/,\s*$/, "");
          newStringArray.push(newString);
          addNounToArray(newString, string);
        } else {
          console.log("Noun is null for this string: ", string);
        }
      } else if (cleanedString.length === 0) {
        newStringArray.push("cleanedString has 0 chars.");
      }
    } else {
      newStringArray.push(cleanedString.replace(/,\s*$/, "")); // investigate here as well!
      addNounToArray(cleanedString, string);
    }
  });

  return [uniqueCount(newStringArray), uniqueCount(nounsArray)];
}
