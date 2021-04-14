const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      password:this.password
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
