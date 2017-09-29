const WordNet = require("node-wordnet");
const natural = require("natural");
const npl = require("compromise");

const wordnet = new WordNet();
const tokenizer = new natural.WordTokenizer();

wordnet.lookup("bearing", function(results) {
  results.forEach(function(result) {
    console.log("------------------------------------");
    console.log("Id: ", result.synsetOffset);
    console.log("Part of Speech: ", result.pos);
    // n: noun, a: adjective, s: adjective (satellite), v: verb, r: adverb
    // adjective satellite is something Wordnet came up with - it refers to adjectives
    // that always occur in instances relating to some other object - the canonical example
    // is "atomic bomb"
    console.log("Lemma: ", result.lemma);
    console.log("Synonyms: ", result.synonyms);
    console.log("Description: ", result.gloss);
  });
});

const uniqueCountSortedNouns = uniqueCountSorted(uniqueCount(nounsArray));
const uniqueCountnewSortedStrings = uniqueCountSorted(
  uniqueCount(newStringArray),
);
const test = uniqueCount(nounsArray);
console.log(test);
return [uniqueCount(newStringArray), uniqueCount(nounsArray)];
