const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const ReportSchema = new mongoose.Schema(
  {
    reviewId: {
      type: String,
      required: true,
    },
    reportReason:{
      type: String,
      required: true,
    },
    reportDatetime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", ReportSchema);