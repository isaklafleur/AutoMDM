var mongoose = require('mongoose');
var _ = require('lodash');
var fs = require('fs');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/eclass');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    // we're connected!
    // create db schema
    var EclassSchema = new mongoose.Schema({
        xsi: {
            xsitype: 'string',
            id: 'string'
        },
        date_of_original_definition: 'string',
        date_of_current_version: 'string',
        date_of_current_revision: 'string',
        revision: 'string',
        status: 'string',
        source_language: {
            country_code: 'string',
            language_code: 'string'
        },
        preferred_name: 'string',
        definition: 'string',
        its_superclass: 'string',
        hierarchical_position: 'string',
    });
    // Create model
    var Eclass = mongoose.model('Eclass', EclassSchema);

    // Read file and store data into db
    fs.readFile('./json-files/eClass9_1_ADVANCED_EN_SG_13.json', 'utf8', function (err,data) {
        data = JSON.parse(data);
        
        // Digging down into the json code
        const ontomlOntoml = data['dic:eclass_dictionary']['ontoml:ontoml'];
        const onto = _.first(ontomlOntoml);
        const dictionary = onto['dictionary'];
        const contClasses = _.first(dictionary);
        const containedClasses = contClasses['contained_classes'];
        const ontClass = _.first(containedClasses);
        const ontomlClass = _.find(ontClass);      
    
        //Arrays
        const xsiArray = _.map(ontomlClass, '$');
        const date_of_original_definitionArray = _.map(ontomlClass, 'date_of_original_definition');
        const date_of_current_versionArray = _.map(ontomlClass, 'date_of_current_version');
        const date_of_current_revisionArray = _.map(ontomlClass, 'date_of_current_revision');
        const revisionArray = _.map(ontomlClass, 'revision');
        const statusArray = _.map(ontomlClass, 'status');
        const sourceLanguageArray = _.map(ontomlClass, 'source_language');
        const preferredNameArray = _.map(ontomlClass, 'preferred_name');
        const definitionArray = _.map(ontomlClass, 'definition');
        const itsSuperclassArray = _.map(ontomlClass, 'its_superclass');
        const hierarchical_positionArray = _.map(ontomlClass, 'hierarchical_position');

        // Looping and storing the data into mongodb
        //for (var i = 0; i < hierarchical_positionArray.length; i++) {
        for (var i = 0; i < 738; i++) {
            //console.log(hierarchical_positionArray[i]);
            var newEclass = new Eclass();
            newEclass.xsi.xsitype = xsiArray[i]['xsi:type'];
            newEclass.xsi.id = xsiArray[i]['id'];
            newEclass.date_of_original_definition = date_of_original_definitionArray[i];
            newEclass.date_of_current_version = date_of_current_versionArray[i];
            newEclass.date_of_current_revision = date_of_current_revisionArray[i];
            newEclass.revision = revisionArray[i];
            newEclass.status = statusArray[i];
            newEclass.source_language.country_code = sourceLanguageArray[i][0].$.country_code;
            newEclass.source_language.language_code = sourceLanguageArray[i][0].$.language_code;
            newEclass.preferred_name = preferredNameArray[i][0].label[0]._;
            newEclass.definition = definitionArray[i][0].text[0]._;
            newEclass.its_superclass = itsSuperclassArray[i][0].$.class_ref;
            newEclass.hierarchical_position = hierarchical_positionArray[i];
            newEclass.save(function (err) {});
        }
    });
});