const { Double } = require("mongodb");
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const FollowedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    followedId:{
      type: Double,
      required: true,
    },
    followedDatetime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Followed", FollowedSchema);
