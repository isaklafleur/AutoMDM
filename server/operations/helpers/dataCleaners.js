function findAndReplaceAbbreviations(arrayofParts, arrayofAbbreviations) {
  const newArrayOfParts = arrayofParts.map(item => {
    let newString = item.partName;
    let tempObj = {};
    arrayofAbbreviations.forEach(x => {
      const regex = new RegExp(`\\b${x.abbreviation}\\.?(?!\\w)`);
      if (regex.test(item.partName)) {
        newString = newString.replace(x.abbreviation, x.expansion);
      }
    });
    /* if (newString !== item.partName) {
      console.log("Old | New: ", `${item.partName} | ${newString}`);
    } */
    tempObj._id = item._id;
    tempObj.partNumber = item.partNumber;
    tempObj.partName = item.partName; // update all records with new string.
    tempObj.partNameCleaned = newString;
    return tempObj;
  });
  return newArrayOfParts;
}

function replaceNonAlphaChars(arrayofParts) {
  const newArrayOfParts = arrayofParts.map(item => {
    const regexShortWords = /\b\w{1,2}\b/g; // find words that are less then three characters long. Issue with O-RING! As O is less then 3.
    const regexNonEnglishLetters = /[^A-Z,]+/gi; // find all non English alphabetic characters.
    const regexSpaces = /\s\s+/g; // find multiple whitespace, tabs, newlines, etc.
    const regexRemoveSpaceComma = /\s*,\s*/g; // Remove Space before and after comma
    const regexRemoveAnyNonAlphaCharAfterLastAlphaChar = /[^A-Z]+$/;
    let tempObj = {};
    let newString = item.partNameCleaned
      .replace(regexNonEnglishLetters, " ")
      .replace(regexShortWords, "")
      .replace(regexSpaces, " ")
      .replace(regexRemoveSpaceComma, ",")
      .replace(regexRemoveAnyNonAlphaCharAfterLastAlphaChar, "");
    /* if (newString !== item.partNameCleaned) {
      console.log("Old | New: ", `${item.partName} | ${newString}`);
    } */
    tempObj._id = item._id;
    tempObj.partNumber = item.partNumber;
    tempObj.partName = item.partName; // update all records with new string.
    tempObj.partNameCleaned = newString;
    return tempObj;
  });
  return newArrayOfParts;
}

function organizeString(objectofParts) {
  const organizeString = objectofParts.map(item => {
    const regexComma = /\b,/; // String follows the Noun,Adjective form
    const regexOneWord = /^[A-Z]+$/i; // String has only one word
    const regexTwoWordsOrMore = /^\s*[A-Z.]+(?:\s+[A-Z.]+)*\s*$/i;
    let tempObj = {};
    tempObj._id = item._id;
    tempObj.partNumber = item.partNumber;
    tempObj.partName = item.partName; // update all records with new string.
    if (regexComma.test(item.partNameCleaned)) {
      tempObj.partNameCleaned = item.partNameCleaned;
    } else if (regexOneWord.test(item.partNameCleaned)) {
      tempObj.partNameCleaned = item.partNameCleaned;
    } else if (regexTwoWordsOrMore.test(item.partNameCleaned)) {
      const noun = item.partNameCleaned.match(/\b(\w+)$/g); // \b(\w+)$ find last word in the string (the noun in this case).
      const textBeforeDelimiter = item.partNameCleaned.replace(noun, "").trim();
      tempObj.partNameCleaned = `${noun},${textBeforeDelimiter}`;
    }
    return tempObj;
  });
  return organizeString;
}

module.exports.findAndReplaceAbbreviations = findAndReplaceAbbreviations;
module.exports.replaceNonAlphaChars = replaceNonAlphaChars;
module.exports.organizeString = organizeString;
