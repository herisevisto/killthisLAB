const User = require("../model/user.model");
const UserDetails = require("../model/userDetails")
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

      console.log("Student", user)
      if(user.role == "Student"){
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          // store user data in session
          req.session.user = user
          return res.status(200).send({ message: "User logged in successfully", userID: user.userID });
        });
      }
      else{
        return res.status(401).send({ message: "Invalid student account" });
      }
    })(req, res, next);
  },

  loginlabtech: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send({ message: info.message });
      }
      console.log("Labtech", user)
      if(user.role == "Labtech"){
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          // store user data in session
          req.session.user = user
          return res.status(200).send({ message: "User logged in successfully", userID: user.userID });
        });
      }
      else{
        return res.status(401).send({ message: "Invalid admin account" });
      }
    })(req, res, next);
  },

  register: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      newUser.save();
      // for user details
      const { userID } = req.body
      const newUserDetails = new UserDetails({
        userID,
        userDescription: "",
        userPicture: "",
        reservationID: [],
        classID: [],
        displayName: ""
      })
      await newUserDetails.save()
      
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
  changePassword: async (req, res) => {
    try {
      const { userID, oldPassword, newPassword } = req.body;
      const user = await User.findOne({ userID });

      if (!user || !(await user.comparePassword(oldPassword))) {
        return res.status(401).send({ message: "Incorrect old password" });
      }

      user.password = newPassword;
      await user.save();

      res.status(200).send({ message: "Password changed successfully" });
    } catch (err) {
      console.error("Error changing password:", err);
      res.status(500).send({ message: "Server error" });
    }
  },
};
