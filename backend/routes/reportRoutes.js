const express = require("express");
const router = express.Router();

const Report = require("../models/Report");

const multer = require("multer");
const path = require("path");

/* ================= STORAGE CONFIG ================= */

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    // Absolute path fix (important for Render)

    cb(
      null,
      path.join(__dirname, "../uploads")
    );

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
      path.extname(file.originalname)
    );

  }

});

/* Upload config */

const upload = multer({

  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024   // 5MB limit
  }

});

/* ================= CREATE REPORT ================= */

router.post(
  "/",
  upload.single("image"),

  async (req, res) => {

    try {

      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const {
        location,
        type,
        description,
        userId
      } = req.body;

      const report = await Report.create({

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

      res.status(201).json(report);

    }

    catch (err) {

      console.log("ERROR:", err);

      res.status(500).json({
        message: err.message
      });

    }

});

/* ================= GET ALL REPORTS ================= */

router.get(
  "/",
  async (req, res) => {

    try {

      const reports =
        await Report.find()
        .sort({ createdAt: -1 });

      res.json(reports);

    }

    catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

});

/* ================= MY REPORTS ================= */

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

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

});

module.exports = router;