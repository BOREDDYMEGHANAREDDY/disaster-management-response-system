const express = require("express");
const router = express.Router();

const Report =
require("../models/Report");

const multer =
require("multer");

const path =
require("path");

/* STORAGE */

const storage =
multer.diskStorage({

  destination:
  (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename:
  (req, file, cb) => {

    cb(
      null,
      Date.now() +
      path.extname(
        file.originalname
      )
    );

  }

});

const upload =
multer({ storage });

/* CREATE REPORT */

router.post(
  "/",
  upload.single("image"),

  async (req, res) => {

    try {

      console.log("BODY:", req.body);

      const {
        location,
        type,
        description,
        userId
      } = req.body;

      const report =
      await Report.create({

        location,
        type,
        description,

        image:
        req.file
        ? req.file.filename
        : "",

        lat: 17.3850,
        lng: 78.4867,

        userId

      });

      res.status(201)
      .json(report);

    }

    catch (err) {

      console.log(err);

      res.status(500)
      .json({
        message: err.message
      });

    }

});

/* GET ALL */

router.get(
  "/",
  async (req, res) => {

    const reports =
    await Report.find()
    .sort({ createdAt: -1 });

    res.json(reports);

});

/* MY REPORTS */

router.get(
"/my-reports/:userId",

async (req, res) => {

  try {

    const reports =
    await Report.find({

      userId:
      req.params.userId

    });

    res.json(reports);

  }

  catch (err) {

    res.status(500)
    .json({
      message: err.message
    });

  }

});

module.exports =
router;