const express = require('express');

const jsTreeRoutes = express.Router();

/* GET home page. */
jsTreeRoutes.get('/', (req, res, next) => {
  res.render('jstree/index');
});

module.exports = jsTreeRoutes;
