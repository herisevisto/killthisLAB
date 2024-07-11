const User = require("../model/user.model");
const passport = require("passport");
const crypto = require('crypto');
const bcrypt = require('bcrypt');

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
  
  requestPasswordReset: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      
      const token = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();
      
      // Here you would typically send an email with the reset link
      // For now, we'll just return the token
      res.status(200).send({ message: "Password reset token generated", token });
    } catch (err) {
      console.error("Error in password reset request:", err);
      res.status(500).send({ message: "Server error" });
    }
  },
  
  resetPassword: async (req, res) => {
    try {
      const user = await User.findOne({
        resetPasswordToken: req.body.token,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).send({ message: "Password reset token is invalid or has expired" });
      }
  
      user.password = req.body.newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.status(200).send({ message: "Password has been reset" });
    } catch (err) {
      console.error("Error resetting password:", err);
      res.status(500).send({ message: "Server error" });
    }
  }
};
