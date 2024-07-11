const passport = require("passport");

module.exports = {
  login: passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "login",
    failureFlash: true,
  }),
  register: (req, res) => {
    console.log(req.body);
    res.status(201).send({ message: "User created successfully" });
  },
  logout: () => {},
};
