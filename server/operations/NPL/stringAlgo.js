const WordNet = require("node-wordnet");
const Promise = require("bluebird");
const { connectToMongo } = require("../database/helpers/mongodb");
var parse = Promise.promisify(require("csv-parse"));
const path = require("path");
var natural = require("natural");
const npl = require("compromise");
const fs = Promise.promisifyAll(require("fs"));
const CompanyPart = require("../../models/parts");

const wordnet = new WordNet();
const tokenizer = new natural.WordTokenizer();

/* wordnet.lookup("bearing", function(results) {
    results.forEach(function(result) {
      console.log("------------------------------------");
      console.log("Id: ", result.synsetOffset);
      console.log("Part of Speech: ", result.pos);
      // n: noun, a: adjective, s: adjective (satellite), v: verb, r: adverb
      // adjective satellite is something Wordnet came up with - it refers to adjectives that always occur in instances relating to some other object - the canonical example is "atomic bomb"
      console.log("Lemma: ", result.lemma);
      console.log("Synonyms: ", result.synonyms);
      console.log("Description: ", result.gloss);
    });
  }); */

connectToMongo("autoMDM");

CompanyPart.find({ facility: "SDC" }, { partName: 1 }, (err, results) => {})
  .then(results => {
    const strings = results.map(item => {
      return item.partName;
    });
    return strings;
  })
  .then(strings => {
    console.log(strings);
    /*     console.log(stringOrganizer(strings, abbreviations)[0]);
    console.log(stringOrganizer(strings, abbreviations)[1]); */
  })
  .catch(error => console.log(error));

var lexicon = {
  bearing: "Noun"
};

// let strings = [];
/*   "ACTUATOR-BRK",
  "FLANG-SPLIT",
  "O-RING",
  "BOLT,M6X25MM HF",
  "BOLT,M6-1.0",
  "SCREW.CAP 444 44.4 ff.",
  "SCREW.CAP 444",
  "SCREW;CAP",
  "BOLT,M6-1.0",
  "screw and washer assembly (sems)",
  "screw",
  "angular contact (rolling) bearing",
  "Thrust bearings",
  "Thrust bear.",
  "Tensioner bearing",
  "screw,cap ff",
  "END bearing, ddfdfdf",
  "Tapped base bearing",
  "Load bearing element 1",
  "end bracket, testing",
  "Hanger bearings",
  "Flanged bearings",
  "screw,cap",
  "Angular contact bearing",
  "double-row (rolling) bearing",
  "screw,cap",
  "end bracket, bearing bracket (US)",
  "external-aligning (rolling) bearing",
  "filling slot (ball) bearing",
  "screw,cap",
  "#2 Heating fuel oil",
  "#4 or #6 Residual heavy fuel oils",
  "Aluminum SAE 6000 series hot rolled coil",
  "Aluminum, Reroll, Capacitor Foil Alloy 1145",
  "Aluminum, Sheet, Coiled Coated, Except Conductor & Decorative For Stamping",
  "700-R NEMA sealed industrial control relay",
  "802R NEMA 13 sealed contact",
  "802XR NEMA 7/9 hazardous location sealed contact",
  "Diaphragm seals",
  "Die cut seal kit",
  "MOTOR          STARTER",
  "V ring seal",
  "lip seal",
  "rotary shaft lip-type seal",
  "rubber-covered rotary shaft lip-type seal",
  "seal, O-ring",
  "seal kit",
  "motor with standardized mounting dimensions",
  "Connector to screw",
  "Earthing lug for cable screw gland",
  "Orthodontic expansion screws",
  "Self drilling tapping screw",
  "screw assembly",
  "BOLT,M6-1.0",
  "BOLT,HEX METRIC M6",
  "BOLT M6X25MM",
  "BOLT,M6X25MM HF",
  "NUT HEX FLG M6 1.0",
  "NUT HEX LOCK M6X1.0.00",
  "NUT,JAM,M6-1",
  "SCREW;CAP",
  "MOUNT,CALIBER,50,M6",
  "COVER",
  "BRACKET",
  "BRACKET",
  "RING-SNAP" */

const synonyms = [
  { master: "radial shaft seal", synonym: "lip seal" },
  { master: "motor", synonym: "engine" }
];

const specialWords = ["o-ring", "v ring", "v-ring"];

const abbreviations = [
  { abbreviation: "ASSY", expansion: "ASSEMBLY" },
  { abbreviation: "ASSY.", expansion: "ASSEMBLY" },
  { abbreviation: "ASY", expansion: "ASSEMBLY" },
  { abbreviation: "ASSY.", expansion: "ASSEMBLY" },
  { abbreviation: "BEAR.", expansion: "BEARING" },
  { abbreviation: "BRK", expansion: "BREAK" },
  { abbreviation: "TERMNL", expansion: "TERMINAL" },
  { abbreviation: "BRG", expansion: "BEARING" },
  { abbreviation: "ATTACH.", expansion: "ATTACHMENT" },
  { abbreviation: "BRKT", expansion: "BRAKET" },
  { abbreviation: "CORDGRIP", expansion: "CORD GRIP" },
  { abbreviation: "COMPL.", expansion: "COMPLETE" },
  { abbreviation: "CAPSCREW", expansion: "CAP SCREW" },
  { abbreviation: "CPLG", expansion: "COUPLING" },
  { abbreviation: "CYL", expansion: "CYLINDER" },
  { abbreviation: "CYL.", expansion: "CYLINDER" },
  { abbreviation: "CYLIND", expansion: "CYLINDER" },
  { abbreviation: "CYLIND.", expansion: "CYLINDER" },
  { abbreviation: "CYLINDE", expansion: "CYLINDER" },
  { abbreviation: "FILT.", expansion: "FILTER" },
  { abbreviation: "FRICT.", expansion: "FRICTION" },
  { abbreviation: "HD", expansion: "HEAD" },
  { abbreviation: "HD.", expansion: "HEAD" },
  { abbreviation: "CART.", expansion: "CARTRIDGE" },
  { abbreviation: "CARTR.", expansion: "CARTRIDGE" },
  { abbreviation: "HYD.", expansion: "HYDRAULIC" },
  { abbreviation: "HYDR.", expansion: "HYDRAULIC" },
  { abbreviation: "REDUC.", expansion: "REDUCER" },
  { abbreviation: "REGUL.", expansion: "REGULATOR" },
  { abbreviation: "FLG", expansion: "FLANGE" }
];

const _stringSplit = stringToSplit => {
  // check if the delimiter is a comma (the string most likely starts with a NOUN)
  if (stringToSplit.indexOf(",") >= 0) {
    return stringToSplit.replace(",", " ").toUpperCase();
    // check if the delimiter is a semicolon (the string most likely starts with a NOUN)
  } else if (stringToSplit.indexOf(";") >= 0) {
    return stringToSplit.replace(";", " ").toUpperCase();
  } else {
    // The string most likely ends with a NOUN
    return stringToSplit.toUpperCase().split(" ");
  }
};

const _findAbbreviations = (string, abbreviationsArray) => {
  const stringArray = _stringSplit(string);

  const abbreviationMatches = [];
  abbreviationsArray.forEach(item => {
    if (stringArray.indexOf(item.abbreviation) >= 0) {
      abbreviationMatches.push({
        abbreviation: item.abbreviation.toUpperCase(),
        expansion: item.expansion.toUpperCase()
      });
    }
  });
  return abbreviationMatches;
};

const _replaceAbbreviations = (string, abbreviationsArray) => {
  if (_findAbbreviations.length > 0) {
    const abbreviationMatches = _findAbbreviations(string, abbreviationsArray);
    let newString = string.toUpperCase();
    abbreviationMatches.forEach(item => {
      item.abbreviation[item.abbreviation.length - 1] === "."
        ? (abb = item.abbreviation.replace(/.$/, "\\."))
        : (abb = item.abbreviation);
      re = new RegExp(abb);
      newString = newString.replace(re, item.expansion);
    });
    return newString;
  } else {
    return string;
  }
};

const _regexString = (string, abbreviationsArray) => {
  const filterPattern1 = /[^a-zA-Z;,.]+/g; // find all non English alphabetic characters.
  const filterPattern2 = /\b\w{1,2}\b/g; // find words that are less then three characters long.
  const filterPattern4 = /\s\s+/g; // find multiple whitespace, tabs, newlines, etc.
  const filterPattern3 = /(,|\.)\s*$/;
  const filteredString = _replaceAbbreviations(string, abbreviationsArray)
    .toUpperCase()
    .replace(filterPattern1, " ")
    .replace(filterPattern2, match => {
      let abbr = abbreviationsArray.find(x => x.abbreviation === match);
      return abbr ? abbr.expansion : "";
    })
    .replace(filterPattern3, "")
    .replace(filterPattern4, " ")
    .trim(); // remove leading and trailing whitespace.
  return filteredString;
};

const stringOrganizer = (stringArray, abbreviationsArray) => {
  const newStringArray = [];
  const nounsArray = [];

  const addNounToArray = noun => {
    const i = noun.indexOf(",");
    const firstTerm = i === -1 ? noun : noun.substring(0, i);

    if (nounsArray.indexOf(firstTerm) === -1) {
      nounsArray.push(firstTerm);
    }
  };

  const _delimiterFixer = (delimiter, string, abbreviationsArray) => {
    // exist a comma in the string
    const cleanedString = _regexString(string, abbreviations);
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
  };
  // const fixedStrings = [];
  stringArray.forEach(string => {
    if (_regexString(string, abbreviations).indexOf(",") >= 0) {
      // exist a comma in the string
      _delimiterFixer(",", string);
    } else if (_regexString(string, abbreviations).indexOf(";") >= 0) {
      // exist a semicolon in the string
      _delimiterFixer(";", string);
    } else if (_regexString(string, abbreviations).indexOf(".") >= 0) {
      _delimiterFixer(".", string);
    } else if (string.trim().indexOf(" ") >= 0) {
      // exist only space(s) in the string;
      const cleanedString = _regexString(string, abbreviations);
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
      const newString = _regexString(string, abbreviations);
      newStringArray.push(newString.replace(/,\s*$/, ""));
      addNounToArray(newString);
    }
  });
  return [newStringArray.sort(), nounsArray.sort()];
};
/* console.time("Hello");
  console.log(regexString(testStringOriginal, abbreviations));
  console.timeEnd("Hello"); */
/* function partOfSpeech(document) {
    let obj = {};
    obj.nouns = document
      .terms()
      .nouns()
      .data();
  
    console.log("nouns", document.nouns().out("array"));
    console.log("values: ", document.values().out("array"));
    console.log("verbs: ", document.verbs().out("array"));
    console.log("adjectives: ", document.adjectives().out("array"));
    console.log(testStringOriginal);
  }
  
  // partOfSpeech(doc) */
