module.exports = {
  // using session to verify if user is logged in or not
  checkLoggedIn: redirectPath => (req, res, next) => {
    if (req.session.currentUser) {
      next();
    } else {
      res.redirect(redirectPath);
    }
  },
  // using passportJS to verify if user is logged in or not
  ensureAuthenticated: redirectPath => (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect(redirectPath);
  },
};
