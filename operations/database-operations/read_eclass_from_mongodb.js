let mongoose = require('mongoose'),
  EClass = require('./models/eclass');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/eclassCSV');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  let getOneeClassCode = function () {
      EClass.findOne({ eclassSegment: '13' }, 'eclassSegment eclassMainGroup eclassGroup eclassCommodityClass', (err, result) => {
          if (err) {
              console.log('Error: ', err);
            }
          console.log('Display the whole 8-digits eClass Code: ', result.eclassSegment, result.eclassMainGroup, result.eclassGroup, result.eclassCommodityClass);
        })
        .then(() => {
          mongoose.disconnect();
        })
        .catch((err) => {
          console.log('There was an error: ', err);
        });
    };
    // getOneeClassCode();

  let getAlleClassCodes = function () {
      EClass.find({ eclassSegment: '13' }, (err, result) => {
          if (err) {
              console.log('Error: ', err);
            }
          console.log('Display the whole 8-digits eClass Code: ', result[1].eclassSegment, result[1].eclassMainGroup, result[1].eclassGroup, result[1].eclassCommodityClass);
        })
        .then(() => {
          mongoose.disconnect();
        })
        .catch((err) => {
          console.log('There was an error: ', err);
        });
    };
    // getAlleClassCodes();

  let getAlleClassCodesLoop = function () {
      EClass.find({}, (err, result) => {
          if (err) {
              console.log('Error: ', err);
            }
          result.forEach((el) => {
                // I have the result and need to interate over it to create the object with parent and children.
              console.log(`${el.eclassSegment  }${  el.eclassMainGroup  }${  el.eclassGroup  }${  el.eclassCommodityClass}`);
            });
        })
        .then(() => {
          mongoose.disconnect();
        })
        .catch((err) => {
          console.log('There was an error: ', err);
        });
    };
  getAlleClassCodesLoop();
});
