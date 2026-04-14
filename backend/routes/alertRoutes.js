const express = require("express");
const router = express.Router();

const Alert = require("../models/Alert");

/* ================= CREATE ALERT ================= */

router.post("/send", async (req, res) => {

  try {

    console.log("Alert received:", req.body);

    const {
      message,
      disasterType,
      location
    } = req.body;

    if (
      !message ||
      !disasterType
    ) {
      console.log("Missing fields error");


      return res.status(400).json({
        message: "Missing fields"
      });

    }

    const alert =
      await Alert.create({

        message,
        disasterType,
        location

      });

    console.log("Alert saved");

    res.status(201).json(alert);

  }

  catch (error) {

    console.log("Alert ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


/* ================= GET ALERTS ================= */

router.get("/", async (req, res) => {

  try {

    const alerts =
      await Alert.find()
        .sort({ createdAt: -1 });

    res.json(alerts);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});


/* ================= UPDATE ALERT STATUS ================= */

router.put("/:id/status", async (req, res) => {

  try {

    const updated =
      await Alert.findByIdAndUpdate(

        req.params.id,

        {
          status: req.body.status
        },

        { returnDocument: "after" }

      );

    res.json(updated);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});


/* ================= DELETE ALERT ================= */

router.delete("/:id", async (req, res) => {

  try {

    await Alert.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Alert Deleted"
    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});


module.exports = router;