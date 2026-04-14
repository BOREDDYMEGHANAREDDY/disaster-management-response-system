const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Report = require("../models/Report");

/* ================= ADMIN STATS ================= */

router.get("/stats", async (req, res) => {

  try {

    const total =
      await Report.countDocuments();

    const pending =
      await Report.countDocuments({

        status: {
          $in: ["Pending", "On The Way"]
        }

      });

    const resolved =
      await Report.countDocuments({

        status: "Resolved"

      });

    res.json({

      total,
      pending,
      resolved

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

});


/* ================= GET ALL USERS ================= */

router.get("/users", async (req, res) => {

  try {

    const users =
      await User.find();

    res.json({

      totalUsers:
        users.length,

      users: users

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

});


/* ================= DELETE USER ================= */

router.delete("/user/:id", async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({

      message:
        "User Deleted"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message

    });

  }

});


/* ================= GET RESCUE USERS ================= */

router.get("/rescues", async (req, res) => {

  try {

    const rescues =
      await User.find({

        role: "rescue"

      });

    res.json(rescues);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message

    });

  }

});


module.exports = router;