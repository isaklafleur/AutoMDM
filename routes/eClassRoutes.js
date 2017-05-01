const express = require('express');

const eClass = express.Router();

/* GET eClass index Page */
eClass.get('/', (req, res, next) => {
  res.render('eclass/index', { });
});

module.exports = eClass;
