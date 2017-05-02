const EClass = require('../models/eclass.js');

const eClassController = {};

eClassController.getCompleteeClassCode = (req, res) => {
  EClass.find({ eclassSegment: { $ne: '00' } }).exec((err, result) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.render('eclass/index', { result });
    }
  });
};

exports.module = eClassController;
