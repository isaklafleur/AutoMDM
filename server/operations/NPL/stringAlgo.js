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
    strings = results[0].map(item => item.partName);
    abbreviations = results[1].map(item => ({
      abbreviation: item.abbreviation,
      expansion: item.expansion,
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
    console.log("processed data: ", results);
    console.timeEnd("process data");
    // console.log(results);

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
      .then(fileCreated => console.log(fileCreated));
  })
  .then(() => disconnectFromMongo())
  .catch(error => console.log(error));

function stringSplit(stringToSplit) {
  // check if the delimiter is a comma (the string most likely starts with a NOUN)
  if (stringToSplit.indexOf(",") >= 0) {
    return stringToSplit.replace(",", " ").toUpperCase();
    // check if the delimiter is a semicolon (the string most likely starts with a NOUN)
  } else if (stringToSplit.indexOf(";") >= 0) {
    return stringToSplit.replace(";", " ").toUpperCase();
  }
  // The string most likely ends with a NOUN
  return stringToSplit.toUpperCase();
}

function findAbbreviations(string, abbreviationsArray) {
  const stringArray = stringSplit(string);

  const abbreviationMatches = [];
  abbreviationsArray.forEach(item => {
    if (stringArray.indexOf(item.abbreviation) >= 0) {
      abbreviationMatches.push({
        abbreviation: item.abbreviation.toUpperCase(),
        expansion: item.expansion.toUpperCase(),
      });
    }
  });
  return abbreviationMatches;
}

function replaceAbbreviations(string, abbreviationsArray) {
  if (findAbbreviations.length > 0) {
    const abbreviationMatches = findAbbreviations(string, abbreviationsArray);
    let newString = string.toUpperCase();
    abbreviationMatches.forEach(item => {
      const abb =
        item.abbreviation[item.abbreviation.length - 1] === "."
          ? item.abbreviation.replace(/.$/, "\\.")
          : item.abbreviation;
      const re = new RegExp(abb);
      newString = newString.replace(re, item.expansion);
    });
    return newString;
  }
  return string;
}

function regexString(string, abbreviationsArray) {
  const filterPattern1 = /[^a-zA-Z;,.]+/g; // find all non English alphabetic characters.
  const filterPattern2 = /\b\w{1,2}\b/g; // find words that are less then three characters long.
  const filterPattern4 = /\s\s+/g; // find multiple whitespace, tabs, newlines, etc.
  const filterPattern3 = /(,|\.)\s*$/;
  const filteredString = replaceAbbreviations(string, abbreviationsArray)
    .toUpperCase()
    .replace(filterPattern1, " ")
    .replace(filterPattern2, match => {
      const abbr = abbreviationsArray.find(x => x.abbreviation === match);
      return abbr ? abbr.expansion : "";
    })
    .replace(filterPattern3, "")
    .replace(filterPattern4, " ")
    .trim();
  return filteredString;
}

function stringOrganizer(stringArray) {
  const newStringArray = [];
  const nounsArray = [];

  function uniqueCount(array) {
    const uniqueCountObject = {};
    array.forEach(x => {
      uniqueCountObject[x] = (uniqueCountObject[x] || 0) + 1;
    });
    return uniqueCountObject;
  }

  function addNounToArray(noun) {
    const i = noun.indexOf(",");
    const firstTerm = i === -1 ? noun : noun.substring(0, i);
    nounsArray.push(firstTerm);
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
    addNounToArray(newString);
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
    } else if (string.trim().indexOf(" ") >= 0) {
      // exist only space(s) in the string;
      if (cleanedString.length > 0) {
        const noun = cleanedString.match(/\b(\w+)$/g).join(""); // \b(\w+)$ find last word in the string (the noun in this case).
        const textBeforeDelimiter = cleanedString.replace(noun, "").trim();
        const newString = noun.length
          ? `${noun}, ${textBeforeDelimiter}`.replace(/,\s*$/, "")
          : noun.replace(/,\s*$/, "");
        newStringArray.push(newString);
        addNounToArray(newString);
      } else {
        newStringArray.push("This part has some issues!");
      }
    } else {
      const newString = regexString(string, abbreviations);
      newStringArray.push(newString.replace(/,\s*$/, ""));
      addNounToArray(newString);
    }
  });

  return [uniqueCount(newStringArray), uniqueCount(nounsArray)];
}
