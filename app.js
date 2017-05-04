const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
mongoose.Promise = require('bluebird');

const app = express();

mongoose.connect('mongodb://localhost:27017/autoMDM')
  .then(() => console.log('connection succesfully to MongoDB'))
  .catch(err => console.error(err));

// Require Passport Helper file
const passport = require('./helpers/passport');

// Require the Routes
const index = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const eClassRoutes = require('./routes/eClassRoutes');
const jsTreeRoutes = require('./routes/jsTreeRoutes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(methodOverride('_method'));
app.use(favicon(`${__dirname}/public/images/database-icon.png`));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(flash());
app.use(expressLayouts);
app.use(session({
  secret: 'auto-mdm-rocks-2017',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// adding our own middleware so all pages can access currentUser
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/', index);
app.use('/admin', adminRoutes);
app.use('/eclass', eClassRoutes);
app.use('/jstree', jsTreeRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
