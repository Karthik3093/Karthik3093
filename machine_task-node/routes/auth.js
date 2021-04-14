const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const userLogin = await User.findOne({ email });
  if (!userLogin) return res.status(400).send("Invalid Email or Password");
  const token = await userLogin.generateAuthToken();
  

  const validPassword = await bcrypt.compare(password, userLogin.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");
  res.send(token);
});

module.exports = router;
