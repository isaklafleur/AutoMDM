function cleanseData(object) {
  const cleanedparts = object.map(item => {
    tempObj = {};
    tempObj._id = item._id;
    tempObj.partName = item.partName
      .trim() // Remove Trailing/Leading Spaces
      .replace(/\s\s+/g, " ") // Remove Multiple Spaces
      .replace(/\s*,\s*/g, ","); // Remove Space before and after comma
    tempObj.partNumber = item.partNumber;
    return tempObj;
  });

  return cleanedparts;
}
/* 
regexObj = {};
regexObj.regexNounAdjectiveForm = /\b,/; // NOUN,ADJECTIVE Form
regexObj.regexStartWithNonAlphaChar = /^[^A-Z]/i; // String start with a digit.
regexObj.regexOneWord = /^[A-Z.]+$/i; // ONLY ONE WORD in String. Strings like V-BELT AND O-RING need to be handled seperated...
regexObj.regexTwoWords = /^[A-Z.]+\s+[A-Z.]+$/i; // TWO WORDS in String.
regexObj.regexThreeWords = /^[A-Z.]+\s+[A-Z.]+\s+[A-Z.]+$/i; // THREE WORDS in String.
regexObj.regexFourWords = /^[A-Z.]+\s+[A-Z.]+\s+[A-Z.]+\s+[A-Z.]+$/i; // FOUR WORDS in String.
regexObj.regexTwoWords or More /^\s*[A-Z]+(?:\s+[A-Z]+)*\s*$/i
 */
function filterParts(object, regex) {
  const filterParts = [];
  object.forEach(item => {
    if (
      !regexOneWord.test(item.partName) &&
      !regexNounAdjectiveForm.test(item.partName) &&
      !regexTwoWords.test(item.partName) &&
      !regexThreeWords.test(item.partName) &&
      !regexFourWords.test(item.partName) &&
      !regexStartWithNonAlphaChar.test(item.partName)
    )
      filterParts.push(item.partName);
  });
  return filterParts;
}

module.exports.cleanseData = cleanseData;
module.exports.filterParts = filterParts;
