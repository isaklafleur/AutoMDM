// https://github.com/fluhus/wordnet-to-json
const mongoose = require("mongoose");
const wordnetSchema = new mongoose.Schema(
  {
    synsetID: String, // a1000283
    offset: Number,
    pos: String, // part of speech (a: adjective, n: noun, r: adverb, s: satellite (adjective), v: verb)
    word: [String],
    pointer: [
      {
        symbol: String,
        synset: String,
        source: Number,
        target: Number
      }
    ],
    frame: [
      // Applies only to verbs
      {
        wordNumber: Number,
        frameNumber: Number
      }
    ],
    gloss: String, // description
    example: [
      // example sentence. Applies only to verbs
      {
        wordNumber: Number,
        templateNumber: Number
      }
    ]

    /*     word: String,
    results: [
      {
        definition: String,
        partOfSpeech: String, // wordnet "pos" s: satellite (adjective)
        synonyms: Array, // wordnet "word" array
        typeOf: Array,
        hasTypes: Array,
        derivation: Array,
        examples: Array,
        source: String
      }
    ] */
  },
  { collection: "wordnet" }
);

/* eOTDSchema.index({
  idTerm: 1,
  idDefinition: 1,
  idLanguage: 1,
  idConceptType: 1,
  idConcept: 1,
  idOrganisation: 1
}); // schema level */

module.exports = mongoose.model("WordNet", wordnetSchema);
