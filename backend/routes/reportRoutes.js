const express = require("express");
const router = express.Router();

const Report = require("../models/Report");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

/* ================= STORAGE CONFIG ================= */

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    const uploadDir =
      path.join(__dirname, "../uploads");

    /* Ensure uploads folder exists */

    if (!fs.existsSync(uploadDir)) {

      fs.mkdirSync(uploadDir, {
        recursive: true
      });

    }

    cb(null, uploadDir);

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
      path.extname(file.originalname)
    );

  }

});

/* ================= MULTER CONFIG ================= */

const upload = multer({

  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {

    const allowedTypes =
      /jpeg|jpg|png/;

    const ext =
      path.extname(
        file.originalname
      ).toLowerCase();

    if (allowedTypes.test(ext)) {

      cb(null, true);

    }

    else {

      cb(
        new Error(
          "Only images allowed"
        )
      );

    }

  }

});

/* ================= CREATE REPORT ================= */

router.post(
  "/",
  upload.single("image"),

  async (req, res) => {

    try {

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
              ? `/uploads/${req.file.filename}`
              : "",

          lat: 17.3850,
          lng: 78.4867,

          userId,

          status: "Pending"

        });

      res.status(201).json(report);

    }

    catch (err) {

      console.log("CREATE ERROR:", err);

      res.status(500).json({
        message: err.message
      });

    }

});

/* ================= GET ALL REPORTS ================= */

router.get("/", async (req, res) => {

  try {

    const reports =
      await Report.find()
        .sort({ createdAt: -1 });

    res.json(reports);

  }

  catch (err) {

    console.log("GET ERROR:", err);

    res.status(500).json({
      message: err.message
    });

  }

});

/* ================= UPDATE REPORT STATUS ================= */

router.put("/:id/status", async (req, res) => {

  try {

    const { status } = req.body;

    if (!status) {

      return res.status(400).json({
        message: "Status required"
      });

    }

    console.log(
      "Updating status:",
      req.params.id,
      status
    );

    const updatedReport =
      await Report.findByIdAndUpdate(

        req.params.id,

        { status },

        {
          new: true,
          runValidators: true
        }

      );

    if (!updatedReport) {

      return res.status(404).json({
        message: "Report not found"
      });

    }

    res.json(updatedReport);

  }

  catch (err) {

    console.log(
      "STATUS UPDATE ERROR:",
      err
    );

    res.status(500).json({
      message: err.message
    });

  }

});

/* ================= DELETE REPORT ================= */

router.delete("/:id", async (req, res) => {

  try {

    console.log(
      "Deleting report:",
      req.params.id
    );

    const deletedReport =
      await Report.findByIdAndDelete(
        req.params.id
      );

    if (!deletedReport) {

      return res.status(404).json({
        message: "Report not found"
      });

    }

    res.json({
      message:
        "Report deleted successfully"
    });

  }

  catch (err) {

    console.log("DELETE ERROR:", err);

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

      console.log("MY REPORTS ERROR:", err);

      res.status(500).json({
        message: err.message
      });

    }

});

/* ================= MULTER ERROR HANDLER ================= */

router.use((err, req, res, next) => {

  if (err instanceof multer.MulterError) {

    return res.status(400).json({
      message: err.message
    });

  }

  else if (err) {

    return res.status(400).json({
      message: err.message
    });

  }

  next();

});

module.exports = router;