const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Require Mongoose Model
const EClass = require('../models/eclass.js');

// Connect to Database
mongoose.connect('mongodb://localhost:27017/autoMDM')
  .then(() => console.log('connection succesfully to MongoDB'))
  .catch(err => console.error('Connection Error: ', err));

const db = mongoose.connection;

/*
// Expected format of the node (there are no required fields)
{
  id          : "string" // will be autogenerated if omitted
  text        : "string" // node text
  icon        : "string" // string for custom
  state       : {
    opened    : boolean  // is the node open
    disabled  : boolean  // is the node disabled
    selected  : boolean  // is the node selected
  },
  children    : []  // array of strings or objects
  li_attr     : {}  // attributes for the generated LI node
  a_attr      : {}  // attributes for the generated A node
}

*/



db.once('open', () => {
  const getFirstLevel = () => {
    EClass.find({ eclassMainGroup: '00' }, { _id: 0, eclassSegment: 1, eclassMainGroup: 1, eclassGroup: 1, eclassCommodityClass: 1, preferredName: 1 }, (err, result) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        // console.log(result);
        let jsTreeArrayOfObjects = [];
        let jsTreeObject = {};
        for (let i = 0; i < 10; i++) {
          jsTreeObject.id = result[i].eclassSegment + result[i].eclassMainGroup + result[i].eclassGroup + result[i].eclassCommodityClass;
          jsTreeObject.text = result[i].preferredName;
          jsTreeArrayOfObjects.push(jsTreeObject);
        }
        console.log(jsTreeArrayOfObjects);
      }
    })
    .then(() => {
      mongoose.disconnect();
      // console.log(JSON.stringify(jsTreeObject));
    })
    .catch((err) => {
      console.log('There was an error when disconnecting: ', err);
    });
  };
  getFirstLevel();
});