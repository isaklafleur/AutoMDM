const mongoose = require("mongoose"),
  _ = require("lodash"),
  fs = require("fs"),
  path = require("path");

mongoose.Promise = require("bluebird");

mongoose.connect("mongodb://localhost/eclass");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  // we're connected!
  // create db schema
  const EclassSchema = new mongoose.Schema({
    xsi: {
      xsitype: "string",
      id: "string"
    },
    date_of_original_definition: "string",
    date_of_current_version: "string",
    date_of_current_revision: "string",
    revision: "string",
    status: "string",
    source_language: {
      country_code: "string",
      language_code: "string"
    },
    preferred_name: "string",
    definition: "string",
    its_superclass: "string",
    hierarchical_position: "string"
    //keywords: 'string'
  });
  // Create model
  const Eclass = mongoose.model("Eclass", EclassSchema);

  const pjsons = path.join(__dirname, "/../", "file-operations", "json-files");
  //console.log(pjsons);

  function readFiles(pjsons, onError) {
    fs.readdir(pjsons, (err, filenames) => {
      if (err) {
        onError(err);
        return;
      }

      filenames.forEach((filename, index, array) => {
        fs.readFile(pjsons + "/" + filename, "utf-8", function(err, data) {
          if (err) {
            onError(err);
            return;
          }
          data = JSON.parse(data);
          // Digging down into the json code
          const ontomlOntoml = data["dic:eclass_dictionary"]["ontoml:ontoml"];
          const onto = _.first(ontomlOntoml);
          const dictionary = onto["dictionary"];
          const contClasses = _.first(dictionary);
          const containedClasses = contClasses["contained_classes"];
          const ontClass = _.first(containedClasses);
          const ontomlClass = _.find(ontClass);

          //Arrays
          const xsiArray = _.map(ontomlClass, "$");
          const date_of_original_definitionArray = _.map(
            ontomlClass,
            "date_of_original_definition"
          );
          const date_of_current_versionArray = _.map(
            ontomlClass,
            "date_of_current_version"
          );
          const date_of_current_revisionArray = _.map(
            ontomlClass,
            "date_of_current_revision"
          );
          const revisionArray = _.map(ontomlClass, "revision");
          const statusArray = _.map(ontomlClass, "status");
          const sourceLanguageArray = _.map(ontomlClass, "source_language");
          const preferredNameArray = _.map(ontomlClass, "preferred_name");
          const definitionArray = _.map(ontomlClass, "definition");
          const itsSuperclassArray = _.map(ontomlClass, "its_superclass");
          const hierarchical_positionArray = _.map(
            ontomlClass,
            "hierarchical_position"
          );
          //const keywordsArray = _.map(ontomlClass, 'keywords');

          // Looping and storing the data into mongodb
          //console.log(ontomlClass.length);
          for (let i = 0; i < ontomlClass.length; i++) {
            //console.log(hierarchical_positionArray[i]);
            const newEclass = new Eclass();
            newEclass.xsi.xsitype = xsiArray[i]["xsi:type"];
            newEclass.xsi.id = xsiArray[i]["id"];
            newEclass.date_of_original_definition =
              date_of_original_definitionArray[i];
            newEclass.date_of_current_version = date_of_current_versionArray[i];
            newEclass.date_of_current_revision =
              date_of_current_revisionArray[i];
            newEclass.revision = revisionArray[i];
            newEclass.status = statusArray[i];
            newEclass.source_language.country_code =
              sourceLanguageArray[i][0].$.country_code;
            newEclass.source_language.language_code =
              sourceLanguageArray[i][0].$.language_code;
            newEclass.preferred_name = preferredNameArray[i][0].label[0]._;
            newEclass.definition = definitionArray[i][0].text[0]._;
            //newEclass.its_superclass = itsSuperclassArray[i][0].$.class_ref;
            newEclass.hierarchical_position = hierarchical_positionArray[i];
            //newEclass.keywords = keywordsArray[i][0].label[0]._;
            newEclass
              .save()
              .then(function() {
                if (index === array.length - 1) {
                  mongoose.disconnect();
                }
              })
              .catch(function(err) {
                console.log("There was an error", err);
              });
          }
        });
      });
    });
  }
  readFiles(pjsons);
});
