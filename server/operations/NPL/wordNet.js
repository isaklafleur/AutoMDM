const WordNet = require("node-wordnet");
const wordnet = new WordNet();
/* 
wordnet.lookup("cylinder", function(results) {
  results.forEach(function(result) {
    console.log("------------------------------------");
    console.log(result.synsetOffset);
    console.log(result.pos);
    console.log(result.lemma);
    console.log(result.synonyms);
    console.log(result.gloss);
  });
});
 */

var natural = require("natural");
const npl = require("compromise");
const tokenizer = new natural.WordTokenizer();
// console.log(tokenizer.tokenize("          hydraulic    cylinder   ")); // ["hydraulic", "cylinder"]
// console.log(tokenizer.tokenize("cylinder,hydraulic")); // ["cylinder", "hydraulic"] (removes the comma automatic)

const string = "cylinders, hydraulic";
const doc = npl(string); // ["cylinder cylinders"] <-- should be ["cylinder", "cylinders"] // console.log(doc.adjectives().out("array")); // ["hydraulic"] // console.log(doc.data()); //////////////////////////////////////////////
/* console.log(
  doc
    // .trim()
    .nouns()
    .toSingular()
    .out("array")
); */

const dictionary = [];

const filterPattern = /^[a-z0-9]+$/i; // only allow alpha characters
const filterPattern2 = /\d/g;
const filterPattern3 = /\s\s+/g;
// console.log("after filter", string.replace(filterPattern3, " "));

// console.log(doc.terms(2).data());

function partOfSpeech(document) {
  const string = doc.terms().out();
  console.log(string);
}

partOfSpeech(doc);
