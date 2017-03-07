// http://wiki.eclass.eu/wiki/csv_file_description

const mongoose  = require('mongoose'),
    parse       = require('csv-parse'),
    path        = require('path'),
    fs          = require('fs');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/eclassCSV');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    // we're connected!
    // create db schema
    const EclassSchema = new mongoose.Schema({
        codedName: { type: String, min: 10, max: 10 },
        preferredName: { type: String, max: 80 },
        definition: { type: String, max: 1023 },
        level: { type: String, min: 1, max: 1 },
        mkSubclass: { type: String, min: 1, max: 1 },
        mkKeyword: { type: String, min: 1, max: 1 }
    });
    
    // Create MongoDB model with mongoose
    const Eclass = mongoose.model('Eclass', EclassSchema);
    
    const p = path.join(__dirname, '/../', 'file-operations', 'csv-files');
    //console.log(p);

    const parser = parse({delimiter: ';'}, function(err, data){
        //console.log(data);
        //const supplier = data[0][0];
        const codedName = data.map((item,i) => data[i][6]);
        const preferredName = data.map((item,i) => data[i][7]);
        const definition = data.map((item,i) => data[i][8]);
        const level = data.map((item,i) => data[i][13]);
        const mkSubclass = data.map((item,i) => data[i][14]);
        const mkKeyword = data.map((item,i) => data[i][15]);
        
        // Looping and storing the data into mongodb
        //console.log(ontomlClass.length);
        for (let i = 0; i < data.length; i++) {
            //console.log(hierarchical_positionArray[i]);
            const newEclass = new Eclass();
            newEclass.codedName = codedName[i];
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
