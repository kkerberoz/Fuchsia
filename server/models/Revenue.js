const { Double } = require("mongodb");
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const RevenueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Amount:{
      type: Double,
      required: true,
    },
    VAT: {
      type: Double,
      required: true,
    },
    revenueDatetime: {
      type: Date,
      default: Date.now(),
    },
    type: {
      type: String,
      enum: ["Advertise", "Company"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Revenue", RevenueSchema);
