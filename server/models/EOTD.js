const mongoose = require("mongoose");

// Defining Mongoose Schema
const eOTDSchema = new mongoose.Schema({
  conceptID: String,
  termID: String,
  term: String,
  reference: String,
  statusTerm: String,
  language: String,
  originatingOrganization: String,
  definitionID: String,
  definition: String,
  statusConcept: String
});

// Concept Type: Class, Other, Property, ..,
// Concept_ID: 0161-1#01-011584#1
// Term_ID: 0161-1#TM-012896#1
// Term: ADAPTER SET,CYLINDER COMPRESSION TESTER
// Reference: FIIG=A23800;INC=47525
// Definition_ID: 0161-1#DF-416067#1
// Definition: A collection of ADAPTER (1), CYLINDER COMPRESSION TESTER of different types and sizes. May include a storage case.
// Language_ID: 0161-1#LG-000001#1
// Language: en - US
// Originating Organization: DLIS
// Organization_ID: 0161-1#OG-002462#1

// Status Term: Active
// Status Concept: Active

// A concept id can have terms and definitions in multiple different langugages.

// Create mongoose model
module.exports = mongoose.model("EOTD", eOTDSchema);
