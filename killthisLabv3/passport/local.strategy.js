const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

function initializePassport(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      function (email, password, done) {
        User.findOne({ where: { email: email } }).then((user) => {
          if (!user) return done(null, false, { message: "account not found" });
          if (!bcrypt.compare(passport, user.password)) {
            return done(null, false, { message: "incorrect password" });
          }
          return done(null, true);
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    const user = User.findById(id);
    done(err, user);
  });
}

module.exports = initializePassport;
