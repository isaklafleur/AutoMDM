var mongoose        = require('mongoose'),
    EClass          = require('./models/eclass');

mongoose.Promise    = require('bluebird');

mongoose.connect('mongodb://localhost/eclassCSV');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    var getOneeClassCode = function() {
        EClass.findOne({ 'eclassSegment': '13' }, 'eclassSegment eclassMainGroup eclassGroup eclassCommodityClass', function (err, result) {
            if (err) {
                console.log('Error: ', err);
            }
            console.log('Display the whole 8-digits eClass Code: ', result.eclassSegment, result.eclassMainGroup, result.eclassGroup, result.eclassCommodityClass);
        })
        .then(function() {
            mongoose.disconnect();
        })
        .catch(function(err) {
            console.log('There was an error', err);
        });
    };
    getOneeClassCode();
    
    var getAlleClassCodes = function() {
        EClass.find({ 'eclassSegment': '13' }, function (err, result) {
            if (err) {
                console.log('Error: ', err);
            }
            console.log('Display the whole 8-digits eClass Code: ', result[1].eclassSegment, result[1].eclassMainGroup, result[1].eclassGroup, result[1].eclassCommodityClass);
        })
        .then(function() {
            mongoose.disconnect();
        })
        .catch(function(err) {
            console.log('There was an error', err);
        });
    };
    getAlleClassCodes();

    var getAlleClassCodesLoop = function() {
        EClass.find({ 'eclassSegment': '13' }, function (err, result) {
            if (err) {
                console.log('Error: ', err);
            }
            result.forEach(function(el) {
                console.log(el.eclassSegment + '' + el.eclassMainGroup + '' + el.eclassGroup + '' + el.eclassCommodityClass);
            });
        });
    };
    getAlleClassCodesLoop();
});
