var fs      = require('fs'),
    xml2js  = require('xml2js'),
    util    = require('util');



var parser = new xml2js.Parser();
var inspect = require('eyes').inspector({maxLength: false})

// Read XML file and convert it to
fs.readFile(__dirname + '/xml-files/eClass9_1_ADVANCED_EN_SG_13.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        //console.dir(result);
        //console.dir(util.inspect(result, false, null));
        //console.log(JSON.stringify(result));
        // Display converted data in json with module "eyes"
        //inspect(result);

        // Write converted Json data into a new file
        fs.writeFile(__dirname + '/json-files/eClass9_1_ADVANCED_EN_SG_13.json', JSON.stringify(result, null, 4));
        //console.log(JSON.stringify(result, null, 2)); // spacing level = 2
        console.log('Done');
    });
});
