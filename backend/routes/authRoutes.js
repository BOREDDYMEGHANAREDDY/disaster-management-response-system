const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User =
  require("../models/User");

// REGISTER

router.post(
  "/register",
  async (req, res) => {

    const {
      name,
      email,
      phone,
      location,
      username,
      password,
      role
    } = req.body;

    const hashed =
      await bcrypt.hash(
        password,
        10
      );

    await User.create({

      name,
      email,
      phone,
      location,
      username,
      password: hashed,
      role

    });

    res.json({
      message:
        "Registered Successfully"
    });

  }
);

// LOGIN

router.post(
  "/login",
  async (req, res) => {

    const user =
      await User.findOne({

        email: req.body.email

      });

    if (!user)
      return res.send(
        "User not found"
      );

    const valid =
      await bcrypt.compare(

        req.body.password,
        user.password

      );

    if (!valid)
      return res.send(
        "Wrong password"
      );

    const token =
      jwt.sign(
        { id: user._id },
        "secretkey"
      );

    res.json({

      token,
      role: user.role

    });

  }
);

module.exports = router;