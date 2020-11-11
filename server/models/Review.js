const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewTitle:{
      type: String,
      required: true,
    },
    reviewContent: {
      type: String,
      required: true,
    },
    reviewDatetime: {
      type: Date,
      default: Date.now(),
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["NORMAL", "BAN"],
      default: "NORMAL",
    },
    view: {
      type: Number,
      default: 0,
    },
    imageLink: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Review", ReviewSchema);
