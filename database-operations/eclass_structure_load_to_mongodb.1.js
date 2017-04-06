/*
const eClass = ['13000000','13010000','13010100','13010101','13010102','13010103','13020000'];

const str = eClass[0].substr(2,8);
console.log(str);

// find parent (segment) for main-group (13010000)
const segment = eClass[1].slice(0,-6) + '000000';
console.log(segment); //13000000

// find parent main-group for sub-group (13010100)
const maingroup = eClass[2].slice(0,-4) + '0000';
console.log(maingroup); //13010000

// find parent sub-group for commodity class (13010101)
const subgroup = eClass[3].slice(0,-2) + '00';
console.log(subgroup);
*/
////////////////////////////////////////////////////////////////////////////

const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/eclass_structure');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    // Defining the child schema
    const childSchema = new mongoose.Schema({
        codedName: { type: String, min: 10, max: 10 },
        preferredName: { type: String, max: 80 }
    });
    // Defining the parent schema
    const EclassSchema = new mongoose.Schema({
        codedName: { type: String, min: 10, max: 10 },
        preferredName: { type: String, max: 80 },
        isExpended: { type: Boolean },
        children: [childSchema]
    });
   
    // Create MongoDB model with mongoose
    const Eclass = mongoose.model('Eclass', EclassSchema);
    
    // Example data
    const data = ['13000000','13010000','13010100','13010101','13010102','13010103','13020000','14000000', '15000000'];
    
    for (let i = 0; i < data.length; i++) {

        if(data[i].substring(2,8) === '000000') {
            const eclass = new Eclass();
            eclass.codedName = data[i];
            eclass.preferredName = '';
            eclass.children = [];
            eclass.save(function(err, result) {
                if(err) {
                    console.log(err);
                }
                console.log("Saved the document with success!", result);
            });
        }

        if(data[i].substring(4,8) === '0000' && !(data[i].substring(2,8) === '000000')) {
            // identify what segment this main group belongs to
            const segment = data[i].slice(0,-6) + '000000';
            console.log(segment);
            Eclass.findOneAndUpdate({codeName: segment}, {$push: {children: data[i]}}, function(err, doc) {
                if(err) {
                    console.log(err);
                }
                console.log(doc);
            });
        }
    }
});