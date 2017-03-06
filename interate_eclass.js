var _ = require('lodash');
var fs = require('fs');

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
    
    //ARRAYS
    // hierarchical_position
    const hierarchical_positionArray = _.map(ontomlClass, 'hierarchical_position');

    // source_language (includes country_code and language_code)
    const sourceLanguageArray = _.map(ontomlClass, 'source_language');

    // preferred_name (includes _ and $)
    const preferredNameArray = _.map(ontomlClass, 'preferred_name');

    //definition (includes text)
    const definitionArray = _.map(ontomlClass, 'definition');

    //
    //its_superclass
    const itsSuperclassArray = _.map(ontomlClass, 'its_superclass');

    // continue here!
    // add the keywords for 13109090




    //console.log("sourceLanguageArray", sourceLanguageArray);
    // => [ [ { '$': [Object] } ], [ { '$': [Object] } ],[ { '$': [Object] } ] ]
    
    //console.log("sourceLanguageArray[0]", sourceLanguageArray[0]);
    // => [ { '$': { country_code: 'US', language_code: 'en' } } ]
    
    //console.log(preferredNameArray[1][0].label[0]._);
    console.log(itsSuperclassArray[700][0].$.class_ref);
    //console.log(sourceLanguageArray[0][0].$.country_code);

});  



//var sourceLanguageArray = [[ { '$': { country_code: 'US', language_code: 'en' } } ]];

//console.log(sourceLanguageArray[0][0].$.country_code);
//console.log("language code:", sourceLanguageArray[0][0].$.language_code);