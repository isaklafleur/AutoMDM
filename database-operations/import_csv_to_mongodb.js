// http://wiki.eclass.eu/wiki/csv_file_description

const mongoose  = require('mongoose'),
    parse       = require('csv-parse'),
    path        = require('path'),
    fs          = require('fs'),
    EClass      = require('./models/eclass');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/eclassCSV');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    // we're connected!

    const p = path.join(__dirname, '/../', 'file-operations', 'csv-files');
    //console.log(p);

    const parser = parse({delimiter: ';'}, function(err, data){
        //console.log(data);
        const codedName = data.map((item,i) => data[i][6]);
        const preferredName = data.map((item,i) => data[i][7]);
        const definition = data.map((item,i) => data[i][8]);
        const level = data.map((item,i) => data[i][13]);
        const mkSubclass = data.map((item,i) => data[i][14]);
        const mkKeyword = data.map((item,i) => data[i][15]);

        // Looping and storing the data into mongodb
        for (let i = 1; i < data.length; i++) {

            const newEclass = new EClass();
            newEclass.eclassSegment = codedName[i].slice(0,2);
            newEclass.eclassMainGroup = codedName[i].slice(2,4);
            newEclass.eclassGroup = codedName[i].slice(4,6);
            newEclass.eclassCommodityClass = codedName[i].slice(6,8);
            newEclass.preferredName = preferredName[i];
            newEclass.definition = definition[i];
            newEclass.level = level[i];
            newEclass.mkSubclass = mkSubclass[i];
            newEclass.mkKeyword = mkKeyword[i];
            newEclass.save()
            .then(function() {
                mongoose.disconnect();
            })
            .catch(function(err) {
                console.log('There was an error', err);
            });
        }
    });
    fs.createReadStream(p + '/One-eClass-10_0_CC_en.csv').pipe(parser);
});
