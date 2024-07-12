const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

function initializePassport(app) {
  app.use(passport.initialize());
  app.use(passport.session()); // This should be 'session' instead of 'authenticate("session")'

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, { message: "account not found" });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "incorrect password" });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initializePassport;
