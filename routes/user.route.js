/** @format */

const { UserModle } = require("../models/user.modle");

const express = require("express");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

userRoute.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  const check = await UserModle.findOne({ email });
  if (check) {
    res.status(200).send({ msg: "User already exist, please login" });
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (hash) {
          const user = new UserModle({
            name,
            email,
            gender,
            password: hash,
          });
          await user.save();
          res.status(200).send({ msg: "new user has been created" });
        }
      });
    } catch (err) {
      res.status(400).send({ err: err.message });
    }
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModle.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { authorId: user._id, author: user.name },
            "ranjan"
          );
          res.status(200).send({
            msg: "login Successful",
            token: token,
          });
        } else {
          res.status(200).send({ msg: "wrong password" });
        }
      });
    } else {
      res.status(200).send({ msg: "Please signup first" });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = { userRoute };
