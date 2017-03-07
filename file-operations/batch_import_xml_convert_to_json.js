var fs      = require('fs'),
    path    = require('path'),
    xml2js  = require('xml2js');

var parser = new xml2js.Parser();

const pxmls = path.join(__dirname, 'xml-files');
const pjsons = path.join(__dirname, 'json-files');
console.log(pjsons);
// Here's the reading part:
function readFiles(pxmls, onError) {
    fs.readdir(pxmls, function(err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        //console.log(filenames);
        filenames.forEach(function(filename) {
            fs.readFile(pxmls + '/' + filename, 'utf-8', function(err, data) {
                if (err) {
                    onError(err);
                    return;
                }
                //console.log(filename);
                // changing file extension from .xml to .json
                var x = filename.replace(/\.[^/.]+$/, '.json');
                parser.parseString(data, function (err, result) {
                    fs.writeFile(pjsons + '/' + x, JSON.stringify(result, null, 4));
                });
            });
        });
    });
}
readFiles(pxmls);