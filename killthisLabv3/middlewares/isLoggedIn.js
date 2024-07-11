// Make sure that the user is logged in before accessing the pages

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/main/login-student?");
}

module.exports = isLoggedIn;
