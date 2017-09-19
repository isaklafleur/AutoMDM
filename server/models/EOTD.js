const mongoose = require("mongoose");

// Defining Mongoose Schema

// A SCHEMA OF TERMS WITH DEFINITIONS AND ABBREVIATIONS...
const eOTDSchema = new mongoose.Schema(
  {
    // ID
    idTerm: String,
    idDefinition: String,
    idLanguage: String,
    idConceptType: String,
    idConcept: String,
    idConceptType: String,
    idOrganisation: String,

    // STATUS
    statusTerm: Number,
    statusDefinition: Number,
    statusConcept: Number,

    term: String,
    definition: String,
    reference: String,
    conceptType: String,
    languageCode: String,
    countryCode: String,
    languageCountry: String,
    languageCountryDesc: String,
    abbreviations: [
      {
        abbreviationID: String,
        termID: String,
        abbreviation: String
      }
    ]
  },
  { collection: "eOTD" }
);

eOTDSchema.index({
  idTerm: 1,
  idDefinition: 1,
  idLanguage: 1,
  idConceptType: 1,
  idConcept: 1,
  idOrganisation: 1
}); // schema level

module.exports = mongoose.model("EOTD", eOTDSchema);
