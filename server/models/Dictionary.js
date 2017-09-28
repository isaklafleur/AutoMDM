const mongoose = require("mongoose");

// Defining Mongoose Schema

// A SCHEMA OF TERMS WITH DEFINITIONS AND ABBREVIATIONS...
const dictionarySchema = new mongoose.Schema(
  {
    // ID
    word: String,
    results: [
      {
        definition: String, // described the word
        partOfSpeech: String, // noun, pronoun, adjective, determiner, verb, adverb, preposition, conjunction, interjection
        typeOf: String,
        hasTypes: String,
        hasParts: String,
        partOf: Array,
        pertainsTo: Array,
        derivation: Array,
        examples: Array,
        abbreviations: Array,
        language: String, //en-US, sv-SE
        synonyms: Array,
        source: String,
        idSource: String,
        status: Boolean
      }
    ]
  },
  { collection: "dictionary" }
);

module.exports = mongoose.model("Dictionary", dictionarySchema);
