const express = require('express');

// Require Helpers
const auth = require('../helpers/auth');

const adminRoutes = express.Router();

// User Model
const User = require('../models/user');

/* GET admin page. */
adminRoutes.get('/', auth.ensureAuthenticated('/login'), (req, res, next) => {
  res.render('admin/index');
});

module.exports = adminRoutes;
