console.log("Starting server...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const path = require("path"); // ✅ REQUIRED

/* Models */

const User = require("./models/User");

/* Routes */

const reportRoutes =
require("./routes/reportRoutes");

const adminRoutes =
require("./routes/adminRoutes");

const alertRoutes =
require("./routes/alertRoutes");

const app = express();

/* ================= Middleware ================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));
const fs = require("fs");

// Ensure uploads folder exists
const uploadPath =
  path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {

  fs.mkdirSync(uploadPath, {
    recursive: true
  });

}
/* ================= Static uploads ================= */

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

/* ================= Routes ================= */

app.use("/api/reports", reportRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/alerts", alertRoutes);

/* ================= MongoDB ================= */

mongoose.connect(process.env.MONGO_URI)

.then(() =>
console.log("MongoDB Connected")
)

.catch(err =>
console.log("MongoDB Error:", err)
);

/* ================= REGISTER ================= */

app.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      location,
      username,
      password,
      role
    } = req.body;

    const existing =
      await User.findOne({ email });

    if (existing)
      return res.send("Email already exists");

    const hashed =
      await bcrypt.hash(password, 10);

    await User.create({

      name,
      email,
      phone,
      location,
      username,
      password: hashed,
      role: role || "user"

    });

    res.send("Registered Successfully");

  }

  catch (err) {

    console.log(err);

    res.send("Register Error");

  }

});

/* ================= LOGIN ================= */

app.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "User not found"
      });

    const valid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!valid)
      return res.status(400).json({
        message: "Wrong password"
      });

    const token =
      jwt.sign({
        id: user._id,
        role: user.role
      },
      "secretkey"
      );

    res.json({

      token,
      role: user.role,
      user

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Login Error"
    });

  }

});

/* ================= Root ================= */

app.get("/", (req, res) => {

  res.send("Server Running");

});

/* ================= Server ================= */

const PORT =
process.env.PORT || 5000;

const server =
http.createServer(app);

server.listen(
  PORT,
  () =>
    console.log(
      `Server running on port ${PORT}`
    )
);