const express = require('express');

const eClass = express.Router();

// Require Mongoose Model
const EClass = require('../models/eclass.js');

// Require Helpers
const auth = require('../helpers/auth');

// eClass Controller
const eClassController = require('../controllers/eClassController');

/* GET eClass display tree */
eClass.get('/', auth.ensureAuthenticated('/login'), (req, res, next) => {
  // Get First Level with Parent and Children nodes
});

eClass.get('/import', (req, res, next) => {
  EClass.find({ eclassGroup: '00' }, { _id: 0, eclassSegment: 1, eclassMainGroup: 1, eclassGroup: 1, eclassCommodityClass: 1, preferredName: 1 }).exec((err, result) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.render('eclass/index', { result });
    }
  });
});
module.exports = eClass;
