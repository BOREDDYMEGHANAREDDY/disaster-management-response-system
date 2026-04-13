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

  status: {
    type: String,
    default: "Pending"
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
mongoose.model("Report", ReportSchema);