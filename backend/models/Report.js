const mongoose = require("mongoose");

const ReportSchema =
new mongoose.Schema({

  location: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  image: String,

  lat: Number,
  lng: Number,

  /* STATUS FIELD */

  status: {
    type: String,
    default: "Pending"
  },

  /* ASSIGNED RESCUE (IMPORTANT) */

  assignedRescue: {
    type: String,
    default: ""
  },

  userId: {
    type: String,
    required: true
  }

},
{
  timestamps: true
});

module.exports =
mongoose.model(
  "Report",
  ReportSchema
);