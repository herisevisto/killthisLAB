const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  email: String,
  password: String,
});

// Adding middleware
// on 'save' state, hash the password if password is modified
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next;

    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(this.password, salt);
    this.password = hashed_pass;
    next();
  } catch (err) {
    next(err);
  }
});

const User = model("users", userSchema);

module.exports = User;
