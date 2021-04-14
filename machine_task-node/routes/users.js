const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../models/user");
const express = require("express");
const router = express.Router();

// router.get("/", auth, async (req, res) => {
// const user = await User.findById(req.user._id).select("-password");
// res.send(user);
// });

router.post("/", async (req, res) => {
let user = new User({
username: req.body.username,
email: req.body.email,
password: req.body.password,
});

const token = user.generateAuthToken();
res
.header("x-auth-token", token)
.header("access-control-expose-headers", "x-auth-token");

const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(user.password, salt);
user
.save()
.then((data) => {
res.json(data);
})
.catch((error) => {
res.json(error);
});

user = await User.findOne({ email: req.body.email });
if (user) return res.status(400).send("User already registered.");
});

module.exports = router;