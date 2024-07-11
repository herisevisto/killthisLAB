const User = require("../model/user.model");
const passport = require("passport");

module.exports = {
  login: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).send({ message: "User logged in successfully" });
      });
    })(req, res, next);
  },
  register: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      newUser.save();
      res.status(201).send({ message: "User created successfully" });
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).send({ message: "Server error" });
    }
  },

  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  },
};
