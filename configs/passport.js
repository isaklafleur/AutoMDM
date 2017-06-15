const passport = require('passport');
const jwtOptions = require('./jwtOptions');
const passportJWT = require('passport-jwt');
const User = require('../models/user');

const JwtStrategy = passportJWT.Strategy;

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  // usually this would be a database call:
  User.findById(jwt_payload.id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(strategy);

module.exports = passport;
