const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Require Helpers
const auth = require('../helpers/auth');

const adminRoutes = express.Router();

// User Model
const User = require('../models/user');

/* GET admin page. */
adminRoutes.get('/', (req, res, next) => {
  res.render('admin/index');
});

module.exports = adminRoutes;
