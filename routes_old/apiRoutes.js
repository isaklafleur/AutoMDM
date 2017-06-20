const express = require('express');

const apiRoutes = express.Router();

/* GET home page. */
apiRoutes.get('/:eClassCode/', (req, res, next) => {
  // 23000000 => level: 1, 23010000 => level: 2, 23010100 => level: 3
  // 23010101 => level: 4 (will not have any children)
  const parentNode = req.params.eClassCode;
  // Level of parent node...
  23010000

  const eclassSegment = eClassCode.slice(0,2);
  const eclassMainGroup = eClassCode.slice(2,4);
  const eclassGroup = eClassCode.slice(4,6);
  const eclassCommodityClass = eClassCode.slice(6,8);

  if (eClassMainGroup == '00') {
    this.mongoQuery = { eclassSegment: parentNode.slice(0, 2), eclassMainGroup: '00', eclassCommodityClass: '00' };
  } else if (eclassMainGroup)
  eclassSegment: 23"
  eclassMainGrou: !== "00"
  eclassCommodityClass: "00"
  eclassGroup: "00"

23010000
23020000

if( )

  switch (lvl) {
    case 1:

      break;
    case 2:
      this.mongoQuery = {
        eclassSegment: parentNode.slice(0, 2),
        eclassMainGroup: parentNode.slice(2, 4),
        level: 3,
      };
      break;
    case 3:
      this.mongoQuery = {
        eclassSegment: parentNode.slice(0, 2),
        eclassMainGroup: parentNode.slice(2, 4),
        eclassGroup: parentNode.slice(4, 6),
        level: 4,
      };
      break;
    case 4:
      // List all part numbers on the right side of the page
      break;
  }

  const getFirstLevel = (mQuery) => {
    EClass.find(mQuery, {
      _id: 0,
      eclassSegment: 1,
      eclassMainGroup: 1,
      eclassGroup: 1,
      eclassCommodityClass: 1,
      preferredName: 1,
    }, (err, result) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        const jsTreeArrayOfObjects = [];
        for (let i = 0; i < result.length; i++) {
          jsTreeArrayOfObjects.push({
            id: result[i].eclassSegment +
                result[i].eclassMainGroup +
                result[i].eclassGroup +
                result[i].eclassCommodityClass,
            text: result[i].preferredName,
            icon: 'string',
            state: {
              opened: false,
              disabled: false,
              selected: false,
            },
            children: [],
            li_attr: {},
            a_attr: {},
          });
        }
        console.log(JSON.stringify(jsTreeArrayOfObjects, null, 2));
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
  getFirstLevel(this.mongoQuery);

});


module.exports = apiRoutes;
