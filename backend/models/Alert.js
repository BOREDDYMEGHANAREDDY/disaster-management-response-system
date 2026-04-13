const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({

  message: {
    type: String,
    required: true
  },

  disasterType: {
    type: String,
    required: true
  },

  location: {              // ADD THIS
    type: String
  },

  status: {                // ADD THIS
    type: String,
    default: "Active"
  },

  sentTo: {
    type: String,
    default: "rescue"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports =
  mongoose.model(
    "Alert",
    alertSchema
  );